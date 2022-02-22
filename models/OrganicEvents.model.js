const { Schema, model } = require("mongoose");
const User = require('../models/User.model');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const OrganicEvents = new Schema(
  {
    title: { type: String, required: true},
    date: {type: String, required: true},
    eventCreator: {type: Schema.Types.ObjectId, ref: 'User' },
    location: {type: String, required: true},
    duration: Number,
    genre: { type: String, required: true},
    performingArtist: String,
    description: { type: String, required: true},
    entry: { type: String},
    picture: { type: String, default: 'images/default-avatar.png'
    },
    attendees: [],
    comments: [], 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const OrgEvents = model("OrgEvents", OrganicEvents);

module.exports = OrgEvents;
