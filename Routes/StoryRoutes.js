const { test } = require("../Controllers/UserControllers");
const {
  db,
  getStory,
  getRecentStory,
  incrementStoryViews,
  getPopularStory,
} = require("../Controllers/DBControllers");

const router = require("express").Router();

router.post("/test", test);
router.get("/getstory/:id", getStory);
router.get("/getrecentstory", getRecentStory);
router.get("/getpopularstory", getPopularStory);

router.get("/incrementviews/:id", incrementStoryViews);

router.post("/poststory", db);

module.exports = router;
