const { validationResult } = require("express-validator");

const Car = require("../models/Car");

exports.getAllCars = async (req, res, next) => {
  try {
    const fetchedCars = await Car.find();

    if (!fetchedCars || fetchedCars.length === 0) {
      const error = new Error("Could not fetch cars");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      data: fetchedCars,
      message: "Success",
    });
  } catch (err) {
    next(err);
  }
};

exports.addNewCar = async (req, res, next) => {
  const {
    vehicleMake,
    vehicleModel,
    registrationNumber,
    imageUrl,
    moreInfo,
    fuel,
    price,
  } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(403).json({
      message: "Validation failed",
      data: errors.array(),
    });
  }

  const newCar = new Car({
    vehicleModel,
    vehicleMake,
    registrationNumber,
    imageUrl,
    moreInfo,
    fuel,
    price,
  });

  const newCarResult = await newCar.save();

  if (!newCarResult) {
    const error = new Error("Failed to add new car");
    error.status = 400;
    throw error;
  }

  res.status(204).json({
    message: "Added new car successfully",
    data: {
      id: newCarResult._id.toString(),
    },
  });
};

exports.getCarById = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const fetchedCar = await Car.findById(carId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Success",
      data: fetchedCar,
    });
  } catch (err) {
    next(err);
  }
};
