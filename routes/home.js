const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const schema = new mongoose.Schema({
    name:{ type: String, require: true },
    itemId: { type: String, require: true }
});

const Home = mongoose.model('Home', schema);


router.get('/', async (req, res) => {
    const elements = await Home.find().sort('name');
    res.send(elements);
});


router.get('/:id', async (req, res) => {
    const element = await Home.findById(req.params.id);

    if(!element) return res.status(404).send('The element with the given ID was not found.');

    res.send(element);
});


router.post('/', async(req, res) => {
    let element = new Home({ name: req.body.name, itemId: req.body.itemId});
    element = await element.save();

    res.send(element)
   });

   
router.put('/:id', async (req, res) => {
    const element = await Home.findByIdAndUpdate(req.params.id, { itemId: req.body.itemId }, {
      new: true
    });
  
    if (!element) return res.status(404).send('The element with the given ID was not found.');
    
    res.send(element);
  });
  

   module.exports = router;