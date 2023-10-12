import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

import User from "../models/User.js";
import Item from "../models/Item.js";
import sendEmailToUser from "../utilities/mail.js";

// Get Single User
const getUser = async (req, res) => {
  if (!req.body.token) {
    return res.status(400).json({
      message: "Manglende token",
    });
  }

  try {
    const { userId } = jwt.decode(req.body.token, process.env.JWT_SECRET);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Brugeren findes ikke",
      });
    }

    user.password = undefined;

    res.status(200).json({
      user,
      message: "Brugeren blev fundet 🥳",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Der skete en fejl",
      error,
    });
  }
};

const getUserInformation = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      message: "Manglende bruger ID",
    });
  }

  // Try to find the user and return it
  try {
    const user = await User.findById(userId);
    const items = await Item.find({ soldBy: userId });

    if (!user) {
      return res.status(404).json({
        message: "Brugeren findes ikke",
      });
    }

    user.password = undefined;
    const result = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      phone_code: user.phone_code,
      _id: user._id,
      image: user.image,
      createdAt: user.createdAt,
    };

    res.status(200).json({
      items,
      user: result,
      message: "Brugeren blev fundet 🥳",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Der skete en fejl",
      error,
    });
  }
};

// Create User
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone_code, phone, password } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !phone_code
    ) {
      return res.status(400).json({
        message: "Udfyld alle felter",
      });
    }

    const emailLowerCase = email.toLowerCase();

    const duplicateEmailUser = await User.findOne({ emailLowerCase });
    if (duplicateEmailUser) {
      return res.status(400).json({
        message: "Der findes allerede en bruger med den indtastede e-mail 😫",
      });
    }

    const duplicatePhoneUser = await User.findOne({ phone });
    if (duplicatePhoneUser) {
      return res.status(400).json({
        message:
          "Der findes allerede en bruger med det indtasede telefonnummer 🤪",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email: emailLowerCase,
      phone,
      password,
      phone_code,
    });
    const token = user.JWT();

    user.confirmationToken = token;

    await user.save();

    await sendEmailToUser(user.email, token, "confirm_email");

    res.status(201).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
      message: "Bruger oprettet",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Der skete en fejl",
      error,
    });
  }
};

// Email Confirmation/Verification
const confirmEmail = async (req, res) => {
  try {
    const { token } = req.query; // Hent token fra URL'en

    if (!token) {
      return res.status(400).json({ message: "Manglende token" });
    }

    // Find brugeren baseret på tokenet
    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Ugyldig token" });
    }

    // Opdater brugerens e-mailbekræftelse i databasen
    user.isEmailVerified = true;

    await user.save();

    res.status(200).json({ message: "E-mail bekræftet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Der opstod en fejl" });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Udfyld venligst alle felter for at logge ind.",
      type: "error",
      title: "Udfyld alle felter",
    });
  }

  const emailLowerCase = email.toLowerCase();

  const user = await User.findOne({ email: emailLowerCase }).select(
    "+password"
  );
  if (!user) {
    return res.status(400).json({
      message: "Brugeren findes ikke.",
      type: "error",
      title: "Der skete en fejl!",
    });
  }

  const correctPassword = await user.checkPassword(password);
  if (!correctPassword) {
    return res.status(404).json({
      message: "Der skete desværre en fejl. Muligvis fejl 40?",
      type: "error",
      title: "Pas på! Der skete en fejl!",
    });
  }

  if (!user.isEmailVerified) {
    return res.status(400).json({
      message:
        "Din email er ikke bekræftet. Bekræft venligst din email før du logger ind.",
      type: "error",
      title: "Bekræft din email",
    });
  }

  const token = user.JWT();

  // Setting password to undefined, as we don't want to passed the hashed password around.
  user.password = undefined;

  res.status(200).json({
    user,
    token,
    type: "success",
    message: "Du er nu logget ind 🥳",
    title: "Velkommen tilbage!",
  });
};

// Generates a unique combination code that is used for resetting the password, only users with access to the email can reset the password.
const forgotPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        type: "error",
        message: "Der skete en fejl, prøv igen!",
        title: "Fejl - manglende email",
      });
    }

    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase });

    if (!user) {
      return res.status(404).json({
        type: "error",
        message: "Der skete en fejl, prøv igen!",
        title: "Fejl - bruger ikke fundet",
      });
    }

    const randomResetCode = Math.random().toString(36).slice(2);
    await User.updateOne(
      { email: emailLowerCase },
      { reset_password_code: randomResetCode }
    );

    await sendEmailToUser(
      user.email,
      "",
      "forgot_password_code",
      randomResetCode
    );

    // Resets the reset_password_code after 5 minutes (300000 ms)
    setTimeout(async () => {
      await User.updateOne(
        { email: emailLowerCase },
        { reset_password_code: "" }
      );
    }, 1000 * 60 * 5);

    return res.status(200).json({
      type: "success",
      message:
        "Du har modtaget en kode på mail, som skal bruges til at ændre din kode.",
      title: "Tjek din e-mail! 😇",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      type: "error",
      message: "Der skete en fejl, prøv igen!",
      title: "Fejl - prøv igen",
    });
  }
};

// Checks if the code that the user has entered is correct, if it is, the user can change the password.
const handlePasswordCodeVerification = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        type: "error",
        message: "Der skete en fejl, prøv igen!",
        title: "Fejl - manglende email eller kode",
      });
    }

    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase });

    if (!user) {
      return res.status(404).json({
        type: "error",
        message: "Der skete en fejl, prøv igen!",
        title: "Fejl - bruger ikke fundet",
      });
    }

    if (user.reset_password_code !== code) {
      return res.status(400).json({
        type: "error",
        message: "Koden du har indtastet er forkert, prøv igen!",
        title: "Fejl - Forkert kode ☹️",
      });
    }

    return res.status(200).json({
      type: "success",
      message: "Koden er korrekt, du kan nu ændre din kode.",
      title: "Koden er korrekt!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      type: "error",
      message: "Der skete en fejl, prøv igen!",
      title: "Fejl - prøv igen",
    });
  }
};

// Changes the password for the user
const handlePasswordChange = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res.status(400).json({
        type: "error",
        message: "Der skete en fejl, prøv igen!",
        title: "Fejl - manglende email, kode eller kodeord",
      });
    }

    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase });

    if (!user) {
      return res.status(404).json({
        type: "error",
        message: "Der skete en fejl, prøv igen!",
        title: "Fejl - bruger ikke fundet",
      });
    }

    if (user.reset_password_code !== code) {
      return res.status(400).json({
        type: "error",
        message: "Koden du har indtastet er forkert, prøv igen!",
        title: "Fejl - Forkert kode 😭",
      });
    }

    user.password = password;
    user.reset_password_code = "";

    await user.save();

    return res.status(200).json({
      type: "success",
      message: "Din kode er nu ændret, du kan nu logge ind med din nye kode.",
      title: "Kode ændret! ✅",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      type: "error",
      message: "Der skete en fejl, prøv igen!",
      title: "Fejl - prøv igen",
    });
  }
};

export {
  createUser,
  confirmEmail,
  login,
  forgotPasswordCode,
  handlePasswordCodeVerification,
  handlePasswordChange,
  getUser,
  getUserInformation,
};
