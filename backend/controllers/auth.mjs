import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.mjs";

export const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 409;
    error.data = errors.array();
    throw error;
  }

  const bodyData = matchedData(req);

  let fetchedUser;

  try {
    fetchedUser = await User.findOne({ email: bodyData.email });

    if (fetchedUser) {
      const error = new Error("User with this email address already exists!");
      error.status = 409;
      error.path = "email";
      throw error;
    }
  } catch (err) {
    return next(err);
  }

  try {
    fetchedUser = await User.findOne({
      id_card_number: bodyData.id_card_number,
    });

    if (fetchedUser) {
      const error = new Error("User with this id card number already exists!");
      error.status = 409;
      error.path = "card_id";
      throw error;
    }
  } catch (err) {
    return next(err);
  }

  try {
    fetchedUser = await User.findOne({
      username: bodyData.username,
    });

    if (fetchedUser) {
      const error = new Error("User with this user name already exists!");
      error.status = 409;
      error.path = "user_name";
      throw error;
    }
  } catch (err) {
    return next(err);
  }

  try {
    const hashedPassword = await bcrypt.hash(bodyData.password, 12);

    const newUser = new User({
      ...bodyData,
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
      id: savedUser._id.toString(),
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

  const bodyData = matchedData(req);

  try {
    const fetchedUser = await User.findOne({ email: bodyData.email });

    if (!fetchedUser) {
      const error = new Error(
        "User with this email does not exist, please check your credentials"
      );
      error.status = 404;
      throw error;
    }

    const doPasswordsMatch = await bcrypt.compare(
      bodyData.password,
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

export const getById = async (req, res, next) => {
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

export const edit = async (req, res, next) => {
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

  const bodyData = matchedData(req);

  try {
    const fetchedUser = await User.findById(userId);

    if (!fetchedUser) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(bodyData.password, 12);

    fetchedUser.set({
      ...bodyData,
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

export const deleteOne = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  let fetchedUser;

  try {
    fetchedUser = await User.findById(userId);

    if (!fetchedUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
  } catch (err) {
    return next(err);
  }

  try {
    const result = await User.findByIdAndDelete(fetchedUser._id.toString());

    if (!result) {
      const error = new Error("Failed to delete user");
      error.status = 204;
      throw error;
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
