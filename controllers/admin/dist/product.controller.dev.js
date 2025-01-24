"use strict";

var Product = require("../../models/product.model");

var filterStatusHelper = require("../../helper/filterStatus");

var searchHelper = require("../../helper/search");

var paginationHelper = require("../../helper/pagination"); // [GET] - /admin/products


module.exports.product = function _callee(req, res) {
  var find, filterStatus, objectSearch, countProducts, objectPagination, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Lấy data 
          find = {
            deleted: false
          }; // End
          // Bộ lọc

          filterStatus = filterStatusHelper(req.query);

          if (req.query.status) {
            find.status = req.query.status;
          } // End
          // Tìm kiếm


          objectSearch = searchHelper(req.query);

          if (objectSearch.regex) {
            find.name = objectSearch.regex;
          } // End
          // Phân trang


          _context.next = 7;
          return regeneratorRuntime.awrap(Product.countDocuments(find));

        case 7:
          countProducts = _context.sent;
          objectPagination = paginationHelper({
            currentPage: 1,
            limitItem: 8
          }, req.query, countProducts); // End 

          _context.next = 11;
          return regeneratorRuntime.awrap(Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip));

        case 11:
          products = _context.sent;
          res.render('admin/pages/product/index', {
            pageTitle: "Product",
            products: products,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword,
            pagination: objectPagination
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [PATH] - /admin/products/change-status/:status/:id


module.exports.changeStatus = function _callee2(req, res) {
  var status, id;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          status = req.params.status;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: id
          }, {
            status: status
          }));

        case 4:
          res.redirect("back");

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // [PATH] - /admin/products/change-multi


module.exports.changeMulti = function _callee3(req, res) {
  var type, id;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          type = req.body.type;
          id = req.body.ids.split(",");
          _context3.t0 = type;
          _context3.next = _context3.t0 === "active" ? 5 : _context3.t0 === "inactive" ? 8 : 11;
          break;

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: id
            }
          }, {
            status: "active"
          }));

        case 7:
          return _context3.abrupt("break", 12);

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: id
            }
          }, {
            status: "inactive"
          }));

        case 10:
          return _context3.abrupt("break", 12);

        case 11:
          return _context3.abrupt("break", 12);

        case 12:
          res.redirect("back");

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // [DELETE] - /admin/products/delete/:id


module.exports.deleteItem = function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.deleteOne({
            _id: id
          }));

        case 3:
          res.redirect("back");

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};