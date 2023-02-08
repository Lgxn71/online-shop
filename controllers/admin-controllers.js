const Product = require("../models/product-models");
const Order = require("../models/order-model");
getProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
};

getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

createNewProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    // get data from input
    // spread object on key pairs
    image: req.file.filename,
  });
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  } //express didnt catch error which related to promises

  res.redirect("/admin/products");
};
getUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id); //extract id
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
    return;
  }
};
updateProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    // send parameters as key pair values
    _id: req.params.id,
  });
  if (req.file) {
    //to check if we update img for product, if admin didnt change it will be undefined
    product.replaceImage(req.file.filename);
  }
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
};

deleteProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    console.log(product);
    await product.remove();
  } catch (error) {
    return next(error);
  }
  res.json({ message: "Deleted product!" });
};

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("admin/orders/admin-order", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProduct: getProduct,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  updateOrder: updateOrder,
};
