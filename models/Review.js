const { Schema, model, default: mongoose } = require("mongoose");

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: [true, "Please provide a rating."],
  },
  title: {
    type: String,
    maxlength: 50,
    trim: true,
    required: [true, "Please provide a review title."],
  },
  comment: {
    type: String,
    maxlength: 400,
    trim: true,
    required: [true, "Please provide a comment."],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.ObjectId,
   ref: "Product",
    required: true,
  },
}, {timestamps: true});

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = model("Review", ReviewSchema);
