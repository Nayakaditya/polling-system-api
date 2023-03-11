const Option = require("../../../models/option");

module.exports = {
  // +++++++++++++++++++++++ DELETE A SINGLE OPTION ++++++++++++++++++++++++++ //
  delete: async (req, res) => {
    try {
      // trying to delete an option with given option id

      const optionID = req.params.id;
      const option = await Option.findById(optionID); // finding option by its id

      // if that option is not there
      if (!option) {
        return res.status(404).json({
          // send a json file with status code 404 (not found)
          success: false,
          message: `Option does not found with this id : ${optionID}`,
        });
      }

      // if option found
      // delete the option
      await Option.deleteOne({ _id: req.params.id });

      // then send a json file with status code 200 (ok)
      res.status(200).json({
        success: true,
        message: `You have delete an option with id ${option.id} successfully`,
      });

      // if any error
    } catch (error) {
      // send a json file with status code 500 (Internal server error)
      res.status(500).json({
        success: false,
        message: "Internal Server Error | Error in deleting option",
        error,
      });
    }
  },

  // +++++++++++++++++++++++ ADD A VOTE +++++++++++++++++++++++++++++++ //
  addVote: async (req, res) => {
    // trying to add vote to a particular option
    try {
      // finding option with their id
      const option = await Option.findById(req.params.id);

      // incrementing votes field value by 1
      option.votes += 1;

      // and then saving it to the database
      await option.save();

      // and after sending a json file as response with status code 200 (ok)
      res.status(200).json({
        success: true,
        message: "Vote incremented by 1",
      });
      // if any error
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in adding vote",
        error,
      });
    }
  },
};
