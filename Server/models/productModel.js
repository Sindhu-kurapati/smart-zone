const {model , Schema} = require('mongoose');

const productSchema = new Schema({
    title: {type: String, required: true},
    description : {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, required: true},
    category: {
        type: String,
        enum: ["Electronics", "Jewelery", "Men's clothing", "Women's clothing", "All", "None"],
        message: "{VALUE} is not supported"},
    image: {type: String, required: true}
})


module.exports = model("Product", productSchema)