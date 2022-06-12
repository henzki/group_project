//imports
require('dotenv').config();
const express = require('express');
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/users");
const mongoose = require('mongoose');
const session = require('express-session');
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 4000;
require('dotenv').config({ path: path.resolve(__dirname + '/.env') });

//database connection
mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on ("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the database"));

//milddlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
})
);

//passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use('/uploads', express.static(__dirname + '/uploads'));

app.engine('html', require('ejs').renderFile);
//set template engine
app.set('view engine', 'ejs');
app.set('views', __dirname);
//route prefix
app.use("", require('./routes/routes'));

// Logging the rejected field from multer error
//app.use((error, req, res, next) => {
//    console.log('This is the rejected field ->', error.field);
 // });


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

app.use(express.static('public'));
