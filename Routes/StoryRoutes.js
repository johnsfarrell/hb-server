const { test } = require("../Controllers/UserControllers");
const { db } = require("../Controllers/DBControllers");

const router = require("express").Router();

router.post("/test", test);
router.post("/poststory", db);

module.exports = router;
