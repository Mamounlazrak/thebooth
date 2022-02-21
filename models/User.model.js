const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    location: {type: String, required: true},
    description: String,
    avatar: { type: String,
              default: 'images/default-avatar.png'
    },
    username: { type: String, 
                required: true,
                unique: true
    },
    password: { type: String, required: true
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

const User = model("User", userSchema);

module.exports = User;
