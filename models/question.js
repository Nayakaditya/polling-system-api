const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Option",
        },
        title: String,
        votes: Number,
        link_to_vote: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
