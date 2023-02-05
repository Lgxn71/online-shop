const express = require("express");
const adminController = require("../controllers/admin-controllers");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

router.get("/admin/products", adminController.getProduct); // /admin/products

router.get("/admin/products/new", adminController.getNewProduct);

router.post(
  "/admin/products",
  imageUploadMiddleware ,
  // uploaded files should be extracted and stored
  adminController.createNewProduct
);

module.exports = router;
