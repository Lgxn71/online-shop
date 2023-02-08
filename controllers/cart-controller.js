const Product = require("../models/product-models");

getCart = (req, res) => {
  res.render("customer/cart/cart");
};

addCartItem = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.body.productid);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  console.log(cart);
  res.status(201).json({
    message: "cart updated!",
    newTotalItems: cart.totalQuantity,
  });
};

updateCartItem = (req, res) => {

  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(
    req.body.productId,
    +req.body.quantity
  );
  req.session.cart = cart;

  res.json({
    message: "Item updated!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
};
module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
