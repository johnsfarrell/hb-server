const {
  setCollegeList,
  deleteAccount,
  submitQuestionaire,
  getQuestionaire,
  getCollegeList,
  getName,
  getProfilePicture,
} = require("../Controllers/UserControllers");

const router = require("express").Router();

router.post("/submit-questionaire/:id", submitQuestionaire);
router.get("/get-questionaire/:id", getQuestionaire);
router.get("/set-college-list/:id", setCollegeList);
router.get("/get-college-list/:id", getCollegeList);
router.get("/delete-account/:id", deleteAccount);
router.get("/get-name/:id", getName);
router.get("/get-profile-picture/:id", getProfilePicture);

module.exports = router;
