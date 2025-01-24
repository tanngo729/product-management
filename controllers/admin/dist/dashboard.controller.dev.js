"use strict";

// [GET] - /admin/dashboard
module.exports.dashboard = function (req, res) {
  res.render('admin/pages/dashboard/index', {
    pageTitle: "Dashboard"
  });
};