import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const BCRYPT_SALT = 15;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Udfyld fornavn"],
      trim: true,
      maxlength: [15, "Navn må ikke være længere end 25 tegn"],
      minlength: [2, "Navn må ikke være kortere end 3 tegn"],
    },
    lastName: {
      type: String,
      required: [true, "Udfyld efternavn"],
      trim: true,
      maxlength: [25, "Navn må ikke være længere end 25 tegn"],
      minlength: [2, "Navn må ikke være kortere end 3 tegn"],
    },
    //   base64 image
    image: {
      type: String,
    },
    avatar: {
      type: String,
      required: [true, "Vælg en avatar"],
    },
    email: {
      type: String,
      required: [true, "Udfyld email"],
      unique: true,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    confirmationToken: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Udfyld telefonnummer"],
      unique: true,
      trim: true,
    },
    phone_code: {
      type: String,
      required: [true, "Udfyld landekode"],
      trim: true,
    },
    user_rating: {
      type: Number,
      default: 0,
    },
    user_rating_count: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: [true, "Udfyld password"],
      select: false,
    },
    reset_password_code: {
      type: String,
    },
    amountOfItemsListed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Methods used in controllers/userControllers.js
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  } else {
    const salt = await bcrypt.genSalt(BCRYPT_SALT);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.checkPassword = async function (enteredPassword) {
  const correctPassword = await bcrypt.compare(enteredPassword, this.password);
  return correctPassword;
};

UserSchema.methods.JWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);
