"use strict";

var express = require('express');

var router = express.Router();

var controller = require("../../controllers/admin/product.controller");

router.get('/', controller.product);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router["delete"]("/delete/:id", controller.deleteItem);
module.exports = router;