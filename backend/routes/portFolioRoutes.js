const express = require("express");
const router = express.Router();

const {
  Home,
  userDetails,
  sendMessage,
  fetchEducation,
  fetchProject,
  fetchSkill,
} = require("../controllers/portfolioController");

router.route("/").get(Home);
router.route("/userinfo").get(userDetails);
router.route("/message").post(sendMessage);
router.route("/educations").get(fetchEducation);
router.route("/projects").get(fetchProject);
router.route("/skills").get(fetchSkill);

module.exports = router;