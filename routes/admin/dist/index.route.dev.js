"use strict";

var system = require("../../config/system");

var dashboardRoutes = require("./dashboard.route");

var productRoutes = require("./product.route");

module.exports = function (app) {
  var PATH_ADMIN = system.prefixAdmin;
  app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);
  app.use(PATH_ADMIN + '/products', productRoutes);
};