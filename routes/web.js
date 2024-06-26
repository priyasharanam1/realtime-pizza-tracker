const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController');
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require('../app/http/controllers/admin/orderController');

function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/login", guest, authController().login); 
  //guest middleware is used to ensure that logged in users do not reach to login or register page
  app.post("/login", authController().postLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister)
  app.post("/logout", authController().logout)
  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  //customer routes
  app.post("/orders", auth, orderController().store); //used suth middleware for protected routes
  app.get("/customer/orders", auth,  orderController().index);


  //admin routes
  app.get('/admin/orders', adminOrderController().index)
}

module.exports = initRoutes;
