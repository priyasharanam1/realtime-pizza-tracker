const order = require("../../../models/order");

const Order = require("../../../models/order");

function orderController() {
  return {
    index(req, res) {
      adminOrderController
        .find({ status: { $ne: "completed" } }, null, {
          //$ne means not equal to
          sort: { createdAt: -1 }, //sort in descending order of created at time of orders
        })
        .poopulate("customerId", "-password") //populate the whole data of an order with the given customerid excl password
        .exec((err, orders) => {
          if (req.xhr) {
            return res.json(orders);
          } else {
            res.render("admin/orders");
          }
        });
    },
  };
}
module.exports = orderController;
