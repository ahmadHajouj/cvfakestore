const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    id:{ type: String, require: true },
    name: { type: String, require: true, minlength: 2, maxlength: 50 },
    description: { type: String, maxlength: 300 },
    type: { type: String, minlength: 1, maxlength: 25 },
    pic: { type: String },
    price:{ type: Number},
    info:[String]
})

const Items = mongoose.model('Items', schema);

exports.Items = Items;