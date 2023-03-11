const express = require("express");
const router = express.Router();
const questionController = require("../../../controllers/api/v1/question_controller"); // importing question controller to set routes to their respective functions

router.route("/create").post(questionController.createQuestion); // to create a new question
router.route("/:id/options/create").post(questionController.createOption); // to create a new option for a given question
router.route("/:id/delete").delete(questionController.delete); // to delete a question with the given ID
router.route("/:id").get(questionController.viewSingleQuestion); // to view a single question with the given ID

module.exports = router; // exporting router to app.js file
