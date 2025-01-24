const express = require('express');
const methodOverride = require('method-override');
const database = require("./config/database");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Cài đặt và sử dụng cookie-parser
const session = require('express-session'); // Cài đặt và sử dụng express-session
const flash = require('express-flash');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const systemConfig = require("./config/system");

// Kết nối database
database.connect();

// Sử dụng các middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('tanngo729')); // Thay thế express.cookieParser
app.use(
  session({
    secret: 'tanngo729', // Bí mật mã hóa session
    resave: false, // Không lưu session nếu không thay đổi
    saveUninitialized: true, // Lưu session ngay cả khi chưa khởi tạo
    cookie: { maxAge: 60000 }, // Thời gian hết hạn của cookie (60 giây)
  })
);
app.use(flash());

// Cấu hình static file
console.log(__dirname);
app.use(express.static(`${__dirname}/public`));


// Cấu hình view engine
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Cấu hình các biến cục bộ
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Định tuyến
const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
route(app);
routeAdmin(app);

// Khởi động server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
