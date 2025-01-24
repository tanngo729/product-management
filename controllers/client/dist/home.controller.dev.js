"use strict";

// [GET] - /
module.exports.home = function (req, res) {
  res.render('client/pages/home/index', {
    pageTitle: "Trang chủ"
  });
};