"use strict";

var Product = require("../../models/product.model"); // [GET] - /products 


module.exports.product = function _callee(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product.find({
            status: "active",
            deleted: "false"
          }));

        case 2:
          products = _context.sent;
          console.log(products);
          res.render('client/pages/products/index', {
            pageTitle: "Danh sách sản phẩm",
            products: products
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};