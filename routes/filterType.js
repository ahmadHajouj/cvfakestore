const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const schema = new mongoose.Schema({
    id:{ type: String, require: true },
    name: { type: String, require: true, minlength: 1, maxlength: 10 }
});

const Types = mongoose.model('Types', schema);


router.get('/', async (req, res) => {
    const types = await Types.find().sort('name');
    res.send(types);
});


router.post('/', async(req, res) => {
    let type = new Types({ id: req.body.id, name: req.body.name});
    type = await type.save();

    res.send(type)
   });

   module.exports = router;