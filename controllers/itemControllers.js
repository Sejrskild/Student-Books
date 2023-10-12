import Item from "../models/Item.js";
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
    if (amount) {
      const items = await Item.find({}).limit(parseInt(amount));
      return res.status(200).json(items);
    }

    const items = await Item.find({});
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
      soldBy: req.user.userId,
    });

    res.status(201).json({
      message: "Din bog er nu oprettet og kan ses af andre brugere 🥳",
      type: "success",
      title: "Mega fedt! 🤩",
      item,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
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
