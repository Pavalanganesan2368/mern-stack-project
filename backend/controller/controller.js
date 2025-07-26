import mongoose from 'mongoose';
import Product from '../model/Product.js';

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success : true, data : products })
    } catch (error) {
        console.log('Error in fetching product : ',error.message);
        res.status(500).json({ success : false, message : "Server Error"});
    }
};

export const createProduct = async (req,res) => {
    // res.send('Server is Ready')
    const product= req.body; //user will sent this data
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success : false, message : "Please provide all fields" });
    }

    const newProduct = new Product(product);
    
    try {
        await newProduct.save();
        res.status(201).json({ success : true, data : newProduct });
    } catch (err) {
        console.error("Error in Products created :", err);
        res.status(500).json({ success : false, message : "Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success : false, message : "Invalid Product id"});
    }

    try {
        const updated = await Product.findByIdAndUpdate(id, product, { new : true });
        res.status(200).json({ success : true, data : updated });
    } catch (error) {
        res.status(500).json({ success : false, message : "Server Failed" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success : false, message : "Invalid Product id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success : true, message : "Product Deleted"});
    } catch (error) {
        console.log('Error in deleting product : ',error.message);
        res.status(500).json({ success : false, message : "Product not found"});
    }
    
};