const { Schema, model } = require("mongoose");
const User = require('../models/User.model');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const OrganicEvents = new Schema(
  {
    title: { type: String, required: true},
    date: {type: Number, required: true},
    location: {City: String, Venue: String, required: true},
    duration: Number,
    Genre: String,
    performingArtist: String,
    description: String,
    picture: { type: String, default: 'images/default-avatar.png'
    },
    connections: [],
    organicEvents: [],
    genres: { type: String},
    favArtist: { type: String },
    festivals: { type: String },
    venues: { type: String }, 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const OrgEvents = model("OrgEvents", OrganicEvents);

module.exports = OrgEvents;
