const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: "product-data/images",
    //configure place where img will be store
    filename: (req, file, cb) => {
      cb(null, uuid() + "-" + file.originalname);
    },
    // configure how file will be stored 1 parameter for errors, second to generate filename
  }),
});

const configuredMulterMiddleware = upload.single("image");
module.exports = configuredMulterMiddleware;
