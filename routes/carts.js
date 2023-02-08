const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();


const schema = new mongoose.Schema({
    userId:{ type: String, require: true},
    cart:[Object]
})

const Carts = mongoose.model('Carts', schema);


const items = [
    { id: 0, name: 'FakeStore Web App', description: 'A web app developed by the owner of this wepsit', type: 'app', pic: '', price: 10000 },
    { id: 1, name: 'The joker painting', description: 'A graffity painting of the batman arkham origens the joker on a pepar', type: 'art', pic: '', price: 150 },
    { id: 3, name: 'CS', description: `The owner has a bachelor's degree of Cmputer Science`, type: 'edu', pic: '', price: 'for show' },
    { id: 2, name: 'The Dethstrock painting', description: 'A graffity painting of Dethstrock on a pepar', type: 'art', pic: '', price: 200 },
   ];

   router.get('/', async (req, res) => {
    const carts = await Carts.find().sort('name');
    res.send(carts);
   });
   
   router.post('/one', async (req, res) => {
    const cart = await Carts.findOne({userId : req.body.userId});

    if(!cart) return res.status(404).send('The cart with the given ID was not found.');

    res.send(cart);
   });

   router.get('/:id', auth,async (req, res) => {
    const cart = await Carts.findById(req.params.id);

    if(!cart) return res.status(404).send('The cart with the given ID was not found.');

    res.send(cart);
   });

   router.post('/', async (req, res) => {
    let cart = new Carts({ userId: req.body.userId, cart: req.body.cart });

    cart = await cart.save();
    res.send(cart)
   });

    
router.put('/:id', auth, async (req, res) => {
    const cart = await Carts.findByIdAndUpdate(req.params.id, { cart: req.body.cart }, {
      new: true
    });
  
    if (!cart) return res.status(404).send('The cart with the given ID was not found.');
    
    res.send(cart);
  });
  
    
router.post('/addone', auth, async (req, res) => {
    const cart = await Carts.findOneAndUpdate({userId : req.body.userId }, 
        { $addToSet: {cart: req.body.item}});
  
    if (!cart) return res.status(404).send('The cart with the given ID was not found.');
    
    res.send(cart);
  });
  
    
router.post('/removeone',  auth,async (req, res) => {
    const cart = await Carts.findOneAndUpdate({userId : req.body.userId }, 
        { $pull: {cart: {id:req.body.item.id}}});
  
    if (!cart) return res.status(404).send('The cart with the given ID was not found.');
    
    res.send(cart);
  });
  
   
   router.delete('/:id', auth, async (req, res) => {
    const item = await Carts.findByIdAndRemove(req.params.id);
  
    if (!item) return res.status(404).send('The item with the given ID was not found.');
  
    res.send(item);
  });

   module.exports = router;