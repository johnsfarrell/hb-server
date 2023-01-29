const { test } = require("../Controllers/UserControllers");
const {
  db,
  getStory,
  getRecentStory,
  getPopularStory,
} = require("../Controllers/DBControllers");

const router = require("express").Router();

router.post("/test", test);
router.get("/getstory/:id", getStory);
router.get("/getrecentstory", getRecentStory);
router.get("/getpopularstory", getPopularStory);

router.post("/poststory", db);

module.exports = router;
