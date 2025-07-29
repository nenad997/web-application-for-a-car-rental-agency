import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User from "../models/User.mjs";

export const addUser = async (req, res, next) => {
  const { email, username, id_card_number, password } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()) {
    const error = new Error("Validation failed");
    error.data = result.array();
    throw error;
  }

  try {
    const foundUser = await User.findOne({ email });

    if (foundUser !== null) {
      throw new Error("User with this email address already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      username,
      id_card_number,
      password: hashedPassword,
    });

    const createdUserResult = await newUser.save();

    res.status(201).send({ userId: createdUserResult._id.toString() });
  } catch (err) {
    return next(err);
  }
};

export const fetchUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).send([]);
    }

    res.status(200).send(users);
  } catch (err) {
    return Response.json(err);
  }
};
