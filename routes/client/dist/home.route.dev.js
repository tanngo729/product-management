"use strict";

var express = require('express');

var router = express.Router();

var controller = require("../../controllers/client/home.controller");

router.get('/', controller.home);
module.exports = router;