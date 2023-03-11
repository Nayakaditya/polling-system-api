const Option = require("../../../models/option");

// +++++++++++++++++++++++ DELETE A SINGLE OPTION ++++++++++++++++++++++++++ //
module.exports.delete = async (req, res, next) => {
  try {
    const optionID = req.params.id;
    const option = await Option.findById(optionID);

    if (!option) {
      return res.status(404).json({
        success: false,
        message: `Option does not found with this id : ${optionID}`,
      });
    }

    await Option.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `You have delete an option with id ${option.id} successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error | Error in deleting option",
    });
  }
};

// +++++++++++++++++++++++ ADD A VOTE +++++++++++++++++++++++++++++++ //
module.exports.addVote = async (req, res, next) => {
  try {
    const option = await Option.findById(req.params.id);

    option.votes += 1;

    await option.save();

    res.status(200).json({
      success: true,
      message: "Vote incremented by 1",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in adding vote",
      error,
    });
  }
};
