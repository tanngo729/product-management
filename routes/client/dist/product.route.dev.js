"use strict";

var express = require('express');

var router = express.Router();

var controller = require("../../controllers/client/product.controller");

router.get('/', controller.product);
module.exports = router;