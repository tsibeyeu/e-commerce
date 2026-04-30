import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  // Updated for Habesha Lineage
  category: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Kids"],
  },
  // Updated for Habesha Piece types
  subCategory: {
    type: String,
    required: true,
    enum: ["Kemis", "Habesha Libs", "Kuta & Shama"],
  },
  sizes: { type: Array, required: true },
  bestSeller: { type: Boolean, default: false },
  date: { type: Number, required: true },
});

const ProductModel =
  mongoose.models.product || mongoose.model("Product", productSchema);
export default ProductModel;
