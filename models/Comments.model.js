const { Schema, model } = require("mongoose");
const User = require('../models/User.model');
const OrgEvents = require('../models/OrganicEvents.model');

const Comments = new Schema(
  {
    title: {type: String, required: true},
    commentCreater: {type: Schema.Types.ObjectId, ref: 'User'},
    textArea: String,
    picture: { type: String, default: 'images/default-avatar.png'},
    replyThread: [{type: Schema.Types.ObjectId, ref: 'User'}],
  },
  {
    timestamps: true,
  }
);

const uComments = model("uComments", Comments);

module.exports = uComments;
