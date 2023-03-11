const Question = require("../../../models/question");
const Option = require("../../../models/option");

// +++++++++++++++++++++++ CREATE A SINGLE QUESTION ++++++++++++++++++++++++++👍//
module.exports.createQuestion = async function (req, res) {
  try {
    const question = await Question.create(req.body);

    await question.save();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      questionID: question.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating a question",
    });
  }
};

// +++++++++++++++++++++++ DELETE A SINGLE QUESTION ++++++++++++++++++++++++++👍//
module.exports.delete = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: `This question is already deleted or does not exist`,
      });
    }

    if (question.options.some((option) => option.votes > 0)) {
      return res.status(400).json({
        success: false,
        message:
          "Question cannot be deleted because one of its option has votes",
      });
    }

    await Question.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "A Question with related options are deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in deleting a question`,
      error,
    });
  }
};

// +++++++++++++++++++++++ VIEW SINGLE QUESTION ++++++++++++++++++++++++++👍//
module.exports.viewSingleQuestion = async (req, res, next) => {
  try {
    const questionID = req.params.id;
    const question = await Question.findById(questionID);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: `Question not found with this id: ${questionID}`,
      });
    }

    const options = question.options.map((option) => ({
      id: option.id,
      text: option.title,
      votes: option.votes,
      link_to_vote: `${req.protocol}://${req.get("host")}/api/v1/options/${
        option.id
      }/add_vote`,
    }));

    res.status(200).json({
      success: true,
      id: question.id,
      title: question.title,
      options: options,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in viewing a question",
    });
  }
};

// +++++++++++++++++++++++ CREATE OPTIONS ++++++++++++++++++++++++++ //
module.exports.createOption = async (req, res, next) => {
  try {
    const qID = req.params.id;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: `Cannot find question with id: ${qID}`,
      });
    }

    const { title, votes } = req.body;
    const option = await Option.create({ title, votes });

    const voteLink = `${req.protocol}://${req.get("host")}/api/v1/options/${
      option.id
    }/add_vote`;

    question.options.push({
      id: option._id,
      title: option.title,
      votes: option.votes,
      link_to_vote: voteLink,
    });

    await question.save();

    res.status(200).json({
      success: true,
      message: "Option created successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error in creating options",
      error: error.message,
    });
  }
};
