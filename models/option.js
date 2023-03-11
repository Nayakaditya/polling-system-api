const mongoose = require("mongoose");

// Creating a Schema for Option
const optionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    link_to_vote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// app url from .evn file
const { APP_URL } = process.env;

// before save the schema I want to generate a link to vote for the option
optionSchema.pre("save", function (next) {
  if (!this.link_to_vote) {
    this.link_to_vote = `${APP_URL}/api/v1/options/${this._id}/add_vote`;
  }
  next();
});

// mongoose model using Option schema
const Option = mongoose.model("Option", optionSchema);

module.exports = Option; // exporting to use in another modules
