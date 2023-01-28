const { test } = require("../Controllers/UserControllers");

const router = require("express").Router();

router.get("/test", test);

module.exports = router;
