const router = require("express").Router();

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controllers/usersController");

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/").get(getAllUsers)

module.exports = router;
