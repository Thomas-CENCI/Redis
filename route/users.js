//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controller/users');


//CREATE
router.post("/createUser", (req, res) => {

    controller.create(req, res);

});

//READ
router.get("/readUser/:id", (req, res) => {
    
    controller.read(req, res);

});

//DELETE
router.delete("/deleteUser/:id", (req, res) => {
    
    controller.delete(req, res);

});

//LOG
const passport = require("passport");

router.post('/signin', function(req, res) {

    controller.signin(req, res);

});

router.post('/signout', function(req, res) {

    controller.signout(req, res);

});

router.post('/signup', function(req, res) {

	controller.signup(req, res);

});

router.get('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {

	controller.profile(req, res);

});

router.get("/control", (req, res) => {
    
    controller.control(req, res);

});

module.exports = router;