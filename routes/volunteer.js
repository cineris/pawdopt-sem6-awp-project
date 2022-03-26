const express = require('express');
const Volunteer = require('./../models/volunteer');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('navVolunteer', { volunteer: new Volunteer() });
});

router.get('/:id', async (req, res) => {
    var volunteer = await Volunteer.findById(req.params.id);
    res.send(`Added volunteer ${volunteer.firstName} to database`);
});

router.post('/', async (req, res) => {
    var volunteer = new Volunteer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mailID: req.body.mailID,
        address1: req.body.address1,
        address2: req.body.address2,
        prefDate: req.body.prefDate,
        prefTime: req.body.prefTime
    })
    try {
        await volunteer.save();
        res.redirect(`/volunteer/${volunteer.id}`)
    }
    catch (err) {
        console.error(err);
    }
    console.log(volunteer);
});

module.exports = router;
