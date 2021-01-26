function createUser(req, res) {
    let User = require('../model/users');
    let newUser = User ({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        pswd : req.body.pswd,
    });
  
    newUser.save()
    .then((savedUser) => {

        //send back the created Call
        res.json(savedUser);
            
    }, (err) => {
        console.log(err);
        res.status(400).json(err)
    });

}

function readUser(req, res) {

    let User = require("../model/users");

    User.findById({_id : req.params.id})
    .then((user) => {
        res.status(200).json(user);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function updateUser(req, res) {

    let User = require("../model/users");

    User.findByIdAndUpdate(
        {_id: req.params.id}, 
        {firstName : req.body.firstName}, 
        {lastName : req.body.lastName},
        {email : req.body.email},
        {pswd : req.body.pswd})
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
    }, (err) => {
        res.status(500).json(err);
    });
}

function deleteUser(req, res) {

    let User = require("../model/users");

    User.findOneAndRemove({_id : req.params.id})
    .then((deletedUser) => {
        res.status(200).json(deletedUser);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 const jwt = require('jsonwebtoken');

 function createToken(user) {
     return jwt.sign({id: user.id, username: user.email}, "My so secret sentence");
 }
 
 function signin(req, res) {
 
     let User = require('../model/users');
 
     User.findOne({username: req.body.username}, function(err, user) {
         if (err)
             throw err;
 
         if (user.comparePassword(req.body.pswd)) {
             req.session.username = req.body.username;
             req.session.logged = true;
             var t = createToken(user);
             res.status(200).json({token: createToken(user)});
         }
         else
             res.redirect('/');
     });
 }
 
 function signup(req, res) {
 
     let User = require('../model/users');
     let user = new User();
 
     user.username = req.body.username;
     user.pswd = req.body.pswd;
 
     user.save((err, savedUser) => {
 
         if (err)
             throw err;
 
         res.redirect('/');
 
     });
 }
 
 function signout(req, res) {
 
     req.session.username = "";
     req.session.logged = false;
     res.redirect("/");
 
 }
 
 function profile(req, res) {
 
     if (req.session.logged)
         res.send("Profile");
     else
         res.redirect('/');
 
 }
 
module.exports.signin = signin;
module.exports.signup = signup;
module.exports.signout = signout;
module.exports.profile = profile;
module.exports.create = createUser;
module.exports.read = readUser;
module.exports.update = updateUser;
module.exports.delete = deleteUser;