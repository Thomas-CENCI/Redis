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
     return jwt.sign({id: user.id, email: user.email}, "My so secret sentence");
 }
 
 function signin(req, res) {
 
     let User = require('../model/users');
     const email = req.body.email
 
     User.findOne({email: email}, function(err, user) {

         if (user.comparePassword(req.body.pswd)) {
             req.session.logged = true;
             res.status(200).json({token: createToken(user)});
         }
         else {
             res.status(400).json();
         }
     });
 }
 
 function signup(req, res) {
 
     let User = require('../model/users');
     let user = new User();
 
     user.email = req.body.email;
     user.pswd = req.body.pswd;
 
     user.save((err, savedUser) => {
 
         if (err){
            res.status(400).json()
         }
         else {
            res.status(200).json()
         }
     });
 }
 
 function signout(req, res) {
 
     req.session.email = "";
     req.session.logged = false; 
 }
 
 function profile(req, res) {
 
     if (req.session.logged)
         res.send("Profile");
     else
         res.redirect('/');
 
 }

const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

function control(req, res) {
    if(client.get(token) < 10){
        //do things
    }
    else {
        //wait for counter to drop down below 10
    }
}

module.exports.signin = signin;
module.exports.signup = signup;
module.exports.signout = signout;
module.exports.profile = profile;
module.exports.create = createUser;
module.exports.read = readUser;
module.exports.update = updateUser;
module.exports.delete = deleteUser;