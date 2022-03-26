const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

// routers
const volunteerRouter = require('./routes/volunteer');
const fosterRouter = require('./routes/foster');
const rescueRouter = require('./routes/rescue');
const adoptRouter = require('./routes/adopt');
const donateRouter = require('./routes/donate');

const app = express();

// server connection
// const uri = "mongodb+srv://Ash:mongodb@clusterdb.0wapi.mongodb.net/pawdoptdb?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGO_URI);

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});


// user view pages
// vision
app.get('/vision', (req, res) => {
    res.render("navVision.ejs");
});

// history
app.get('/history', (req, res) => {
    res.render('navHistory.ejs');
});

// volunteer page
app.use('/volunteer', volunteerRouter);

// adoption page
app.use('/adopt', adoptRouter);

// donate page
app.use('/donate', donateRouter);

// foster page
app.use('/foster', fosterRouter);

// rescue page
app.use('/rescue', rescueRouter);

// resources page
app.get('/resources', (req, res) => {
    res.render('navResources');
});

// vaccinate
app.get('/vaccine', (req, res) => {
    res.render('navVaccine');
});

app.post('/vaccine', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT, (err) => {
    try {
        console.log("Server running on port " + process.env.port );
    } catch (err) {
        throw err;
    }
});
