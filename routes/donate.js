const express = require('express');
const Donate = require('./../models/donate');
const router = express.Router();
const Razorpay = require('razorpay');


// payment gateway
var rzpInstance = new Razorpay(
    {
        key_id: 'rzp_test_CrrSB9Kr27QO56',
        key_secret: 'lWksIllJ0SwUKYNiBxOeXXdF'
    }
);

router.get('/', (req, res) => {
    res.render('navDonation', { donate: new Donate() });
});

router.get('/:id', async (req, res) => {
    var donate = await Donate.findById(req.params.id);
    res.render('_TEMP_donate.ejs', { donate: donate });
});

router.post('/', async (req, res) => {
    var donate = new Donate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mailID: req.body.mailID,
        amount: req.body.amount
    })
    try {
        await donate.save();
        res.redirect(`/donate/${donate.id}`);
    }
    catch (err) {
        console.error(err);
    }
});

router.post('/:id', async (req, res) => {
    var donate = await Donate.findById(req.params.id);
    var options = {
      amount: donate.amount,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    rzpInstance.orders.create(options, function(err, order) {
      console.log(order);
      res.send({ orderId: order.id });
    });
});


module.exports = router;
