const express = require("express");
const viewController = require("./../controllers/viewController");

const router = express.Router();


router.route("/").get(viewController.getAllDramas);

router.get("/add", viewController.addDrama );

module.exports = router;