import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/unauthenticated.js";

// Checks if the user is authenticated.

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("Du kunne ikke verficeres. ");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError("Du kunne ikke verficeres. Auth error: 500");
  }
};

export default authenticateUser;
