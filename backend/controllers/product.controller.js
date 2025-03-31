import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const addProduct = async (req, res) => {
  const product = req.body;
  console.log(product);

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ succuss: false, message: "please fill required Fileds" });
  }
  // Create a new product instance
  const newProduct = new Product({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  try {
    await newProduct.save();
    res.status(201).json({
      succuss: true,
      message: "product added success.",
      data: newProduct,
    });
  } catch (error) {
    console.error(`Error Creating product : ${error.message}`);
    res.status(500).json({ succuss: false, message: "Server error." });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ succuss: false, message: "Invalid product Id." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      succuss: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(`Error Deleting product : ${error.message}`);
    res.status(500).json({ succuss: false, message: "Not Found." });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      succuss: true,
      message: "product Deleted success.",
    });
  } catch (error) {
    console.error(`Error Deleting product : ${error.message}`);
    res.status(500).json({ succuss: false, message: "Not Found." });
  }
};
