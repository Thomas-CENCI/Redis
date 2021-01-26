function createCall(req, res) {
    let Call = require('../model/calls');
    let newCall = Call ({
        date : req.body.date,
        duration : req.body.duration,
    });
  
    newCall.save()
    .then((savedCall) => {

        //send back the created Call
        res.json(savedCall);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

function readCall(req, res) {

    let Call = require("../model/call");

    Call.findById({_id : req.params.id})
    .populate('Ingredients')
    .then((call) => {
        res.status(200).json(call);
    }, (err) => {
        res.status(500).json(err);
    });
 }

module.exports.create = createCall;
module.exports.read = readCall;