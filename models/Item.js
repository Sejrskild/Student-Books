import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Udfyld titel"],
      trim: true,
      maxlength: [25, "Titel må ikke være længere end 25 tegn"],
      minlength: [3, "Titel må ikke være kortere end 3 tegn"],
    },
    author: {
      type: String,
      required: false,
      trim: true,
      maxlength: [25, "Forfatter må ikke være længere end 25 tegn"],
      minlength: [3, "Forfatter må ikke være kortere end 3 tegn"],
    },
    price: {
      type: Number,
      required: [true, "Udfyld pris"],
    },
    image: {
      type: String,
    },
    condition: {
      type: String,
      enum: ["😭", "😕", "😄", "🤩"],
      required: [true, "Udfyld stand"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    //   The field of study that the book is related to (e.g HA(IT.))
    fieldOfStudy: {
      type: String,
      trim: true,
    },
    semester: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Item", ItemSchema);
