const mongoose = require("mongoose");
const Isemail = require("isemail");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      trim: true,
      maxlength: [20, "Username cannot exceed 20 characters."],
      minlength: [2, "Username must be 2 charaters or more."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        (val) => Isemail.validate(val),
        "Enter a valid email address.",
      ],
      trim: true,
      lowercase: true,
      maxlength: [50, "Email must not exceed 50 characters."],
      minlength: [6, "Email must not not be less than 6 characters."],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must not be less than 6 characters."],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verified: {
      type: Date,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    passwordToken: {
      type: String,
    },
    passwordTokenExpiration: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Using mongoose hooks, hash the password before saving
UserSchema.pre("save", async function () {
  console.log(this.modifiedPaths());
  // The if block is used to make sure the password in only hashed if it has changed
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
