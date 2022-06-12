const express = require('express');
const router = express.Router();
const Brandguide = require('../models/brandguides');
const multer = require('multer');
const fs = require("fs");
const { userInfo } = require('os');
const path = require('path');
const passport = require('passport');
const User = require("../models/users");



//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "firstimage") {
            cb(null, './uploads/image/');
        }
        else if (file.fieldname === "logoimage") {
            cb(null, './uploads/logoimage/');
        }
        else if (file.fieldname === "fontimage") {
            cb(null, './uploads/fontimage/');
        }
        else if (file.fieldname === "colorsimage") {
            cb(null, './uploads/colorsimage/');
        }
        else if (file.fieldname === "mediaimage") {
            cb(null, './uploads/mediaimage/');
        }
        else if (file.fieldname === "optionalOneimage") {
            cb(null, './uploads/optionalOneimage/');
        }
        else if (file.fieldname === "optionalTwoimage") {
            cb(null, './uploads/optionalTwoimage/');
        }
    },

    filename: function (req, file, cb) {
        console.log(file);
        if (file.fieldname === "firstimage") {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname);
        }
        else if (file.fieldname === "logoimage") {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname);
        }
        else if (file.fieldname === "fontimage") {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname);
        }
        else if (file.fieldname === "colorsimage") {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname);
        }
        else if (file.fieldname === "mediaimage") {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname);
        }
        else if (file.fieldname === "optionalOneimage") {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname);
        }
        else if (file.fieldname === "optionalTwoimage") {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname);
        }
    }
});



const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
})

function checkFileType(file, cb) {
    if (file.fieldname === "firstimage" || file.fieldname === "logoimage" || file.fieldname === "fontimage" || file.fieldname === "colorsimage" || file.fieldname === "mediaimage" || file.fieldname === "optionalOneimage" || file.fieldname === "optionalTwoimage") {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            fiel.mimetype === 'image/gif'
        ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    }
}

// Insert a brandguide into database route
router.post('/add', upload.fields([{
    name: 'firstimage', maxCount: 1
},
{
    name: 'logoimage', maxCount: 1
},
{
    name: 'fontimage', maxCount: 1
},
{
    name: 'colorsimage', maxCount: 1
},
{
    name: 'mediaimage', maxCount: 1
},
{
    name: 'optionalOneimage', maxCount: 1
},
{
    name: 'optionalTwoimage', maxCount: 1
}]), (req, res) => {
    const brandguide = new Brandguide({
        name: req.body.name,
        firstimage: req.files['firstimage']?.[0]?.filename ? req.files['firstimage']?.[0]?.filename : '',
        description: req.body.description ? req.body.description : '',
        creator: req.body.creator,
        fontcolor: req.body.fontcolor,
        bgcolor: req.body.bgcolor,
        navbgcolor: req.body.navbgcolor,
        layout: req.body.layout,
        logoHeader: req.body.logoHeader ? req.body.logoHeader : 'Logo',
        logoDescription: req.body.logoDescription ? req.body.logoDescription : '',
        logoimage: req.files['logoimage']?.[0]?.filename ? req.files['logoimage']?.[0]?.filename : '',
        fontHeader: req.body.fontHeader ? req.body.fontHeader : 'Font',
        fontDescription: req.body.fontDescription ? req.body.fontDescription : '',
        fontimage: req.files['fontimage']?.[0]?.filename ? req.files['fontimage']?.[0]?.filename : '',
        colorsHeader: req.body.colorsHeader ? req.body.colorsHeader : 'Color',
        colorsDescription: req.body.colorsDescription ? req.body.colorsDescription : '',
        colorsimage: req.files['colorsimage']?.[0]?.filename ? req.files['colorsimage']?.[0]?.filename : '',
        mediaHeader: req.body.mediaHeader ? req.body.mediaHeader : 'Media',
        mediaDescription: req.body.mediaDescription ? req.body.mediaDescription : '',
        mediaimage: req.files['mediaimage']?.[0]?.filename ? req.files['mediaimage']?.[0]?.filename : '',
        optionalOneHeader: req.body.optionalOneHeader ? req.body.optionalOneHeader : ' ',
        optionalOneDescription: req.body.optionalOneDescription ? req.body.optionalOneDescription : '',
        optionalOneimage: req.files['optionalOneimage']?.[0]?.filename ? req.files['optionalOneimage']?.[0]?.filename : '',
        optionalTwoHeader: req.body.optionalTwoHeader ? req.body.optionalTwoHeader : ' ',
        optionalTwoDescription: req.body.optionalTwoDescription ? req.body.optionalTwoDescription : '',
        optionalTwoimage: req.files['optionalTwoimage']?.[0]?.filename ? req.files['optionalTwoimage']?.[0]?.filename : '',

    });


    brandguide.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Brandguide added succesfully.'
            };
            res.redirect('/index');
        }
    })
});

//Get all
router.get("/index", isLoggedIn, (req, res) => {
    Brandguide.find().exec((err, brandguides) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('./views/index', {
                title: 'Brandguide system system',
                brandguides: brandguides
            })
        }
    })
});

//Get all View
router.get('/view/:id', (req, res) => {
    let id = req.params.id;
    Brandguide.findById(id, (err, brandguide) => {
        if (err) {
            res.redirect('/index');
        } else {
            if (brandguide == null) {
                res.redirect('/index');
            } else {
                res.render('./views/view_brandguides', {
                    title: 'View brandguide',
                    brandguide: brandguide,

                });
            }
        }
    });
});

//Get all Logo
router.get('/logo/:id', (req, res) => {
    let id = req.params.id;
    Brandguide.findById(id, (err, brandguide) => {
        if (err) {
            res.redirect('/index');
        } else {
            if (brandguide == null) {
                res.redirect('/index');
            } else {
                res.render('./views/logo_brandguides', {
                    title: 'View brandguide',
                    brandguide: brandguide,

                });
            }
        }
    });
});

//Get all Font
router.get('/font/:id', (req, res) => {
    let id = req.params.id;
    Brandguide.findById(id, (err, brandguide) => {
        if (err) {
            res.redirect('/index');
        } else {
            if (brandguide == null) {
                res.redirect('/index');
            } else {
                res.render('./views/font_brandguides', {
                    title: 'View brandguide',
                    brandguide: brandguide,

                });
            }
        }
    });
});

//Get all Color
router.get('/color/:id', (req, res) => {
    let id = req.params.id;
    Brandguide.findById(id, (err, brandguide) => {
        if (err) {
            res.redirect('/index');
        } else {
            if (brandguide == null) {
                res.redirect('/index');
            } else {
                res.render('./views/color_brandguides', {
                    title: 'View brandguide',
                    brandguide: brandguide,

                });
            }
        }
    });
});


//Get all Media
router.get('/media/:id', (req, res) => {
    let id = req.params.id;
    Brandguide.findById(id, (err, brandguide) => {
        if (err) {
            res.redirect('/index');
        } else {
            if (brandguide == null) {
                res.redirect('/index');
            } else {
                res.render('./views/media_brandguides', {
                    title: 'View brandguide',
                    brandguide: brandguide,

                });
            }
        }
    });
});


//Get all Optional One
router.get('/optionalone/:id', (req, res) => {
    let id = req.params.id;
    Brandguide.findById(id, (err, brandguide) => {
        if (err) {
            res.redirect('/index');
        } else {
            if (brandguide == null) {
                res.redirect('/index');
            } else {
                res.render('./views/optionalone_brandguides', {
                    title: 'View brandguide',
                    brandguide: brandguide,

                });
            }
        }
    });
});


//Share
router.get("/share", isLoggedIn, (req, res) => {
    Brandguide.find().exec((err, brandguides) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('./views/share_brandguides', {
                title: 'Brandguide system system',
                brandguides: brandguides
            })
        }
    })
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('./views/add_brandguides', { title: "Add Brandguides" });
});

router.get('/account', isLoggedIn, (req, res) => {
    let id = req.user.id;
    User.findById(id, (err, user) => {
        if (err) {
            res.redirect('/index');
        } else {
            if (user == null) {
                res.redirect('/index');
            } else {
                res.render('./views/account', {
                    title: 'Account information',
                    user: user,

                });
            }
        }
    });
});

// Edit route
router.get('/edit/:id', isLoggedIn, (req, res) => {
    let id = req.params.id;
    Brandguide.findById(id, (err, brandguide) => {
        if (err) {
            res.redirect('/index');
        } else {
            if (brandguide == null) {
                res.redirect('/index');
            } else {
                res.render('./views/edit_brandguides', {
                    title: 'Edit brandguide',
                    brandguide: brandguide,

                });
            }
        }
    });
});

// Update route
router.post('/update/:id', isLoggedIn, upload.fields([{
    name: 'firstimage', maxCount: 1
},
{
    name: 'logoimage', maxCount: 1
},
{
    name: 'fontimage', maxCount: 1
},
{
    name: 'colorsimage', maxCount: 1
},
{
    name: 'mediaimage', maxCount: 1
},
{
    name: 'optionalOneimage', maxCount: 1
},
{
    name: 'optionalTwoimage', maxCount: 1
}]), (req, res) => {
    let id = req.params.id;
    //let body = req.body;

    //console.log('body:', body);
    //console.log('req:', req);

    Brandguide.findByIdAndUpdate(id, {
        name: req.body.name,
        firstimage: req.files['firstimage']?.[0]?.filename ? req.files['firstimage']?.[0]?.filename : req.body.old_firstimage,
        description: req.body.description,
        creator: req.body.creator,
        fontcolor: req.body.fontcolor,
        bgcolor: req.body.bgcolor,
        navbgcolor: req.body.navbgcolor,
        layout: req.body.layout,
        logoHeader: req.body.logoHeader,
        logoDescription: req.body.logoDescription,
        logoimage: req.files['logoimage']?.[0]?.filename ? req.files['logoimage']?.[0]?.filename : req.body.old_logoimage,
        fontHeader: req.body.fontHeader,
        fontDescription: req.body.fontDescription,
        fontimage: req.files['fontimage']?.[0]?.filename ? req.files['fontimage']?.[0]?.filename : req.body.old_fontimage,
        colorsHeader: req.body.colorsHeader,
        colorsDescription: req.body.colorsDescription,
        colorsimage: req.files['colorsimage']?.[0]?.filename ? req.files['colorsimage']?.[0]?.filename : req.body.old_colorsimage,
        mediaHeader: req.body.mediaHeader,
        mediaDescription: req.body.mediaDescription,
        mediaimage: req.files['mediaimage']?.[0]?.filename ? req.files['mediaimage']?.[0]?.filename : req.body.old_mediaimage,
        optionalOneHeader: req.body.optionalOneHeader ? req.body.optionalOneHeader : ' ',
        optionalOneDescription: req.body.optionalOneDescription ? req.body.optionalOneDescription : '',
        optionalOneimage: req.files['optionalOneimage']?.[0]?.filename ? req.files['optionalOneimage']?.[0]?.filename : req.body.old_optionalOneimage,
        optionalTwoHeader: req.body.optionalTwoHeader ? req.body.optionalTwoHeader : ' ',
        optionalTwoDescription: req.body.optionalTwoDescription ? req.body.optionalTwoDescription : '',
        optionalTwoimage: req.files['optionalTwoimage']?.[0]?.filename ? req.files['optionalTwoimage']?.[0]?.filename : req.body.old_optionalTwoimage,


    }, (err, result) => {
        if (req.files) {
            console.dir(req.files);

            /*
                    if( req.files['firstimage']?.[0]?.filename != '') {
                        try {
                            console.log('updating firstimage '+ req.body.old_firstimage + 'to'+  req.files['firstimage']?.[0]?.filename);
                            fs.unlinkSync('./uploads/image/'+result.firstimage);
                        } catch(err){
                            console.log(err);
                        }
                    }
                     if( req.files['logoimage']?.[0]?.filename != '') {
                        try {
                            console.log('updating firstimage '+ req.body.old_logoimage + 'to'+  req.files['logoimage']?.[0]?.filename);
                            fs.unlinkSync('./uploads/logoimage/'+result.logoimage);
                        } catch(err){
                            console.log(err);
                        }
                    }
                     if( req.files['fontimage']?.[0]?.filename != '') {
                        try {
                            console.log('updating fontimage '+ req.body.old_fontimage + 'to'+ req.files['fontimage']?.[0]?.filename);
                            fs.unlinkSync('./uploads/fontimage/'+result.fontimage);
                        } catch(err){
                            console.log(err);
                        }
                    } 
                     if(req.files['colorsimage']?.[0]?.filename != '') {
                        try {
                            console.log('updating colorsimage '+ req.body.old_colorsimage + 'to'+ req.files['colorsimage']?.[0]?.filename);
                            fs.unlinkSync('./uploads/colorsimage/'+result.colorsimage);
                        } catch(err){
                            console.log(err);
                        }
                    }
                     if(req.files['mediaimage']?.[0]?.filename != '') {
                        try {
                            console.log('updating mediaimage '+ req.body.old_mediaimage + 'to' + req.files['mediaimage']?.[0]?.filename);
                            fs.unlinkSync('./uploads/mediaimage/'+result.mediaimage);
        
                        } catch(err){
                            console.log(err);
                        }
                    }
                    */
        }

        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Brandguide updated succesfully.'
            };
            res.redirect('/index');
        }
    });
});

// Delete route
router.get('/delete/:id', isLoggedIn, (req, res) => {
    let id = req.params.id;
    Brandguide.findByIdAndRemove(id, (err, result) => {
        if (result.firstimage != '') {
            try {
                fs.unlinkSync('./uploads/image/' + result.firstimage);
            } catch (err) {
                console.log(err);
            }
        }

        if (result.logoimage != '') {
            try {
                fs.unlinkSync('./uploads/logoimage/' + result.logoimage);
            } catch (err) {
                console.log(err);
            }
        }

        if (result.fontimage != '') {
            try {
                fs.unlinkSync('./uploads/fontimage/' + result.fontimage);
            } catch (err) {
                console.log(err);
            }
        }

        if (result.colorsimage != '') {
            try {
                fs.unlinkSync('./uploads/colorsimage/' + result.colorsimage);
            } catch (err) {
                console.log(err);
            }
        }

        if (result.mediaimage != '') {
            try {
                fs.unlinkSync('./uploads/mediaimage/' + result.mediaimage);
            } catch (err) {
                console.log(err);
            }
        }

        if (result.optionalOneimage != '') {
            try {
                fs.unlinkSync('./uploads/optionalOneimage/' + result.optionalOneimage);
            } catch (err) {
                console.log(err);
            }
        }

        if (result.optionalTwoimage != '') {
            try {
                fs.unlinkSync('./uploads/optionalTwoimage/' + result.optionalTwoimage);
            } catch (err) {
                console.log(err);
            }
        }

        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Brandguide deleted succesfully.'
            };
            res.redirect('/index');
        }
    })
})

// Showing home page
router.get("/", function (req, res) {
    res.render('./views/login', {
        title: 'Login',
        username: '',
        password: ''
    })
});

// Showing register form
router.get("/register", function (req, res) {
    res.render('./views/register', {
        title: 'Registration Page',
        name: '',
        email: '',
        password: ''
    })
});

// Handling user signup
router.post("/register", function (req, res) {
    const email = req.body.email
    const password = req.body.password
    User.register(new User({ username: req.body.username }), req.body.password, function (err) {
        if (err) {
            console.log('error while user register!', err);
            return console.log(err);
        }

        console.log('user registered!');

        res.redirect('/');
    });
});

//Showing login form
router.get("/login", function (req, res) {
    res.render('./views/login', {
        title: 'Login',
        username: '',
        password: ''
    })
});
//Handling user login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

module.exports = router;
