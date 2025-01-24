const Product = require("../../models/product.model");

// [GET] - /products 
module.exports.product = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: "false"
  }).sort({ position: "desc" });

  res.render('client/pages/products/index', {
    pageTitle: "Danh sách sản phẩm",
    products: products
  });
}

module.exports.detail = async (req, res) => {
  let find = {
    deleted: false,
    slug: req.params.slug,
    status: "active"
  };
  const product = await Product.findOne(find);

  res.render("client/pages/products/detail", {
    pageTitle: "Chi tiết sản phẩm",
    product: product
  });
}