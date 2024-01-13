const { Schema, default: mongoose } = require("mongoose");

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
      default: 0,
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
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id."],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toJSON: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match: {rating: 5}
});

// ProductSchema.pre("deleteOne", async function (next) {
//   console.log(this.model("Review"));
//   // console.log(this.model("Review").find({}));
// });

module.exports = mongoose.model("Product", ProductSchema);
