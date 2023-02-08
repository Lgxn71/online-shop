const stripe = require("stripe")(
  ""
);

const Order = require("../models/order-model");
const User = require("../models/user-model");

getOrder = async (req, res, next) => {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
};

addOrder = async (req, res, next) => {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);
  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }
  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map((item) => {
      return {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        // price: "{{PRICE_ID}}",
        //we need to store product and use id on stripe server and point on that id
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
        },
        // or work with price_data

        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  res.redirect(303, session.url);
};

getSuccess = (req, res) => {
  res.render("customer/orders/success");
};
getFailure = (req, res) => {
  res.render("customer/orders/failure");
};
module.exports = {
  addOrder: addOrder,
  getOrder: getOrder,
  getFailure: getFailure,
  getSuccess: getSuccess,
};
