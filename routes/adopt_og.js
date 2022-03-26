const express = require('express');
const Adopt = require('./../models/adopt');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('adopt/navAdoption');
});

router.get('/adoptionForm', (req, res) => {
    res.render('adopt/navAdoptionForm');
});

router.get('/:id', async (req, res) => {
    var adopt = await Adopt.findById(req.params.id);
    res.send(`Added adoptee ${adopt.firstName} to database`);
});

router.post('/adoptionForm', async (req, res) => {
    var adopt = new Adopt({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mailID: req.body.mailID,
        purpose: req.body.purpose
    })
    try {
        await adopt.save();
        res.redirect(`/adopt/${adopt.id}`)
    }
    catch (err) {
        console.error(err);
    }
    console.log(adopt);
});

module.exports = router;
