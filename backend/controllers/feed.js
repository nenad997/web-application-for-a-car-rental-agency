const { validationResult } = require("express-validator");

const Car = require("../models/Car");

exports.getAllCars = async (req, res, next) => {
  const allCars = await Car.find();

  if (!allCars || allCars.length === 0) {
    return res.json({
      message: "Could not fetch cars",
      status: 404,
    });
  }

  res.json({
    cars: allCars,
    message: "Success",
    status: 204,
  });
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
      errors,
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
    return res.json({
      message: "Failed to add new car",
      status: 400,
    });
  }

  res.json({
    message: "Added new car successfully",
    status: 204,
    id: newCarResult._id.toString(),
  });
};
