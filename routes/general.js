var express = require("express");
const Generalontroller = require("../controllers/GeneralController");

var router = express.Router();
router.post("/", Generalontroller.generalStore);

module.exports = router;