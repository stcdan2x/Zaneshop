import mongoose from "mongoose";
import reviewSchema from "./reviewSchema.js";


const productSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User"
      },
      name: { type: String, required: true },
      image: { type: String, required: true },
      brand: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      reviews: [reviewSchema],
      rating: { type: Number, required: true, default: 0 },//average rating of all the review ratings for the product
      numReviews: { type: Number, required: true, default: 0 },
      price: { type: Number, required: true, default: 0 },
      countInStock: { type: Number, required: true, default: 0 },
      countSold: { type: Number, required: true, default: 0 }
   
   },{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;