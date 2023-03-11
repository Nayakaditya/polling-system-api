const express = require("express");
const router = express.Router();
const optionController = require("../../../controllers/api/v1/option_controller"); // importing option controller to set routes to their respective functions

router.route("/:id/delete").delete(optionController.delete); // to delete an option
router.route("/:id/add_vote").put(optionController.addVote); // to increament the count of votes

module.exports = router; // exporting router to app.js file
