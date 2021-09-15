import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
   {
      name: { type: String, required: true },
      rating: { type: Number, required: true }, // individual review rating
      comment: { type: String, required: true },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User"
      }
   },
   { timestamps: true }
);

/* const Review = mongoose.model("Review", reviewSchema); */

export default reviewSchema;