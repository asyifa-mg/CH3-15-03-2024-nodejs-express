const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router
  .route("/")
  .get(getCustomers.getCustomers)
  .post(customerController.createCustomer);
router
  .route("/:id")
  .get(getCustomersById)
  .patch(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
