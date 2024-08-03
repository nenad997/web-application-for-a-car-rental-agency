import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.mjs";

export const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 409;
    error.data = errors.array();
    throw error;
  }

  const body = matchedData(req);

  try {
    const fetchedUserByEmail = await User.findOne({ email: body.email });

    if (fetchedUserByEmail) {
      const error = new Error("User with this email address already exists!");
      error.status = 409;
      error.path = "email";
      throw error;
    }

    const fetchedUserByCardId = await User.findOne({
      id_card_number: body.id_card_number,
    });

    if (fetchedUserByCardId) {
      const error = new Error("User with this id card number already exists!");
      error.status = 409;
      error.path = "card_id";
      throw error;
    }

    const fetchedUserByUsername = await User.findOne({
      username: body.username,
    });

    if (fetchedUserByUsername) {
      const error = new Error("User with this user name already exists!");
      error.status = 409;
      error.path = "user_name";
      throw error;
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const newUser = new User({
      ...body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      const error = new Error("Failed to create new user");
      error.status = 400;
      throw error;
    }

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 409;
    error.data = errors.array();
    throw error;
  }

  const data = matchedData(req);

  try {
    const fetchedUser = await User.findOne({ email: data.email });

    if (!fetchedUser) {
      const error = new Error(
        "User with this email does not exist, please check your credentials"
      );
      error.status = 404;
      throw error;
    }

    const doPasswordsMatch = await bcrypt.compare(
      data.password,
      fetchedUser.password
    );

    if (!doPasswordsMatch) {
      const error = new Error("Passwords do not match");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: fetchedUser._id.toString(),
        username: fetchedUser.username,
      },
      "MY_SECRET",
      {
        expiresIn: "2 days",
      }
    );

    res.status(200).json({
      userId: fetchedUser._id.toString(),
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserDataById = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const fetchedUser = await User.findById(userId)
      .populate("rentedCars")
      .exec();

    if (!fetchedUser) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Success",
      user: {
        ...fetchedUser.toObject(),
        _id: fetchedUser._id.toString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const editUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 409;
    error.data = errors.array();
    throw error;
  }

  const body = matchedData(req);

  try {
    const fetchedUser = await User.findById(userId);

    if (!fetchedUser) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    fetchedUser.set({
      ...body,
      password: hashedPassword,
    });

    const savedUser = await fetchedUser.save();

    if (!savedUser) {
      const error = new Error("Failed to edit user");
      error.status = 406;
      throw error;
    }

    res.status(200).json({
      message: "Update successful",
    });
  } catch (err) {
    next(err);
  }
};
