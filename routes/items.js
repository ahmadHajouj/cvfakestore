const mongoose = require('mongoose');
const { Items } = require('./../models/items');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

const allItems =
[
    { id: 0, name: 'FakeStore Web App', description: 'A web app developed by the owner of this wepsit', type: 'app', pic: '', price: 10000 },
    { id: 1, name: 'The joker painting', description: 'A graffity painting of the batman arkham origens the joker on a pepar', type: 'art', pic: '', price: 150 },
    { id: 3, name: 'CS', description: `The owner has a bachelor's degree of Cmputer Science`, type: 'edu', pic: '', price: 'for show' },
    { id: 2, name: "The Dethstrock painting", description: "A graffity painting of Dethstrock on a pepar", type: "art", pic: "", price: 200 },
   ];

   router.get('/', async (req, res) => {
    const items = await Items.find().sort('name');
    res.send(items);
   });

   router.post('/',  async(req, res) => {
    let item = new Items({ id: req.body.id, name: req.body.name, description: req.body.description, type: req.body.type, pic: req.body.pic, price: req.body.price });
    
    item = await item.save();

    res.send(item)
   });

   router.delete('/:id', auth, admin, async (req, res) => {
    const item = await Items.findByIdAndRemove(req.params.id);
  
    if (!item) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(item);
  });
   
   router.get('/:id', async (req, res) => {
    const item = await Items.findById(req.params.id);

    if(!item) return res.status(404).send('The item with the given ID was not found.');

    res.send(item);
   });

   module.exports = router;