const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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
