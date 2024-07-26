const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.createUser = async (req, res, next) => {
  try {
    const { email, user_name, id_card_number, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.status = 409;
      error.data = errors.array();
      throw error;
    }

    const fetchedUser = await User.findOne({ email });

    if (fetchedUser) {
      const error = new Error(
        "User with this email address already exists, please pick another email address"
      );
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      username: user_name,
      id_card_number,
      password: hashedPassword,
    });

    const newUserResult = await newUser.save();

    if (!newUserResult) {
      const error = new Error("Failed to create new user");
      error.status = 400;
      throw error;
    }

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: newUserResult._id.toString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.status = 409;
      error.data = errors.array();
      throw error;
    }

    const fetchedUser = await User.findOne({ email });

    if (!fetchedUser) {
      const error = new Error(
        "User with this email does not exist, please check your credentials"
      );
      error.status = 404;
      throw error;
    }

    const doPasswordsMatch = await bcrypt.compare(
      password,
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

exports.getUserDataById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      const error = new Error("Invalid user ID format");
      error.status = 400;
      throw error;
    }

    const fetchedUser = await User.findById(userId);

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
