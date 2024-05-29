const Product = require('../models/productModel');
// const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const fs = require('fs');


//----------------------------CREATE PRODUCT--------------------
//POST: api/products
//PROTECTED
const createProduct = async(req, res, next) => {
    try {
        let {title, description, price, discount, category, image} = req.body;
        if(!title || !description || !price || !discount || !category || !image){
            return next(new HttpError("Fill in all fields.", 422))
        }
        if(image.size > 2000000){
            return next(new HttpError("Image should be less than 2mb"))
        }
        //creating the product
        const newProduct = await Product.create({
            title,
            description,
            price,
            discount,
            category,
            image
        });

        if(!newProduct){
            return next(new HttpError("Product couldn't be created", 422))
        }

        res.status(201).json(newProduct);
    } catch (error) {
        return next(new HttpError(error))
    }
}


//------------------GET ALL PRODUCTS ------------------------------
//POST: api/products/
//UNPROTECTED
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        return next(new HttpError(error))
    }
}


//------------------GET SINGLE PRODUCTS ------------------------------
//POST: api/product/:id
//UNPROTECTED
const getSingleProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Handle case where product is not found
        }
        res.status(200).json(product)
    } catch (error) {
        return next(new HttpError(error))
    }
}


//----------------------EDIT PRODUCT---------------------------------
//PATCH: api/products/:id
//PROTECTED
const editProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const { title, description, price, discount, category, image } = req.body;
        
        if (!title || !description || !price || !discount || !category || !image) {
            return next(new HttpError("Fill in all fields", 422));
        }

        const product = await Product.findById(productId);
        if (!product) {
            return next(new HttpError("Product not found", 404));
        }

        // Checking if the user is authenticated
        if (!req.user) {
            return next(new HttpError("Unauthorized. User not authenticated", 401));
        }

        // Update product fields
        product.title = title;
        product.description = description;
        product.price = price;
        product.discount = discount;
        product.category = category;
        product.image = image; // Ensure the image field is handled appropriately if it's a file upload

        // Save the updated product
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return next(new HttpError("Internal Server Error", 500));
    }
}





//--------------------------------DELETE PRODUCT------------------------
// DELETE: api/products/:id
//PROTECTED
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return next(new HttpError("Product ID is required", 400));
        }

        const product = await Product.findById(productId);
        if (!product) {
            return next(new HttpError("Product not found", 404));
        }

        if (!req.user) {
            return next(new HttpError("Unauthorized to delete this product", 403));
        }

        await Product.findByIdAndDelete(productId);
        res.status(204).json({ message: `Product ${productId} deleted successfully` });
    } catch (error) {
        console.error('Error deleting product:', error);
        return next(new HttpError("Internal Server Error", 500));
    }
}




module.exports = { createProduct, getProducts, getSingleProduct, editProduct, deleteProduct }