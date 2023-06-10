const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/:id").delete(protect, deleteUser);

module.exports = router;
