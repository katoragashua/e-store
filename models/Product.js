const { default: mongoose } = require("mongoose");
const { mongo } = require("mongoose");
const { Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name."],
      maxlength: [100, "Name cannot be more than 100 characters."],
      minlength: 6,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide product price."],
      default: 0
    },
    description: {
      type: String,
      required: [true, "Please provide product description."],
      maxlength: 500,
      trim: true,
    },
    productImages: {
      type: [String],
      required: [true, "Please provide product images."],
    },
    category: {
      type: String,
      required: [true, "Please provide product category."],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Please provide company name."],
      trim: true,
    },
    availableColors: {
      type: [String],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Product', ProductSchema )