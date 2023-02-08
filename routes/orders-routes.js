const express = require("express");

const router = express.Router();
const ordersController = require("../controllers/orders-controller");
//..to up

router.post("/orders", ordersController.addOrder);

router.get("/orders", ordersController.getOrder);

module.exports = router;
