const express = require('express');
const Foster = require('./../models/foster');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('navFoster', { foster: new Foster() });
});

router.get('/:id', async (req, res) => {
    var foster = await Foster.findById(req.params.id);
    res.send(`Added foster ${foster.firstName} to database`);
});

router.post('/', async (req, res) => {
    var foster = new Foster({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mailID: req.body.mailID,
        purpose: req.body.purpose
    })
    try {
        await foster.save();
        res.redirect(`/foster/${foster.id}`)
    }
    catch (err) {
        console.error(err);
    }
    console.log(foster);
});
module.exports = router;
