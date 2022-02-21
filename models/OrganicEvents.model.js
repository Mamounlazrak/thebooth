const { Schema, model } = require("mongoose");
const User = require('../models/User.model');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const OrganicEvents = new Schema(
  {
    title: { type: String, required: true},
    date: {type: Number, required: true},
    eventCreater: {type: Schema.Types.ObjectId, ref: 'User' },
    location: {City: String, Venue: String, required: true},
    duration: Number,
    Genre: { type: String, required: true},
    performingArtist: String,
    description: { type: String, required: true},
    entry: { type: String, required: true},
    picture: { type: String, default: 'images/default-avatar.png'
    },
    attendees: [{type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [], 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const OrgEvents = model("OrgEvents", OrganicEvents);

module.exports = OrgEvents;
