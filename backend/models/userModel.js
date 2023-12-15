const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  pin: { type: String, required: true },
  images: [{ type: String, required: true }],
  links: [{ platform: { type: String }, url: { type: String } }],
  address: { type: String, required: true },
  cvLink: { type: String, required: true },
});

userSchema.methods.generateToken = async function () {
  try {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        phone: this.phone,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log("error in token");
  }
};
userSchema.methods.matchPasswordPin = async function (
  enteredPassword,
  enteredpin
) {
  return (enteredPassword == this.password && enteredpin == this.pin);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
