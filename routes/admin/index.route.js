const system = require("../../config/system");

const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const trashRoutes = require("./trash.route");

module.exports = (app) => {
  const PATH_ADMIN = system.prefixAdmin;

  app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);
  app.use(PATH_ADMIN + '/products', productRoutes);
  app.use(PATH_ADMIN + '/trash', trashRoutes);
}