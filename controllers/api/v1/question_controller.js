const Question = require("../../../models/question");
const Option = require("../../../models/option");

module.exports = {
  // +++++++++++++++++++++++ CREATE A SINGLE QUESTION ++++++++++++++++++++++++++👍//
  createQuestion: async function (req, res) {
    // trying to creating a single question
    try {
      const question = await Question.create(req.body);

      // saving question to database
      await question.save();

      // sending a successful message as json format
      res.status(201).json({
        success: true,
        message: "Question created successfully",
        questionID: question.id,
      });

      // if any error
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in creating a question",
      });
    }
  },

  // +++++++++++++++++++++++ DELETE A SINGLE QUESTION ++++++++++++++++++++++++++👍//
  delete: async (req, res) => {
    // trying to delete a question
    try {
      // finding a question by its id
      const question = await Question.findById(req.params.id);

      // if that question is not present send a json file with status code 404 (not found)
      if (!question) {
        return res.status(404).json({
          success: false,
          message: `This question is already deleted or does not exist`,
        });
      }

      // then deleting that question
      await Question.deleteOne({ _id: req.params.id });

      // and sending a success message as json file
      res.status(200).json({
        success: true,
        message: "A Question with related options are deleted successfully",
      });

      // if any error
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error in deleting a question`,
        error,
      });
    }
  },

  // +++++++++++++++++++++++ VIEW SINGLE QUESTION ++++++++++++++++++++++++++👍//
  viewSingleQuestion: async (req, res) => {
    // trying to find a question with id
    try {
      // finding the question
      const questionID = req.params.id;
      const question = await Question.findById(questionID);

      // if that question is not present send a json file with status code 404 (not found)
      if (!question) {
        return res.status(404).json({
          success: false,
          message: `Question not found with this id: ${questionID}`,
        });
      }

      // mapping options from question schema
      const options = question.options.map((option) => ({
        id: option.id,
        text: option.title,
        votes: option.votes,
        link_to_vote: `${req.protocol}://${req.get("host")}/api/v1/options/${
          option.id
        }/add_vote`,
      }));

      // and sending a success message as json file
      res.status(200).json({
        success: true,
        id: question.id,
        title: question.title,
        options: options,
      });
      // if any error
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in viewing a question",
      });
    }
  },

  // +++++++++++++++++++++++ CREATE OPTIONS ++++++++++++++++++++++++++👍//
  createOption: async (req, res) => {
    // trying to create options
    try {
      // finding question with id
      const qID = req.params.id;
      const question = await Question.findById(req.params.id);

      // if that question is not present send a json file with status code 404 (not found)
      if (!question) {
        return res.status(404).json({
          success: false,
          message: `Cannot find question with id: ${qID}`,
        });
      }

      // creating option with given body
      const { title, votes } = req.body;
      const option = await Option.create({ title, votes });

      // generating new link every time for new option
      const voteLink = `${req.protocol}://${req.get("host")}/api/v1/options/${
        option.id
      }/add_vote`;

      // push created option to that question
      question.options.push({
        id: option._id,
        title: option.title,
        votes: option.votes,
        link_to_vote: voteLink,
      });

      // saving this option to question schema
      await question.save();

      // sending a success message as json file
      res.status(200).json({
        success: true,
        message: "Option created successfully",
      });
      // if any error
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in creating options",
        error: error.message,
      });
    }
  },
};
