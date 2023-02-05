getProduct = (req, res) => {
  res.render("admin/products/all-products");
};

getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

createNewProduct = (req, res) => {
  
  res.redirect('/admin/products');
};

module.exports = {
  getProduct: getProduct,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
