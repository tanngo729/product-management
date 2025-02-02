"use strict";

var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  deleted: Boolean,
  status: String
});
var Product = mongoose.model("Product", productSchema, 'products');
module.exports = Product;