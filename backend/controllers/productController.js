import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Get all product info from database
//route:    GET /api/products
//access:   Public
export const getProducts = asyncHandler( async (req , res) => {
   const pageSize = 2;
   const page = Number(req.query.pageNumber) || 1;
   
   const keyword = req.query.keyword ? {
      name: {
         $regex: req.query.keyword,
         $options: "i"
      }
   } : {}
   
   const count = await Product.countDocuments({ ...keyword }); 
   const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1));
      res.json({ products, page, pages: Math.ceil(count / pageSize)});
});

//Get a specific product by ID
//route:    GET /api/products/:id
//access:   Public
export const getProductById = asyncHandler( async (req , res) => {
   const product = await Product.findById(req.params.id);

   if (product) {
      res.json(product);
   } else {
      throw new Error("Product not found");
   }
});

//Delete Product
//route:    DELETE /api/products/:id
//access:   Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);
 
   if (product) {
     await product.remove();
     res.json({ message: 'Product removed' });
   } else {
     res.status(404);
     throw new Error('Product not found');
   }
 });

//Create Product
//route:    POST /api/products
//access:   Private/Admin
export const createProduct = asyncHandler( async (req , res) => {
   const product = new Product({
      name: "Sample Name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample Description"
   });

   const createdProduct = await product.save();
   res.status(201);
   res.json(createdProduct);
});

//Update Product
//route:    PUT /api/products/:id
//access:   Private/Admin
export const updateProduct = asyncHandler( async (req , res) => {
   const { 
      name,
      price,
      user,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description
   } = req.body;

   const product = await Product.findById(req.params.id);

   if (product) {
      product.name = name;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.description = description;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
   } else {
      res.status(404);
      throw new Error("Product not found!");
   }
});

//Create new review
//route:    POST /api/products/:id/reviews
//access:   Private
export const createProductReview = asyncHandler( async (req , res) => {
   const { rating, comment } = req.body;

   const product = await Product.findById(req.params.id);

   if (product) {
      const alreadyReviewed = product.reviews.find(
         review => review.user.toString() === req.user._id.toString()
      );
      
      if (alreadyReviewed) {
         res.status(400);
         throw new Error("Product already reviewed")
      }

      const review = {
         name: req.user.name,
         rating: Number(rating), // individual rating
         comment,
         user: req.user._id
      }

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      //overall rating average for the product
      product.rating = product.reviews.reduce((acc, review) => 
         review.rating + acc, 0) / product.reviews.length;
      
      await product.save();
      res.status(201);
      res.json({ message: "Review added" })

   } else {
      res.status(404);
      throw new Error("Product not found!");
   }
});


