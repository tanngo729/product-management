const Product = require("../../models/product.model");

module.exports.product = async (req, res) => {
  // Lấy data 
  let find = {
    deleted: true
  };
  // End

  const products = await Product.find(find);
  res.render('admin/pages/trash/index.pug', {
    pageTitle: "Trash",
    products: products
  });
}

// [RESTORE] - /admin/trash/restore/:id
module.exports.restore = async (req, res) => {
  const id = req.params.id

  await Product.updateOne({ _id: id }, { deleted: false });


  res.redirect("back");
}

module.exports.restoreMulti = async (req, res) => {
  const id = req.body.ids.split(",");

  await Product.updateMany({ _id: id }, { deleted: false });

  res.redirect("back");
}

module.exports.removeItem = async (req, res) => {
  const id = req.params.id

  await Product.deleteOne({ _id: id });

  res.redirect("back");
}