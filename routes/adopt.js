const express = require('express');
const Adopt = require('./../models/adopt');
const Pets = require('./../models/pets');
const router = express.Router();
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
    var pets = await Pets.find();
    res.render('adopt/test_navAdoption', { pets: pets });
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
