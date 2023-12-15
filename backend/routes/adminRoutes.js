const express = require("express");
const router = express.Router();
const {
  userCreate,
  Login,
  getMessages,
  updateUser,
  addSkills,
  addProject,
  addEducation,
  deleteMessage,
} = require("../controllers/adminController");
const protect = require("../middlewares/authMiddleware");

router.route("/").post(userCreate);
router.route("/login").post(Login);
router.route("/messages").get(protect ,getMessages);
router.route("/userinfo").post(protect ,updateUser);
router.route("/addproject").post(protect ,addProject);
router.route("/addeducation").post(protect ,addEducation);
router.route("/addskills").post(protect ,addSkills);
router.route("/messagedelete/:id").delete(protect ,deleteMessage);


module.exports = router;
