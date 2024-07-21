const { validationResult } = require("express-validator");

const Car = require("../models/Car");

exports.getAllCars = async (req, res, next) => {
  try {
    const fetchedCars = await Car.find();

    if (!fetchedCars || fetchedCars.length === 0) {
      const error = new Error("Could not fetch cars");
      error.status = 400;
      throw error;
    }

    res.status(200).json({
      cars: allCars,
      message: "Success",
      status: 204,
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
    return res.json({
      message: "Validation failed",
      data: errors.array(),
      status: 403,
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

  res.json({
    message: "Added new car successfully",
    status: 204,
    id: newCarResult._id.toString(),
  });
};

exports.getCarById = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const fetchedCar = await Car.findById(carId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
    }

    res.status(200).json({
      message: "Success",
      car: fetchedCar,
    });
  } catch (err) {
    next(err);
  }
};
