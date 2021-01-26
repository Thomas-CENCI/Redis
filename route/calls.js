//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controller/calls');

//CREATE
router.post("/createCall", (req, res) => {

    controller.create(req, res);

});

//READ
router.put("/readCall", (req, res) => {
    
    controller.read(req, res);

});


module.exports = router;