import Item from "../models/Item.js";
import User from "../models/User.js";
import getTextLabels from "../utilities/googleVision.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  organization: "org-MSG51eS7SnKuzQxU7Qk220at",
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAllItems = async (req, res) => {
  const { amount } = req.query;

  try {
    let query = Item.find({}).populate({
      path: "soldBy",
      select: "-password -updatedAt -__v -confirmationToken",
    });

    if (amount) {
      query = query.limit(parseInt(amount));
    }

    const items = await query;
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItemsByUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "No user id provided" });
  }
  try {
    const items = await Item.find({ soldBy: id });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItemsBySearch = async (req, res) => {
  const { search } = req.query;

  try {
    const items = await Item.find({
      $or: [{ title: { $regex: search, $options: "i" } }],
    })
      .populate({
        path: "soldBy",
        select: "-password -updatedAt -__v -confirmationToken",
      })
      .sort({ isPromoted: -1, createdAt: -1 });

    return res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      image,
      condition,
      location,
      fieldOfStudy,
      semester,
      description,
    } = req.body;

    if (!title || !price || !condition) {
      return res.status(400).json({ message: "Udfyld alle felter" });
    }

    if (
      condition !== "😭" &&
      condition !== "😕" &&
      condition !== "😄" &&
      condition !== "🤩"
    ) {
      return res
        .status(400)
        .json({ message: "Condition skal være en af de 4 emojis" });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Prisen skal være over 0 kr." });
    }

    let user = await User.findByIdAndUpdate(
      req.user.userId,
      { $inc: { amountOfItemsListed: 1 } },
      { new: true }
    );

    console.log(user);

    // await User.findByIdAndUpdate(req.user.userId, {
    //   $inc: { amountOfItemsListed: 1 },
    // });

    const item = await Item.create({
      title,
      author,
      price,
      image,
      condition,
      location,
      fieldOfStudy,
      semester,
      description,
      soldBy: user,
    });

    res.status(201).json({
      message: "Din bog er nu oprettet og kan ses af andre brugere 🥳",
      type: "success",
      title: "Mega fedt! 🤩",
      item,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const generateDescriptionWithOpenAI = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      condition,
      location,
      fieldOfStudy,
      semester,
    } = req.body;

    let content = `You are selling a book on Facebook Marketplace. You are to make the description for the sales post. The users on the platform are young. Please only provide 3-5 lines of text.: The book has the following information:  `;
    if (title) content += `The title of the book is ${title}. `;
    if (author) content += `The author is ${author}. `;
    if (price) content += `The price is listed  ${price} kr. `;
    if (condition)
      content += `The condition of the book is described as ${condition}. `;
    if (location) content += `The book is located at ${location}. `;
    if (fieldOfStudy)
      content += `The book is used in the field of study ${fieldOfStudy}. `;
    if (semester) content += `The book is used in ${semester} semester. `;

    content += "The answers must be in danish, and has to be written simple.";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content,
        },
      ],
    });
    let answer = response.choices[0].message.content;

    res.status(200).json({ description: answer, type: "success" });
  } catch (error) {
    res.status(404).json({ message: error.message, type: "error" });
  }
};

export const getTextFromImage = async (req, res) => {
  try {
    const { image } = req.body;
    const text = await getTextLabels(image);
    res.status(200).json({ text, type: "success" });
  } catch (error) {
    res.status(404).json({ type: "error", error });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.soldBy.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Item.findByIdAndDelete(id);

    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { amountOfItemsListed: -1 },
    });

    const user = await User.findById(req.user.userId);

    res.status(200).json({ message: "Item deleted", type: "success", user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
