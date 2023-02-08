const express = require("express");

const router = express.Router();
const ordersController = require("../controllers/orders-controller");
//..to up

router.post("/orders", ordersController.addOrder);

router.get("/orders", ordersController.getOrder);

router.get("/orders/success", ordersController.getSuccess);
router.get("/orders/failure", ordersController.getFailure);

module.exports = router;
