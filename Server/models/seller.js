const {Schema, model} = require('mongoose');

const sellerSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password:{type: String, required: true},
})

module.exports = model('Seller', sellerSchema)