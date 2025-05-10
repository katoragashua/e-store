const { Schema, model, default: mongoose } = require("mongoose");

const ReviewSchema = new Schema(
  {
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
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  console.log(this);
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  // console.log(result);

  try {
    const product = await this.model("Product").findOne({ _id: productId });
    product.averageRating = result[0]?.averageRating.toFixed(1) || 0;
    product.numOfReviews = result[0]?.numOfReviews || 0;
    await product.save();
    // console.log(product);
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.model().calculateAverageRating(this.product);
  await this.constructor.calculateAverageRating(this.product);
});
ReviewSchema.post("deleteOne", async function () {
  await this.calculateAverageRating(this.product);
});

module.exports = model("Review", ReviewSchema);
