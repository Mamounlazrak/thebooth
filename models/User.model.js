const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    location: String,
    description: String,
    avatar: { type: String, default: 'images/default-avatar.png'},
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    connections: [{type: Schema.Types.ObjectId, ref: 'User'}],
    organicEvents: [{type: Schema.Types.ObjectId, ref: 'OrgEvents'}],
    genres: { type: String},
    favArtist: { type: String },
    festivals: { type: String },
    venues: { type: String }, 
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
