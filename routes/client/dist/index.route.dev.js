"use strict";

var productRoutes = require("./product.route");

var homeRoutes = require("./home.route");

module.exports = function (app) {
  app.use('/', homeRoutes);
  app.use('/products', productRoutes);
};