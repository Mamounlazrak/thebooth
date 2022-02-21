const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: { type: String, required: true},
    lastName: {type: String, required: true},
    location: {City: String, required: true},
    description: String,
    avatar: { type: String,
              default: 'images/default-avatar.png'
    },
    username: { type: String, 
                required: true,
                unique: true
    },
    password: { type: String, 
      required: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
