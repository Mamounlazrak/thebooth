const { Schema, model } = require("mongoose");
const User = require('../models/User.model');
const OrgEvents = require('../models/OrganicEvents.model');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const Comments = new Schema(
  {
    title: { type: String, required: true},
    commentCreater: {type: Schema.Types.ObjectId, ref: 'User' },
    textArea: String,
    picture: { type: String, default: 'images/default-avatar.png'
    },
    replyThread: [{type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const uComments = model("uComments", Comments);

module.exports = uComments;
