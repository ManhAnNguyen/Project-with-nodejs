const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createNewUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser);

router.route("/:id").get(userController.getUserById);
module.exports = router;
