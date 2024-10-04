const router = require("express").Router();

const {
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/usersController");

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
