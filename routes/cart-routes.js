const express = require("express");

const router = express.Router();
const cartController = require("../controllers/cart-controller");
//..to up

router.post("/cart/items", cartController.addCartItem);

router.get("/cart/", cartController.getCart);
router.patch("/cart/items", cartController.updateCartItem);

module.exports = router;
