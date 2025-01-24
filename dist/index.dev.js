"use strict";

// 1. Import các thư viện cần thiết
var express = require('express');

var methodOverride = require('method-override');

var database = require("./config/database");

var bodyParser = require('body-parser');

require('dotenv').config(); // 2. Cấu hình cơ bản


var app = express();
var port = process.env.PORT;

var systemConfig = require("./config/system");

app.use(methodOverride('_method')); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // 3. Kết nối cơ sở dữ liệu

database.connect(); // 4. Cấu hình middleware

app.use(express["static"]('public')); // 5. Cấu hình view engine

app.set('views', './views');
app.set('view engine', 'pug'); // 6. Định nghĩa biến toàn cục

app.locals.prefixAdmin = systemConfig.prefixAdmin; // 7. Định nghĩa routes

var route = require('./routes/client/index.route');

var routeAdmin = require('./routes/admin/index.route');

route(app);
routeAdmin(app); // 8. Khởi động server

app.listen(port, function () {
  console.log("App listening on port ".concat(port));
});