const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { StatusCodes } = require("http-status-codes");
const path = require("node:path");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  UnsupportedMediaError,
} = require("../errors/index");

// cloudinary SDK configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadPhotos = async (req, res) => {
  if (!req.files) throw new BadRequestError("No file selected.");
  const photos = req.files;
  const maxSize = 1024 * 1024 * 15;
  const minSize = 1024 * 1024 * 5;
  const urls = [];
  for (const photo of photos) {
    if (!photo.mimetype.startsWith("image"))
      throw new UnsupportedMediaError("Files must be images.");

    if (photo.size > maxSize)
      // if (photo.size > maxSize || photo.size < minSize)
      throw new BadRequestError("Image must not be greater than 15mb.");
    const { secure_url } = await cloudinary.uploader.upload(photo.path, {
      use_filename: true,
      folder: "E-Store",
    });
    urls.push(secure_url);
    fs.unlinkSync(photo.path);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Photos uploaded succesfully.", urls });
};

const uploadProfilePhoto = async (req, res) => {
  if (!req.file) throw new BadRequestError("No file selected.");
  const photo = req.file;
  const maxSize = 1024 * 1024 * 15;
  const minSize = 1024 * 1024 * 5;

  if (!photo.mimetype.startsWith("image"))
    throw new UnsupportedMediaError("File must be an image.");

  if (photo.size > maxSize)
    // if (photo.size > maxSize || photo.size < minSize)
    throw new BadRequestError("Image must not be greater than 15mb.");
  const { secure_url } = await cloudinary.uploader.upload(photo.path, {
    use_filename: true,
    folder: "E-Store",
  });
  fs.unlinkSync(photo.path);

  res
    .status(StatusCodes.OK)
    .json({ msg: "Photo uploaded succesfully.", secure_url });
};

module.exports = { uploadPhotos, uploadProfilePhoto };
