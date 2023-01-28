const { test } = require("../Controllers/UserControllers");

const router = require("express").Router();

router.post("/test", test);

module.exports = router;
