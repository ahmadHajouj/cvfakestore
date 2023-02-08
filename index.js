const config = require('config');
const mongoose = require('mongoose');
const cart = require('./routes/cart');
const carts = require('./routes/carts');
const items = require('./routes/items');
const types = require('./routes/filterType');
const customer = require('./routes/customer');
const user = require('./routes/user');
const auth = require('./routes/auth');
const home = require('./routes/home');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect(config.get('db'))
    .then( () => console.log('connected to mongodb... '))
    .catch( err => console.log('could not connect to mongoedb... '));

app.use(express.json());
app.use(cors());

app.use('/api/items', items);
app.use('/api/cart', cart);
app.use('/api/carts', carts);
app.use('/api/types', types);
app.use('/api/customer', customer);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/home', home);

// {origin: ['https://fake-store.herokuapp.com','http://localhost:3001','http://localhost:3000']}

app.use(express.static(path.join(__dirname, "/cvfakestore/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/cvfakestore/build', 'index.html'));
});

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}... `));