"use strict";

var express = require('express');

var router = express.Router();

var controller = require("../../controllers/admin/dashboard.controller");

router.get('/', controller.dashboard);
module.exports = router;