const express = require('express');
const Rescue = require('./../models/pets');
const multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('rescueForm', { rescue: new Rescue() });
});

router.get('/:id', async (req, res) => {
    var rescue = await Rescue.findById(req.params.id);
    // res.send(`Added rescue ${rescue.name} to database. ${rescue.photo.data}`);
    console.log(rescue);
    res.render('_TEMP_rescres', { rescue: rescue });
});

router.post('/', upload.single('image'), async (req, res) => {
    var rescue = new Rescue({
        name: req.body.name,
        mailID: req.body.mailID,
        phoneNo: req.body.phoneNo,
        location: req.body.location,
        photo: {
            data: fs.readFileSync(path.join(process.cwd() +'/public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
    try {
        await rescue.save();
        res.redirect(`/rescue/${rescue.id}`)
    }
    catch (err) {
        console.error(err);
    }
    console.log(rescue);
});

module.exports = router;
