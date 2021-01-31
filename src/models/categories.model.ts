import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true, default: "" },
    userId: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
