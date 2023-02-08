const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('email');
  res.send(customers);
});

router.post('/', async (req, res) => {
  let customer = new Customer({ 
    email: req.body.email,
    password: req.body.password
  });
  customer = await customer.save();
  
  res.send(customer);
});

router.put('/:id', async (req, res) => {
 const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      email: req.body.email,
      password: req.body.password
    }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router; 