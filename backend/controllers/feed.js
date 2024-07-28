const { validationResult } = require("express-validator");

const Car = require("../models/Car");

exports.getAllCars = async (req, res, next) => {
  try {
    const limitValue = req.query.limit || 2;
    const skipValue = req.query.skip || 0;

    const fetchedCars = await Car.find()
      .limit(limitValue)
      .skip(skipValue)
      .sort({ createdAt: -1 });
    const totalfetchedCars = await Car.find().countDocuments();

    if (!fetchedCars || fetchedCars.length === 0) {
      const error = new Error("Could not fetch cars");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      data: fetchedCars,
      total: totalfetchedCars,
      message: "Success",
    });
  } catch (err) {
    next(err);
  }
};

exports.addNewCar = async (req, res, next) => {
  try {
    const {
      vehicleMake,
      vehicleModel,
      registrationNumber,
      imageUrl,
      moreInfo,
      fuel,
      price,
      expiration,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.status = 403;
      error.data = errors.array();
      throw error;
    }

    const newCar = new Car({
      vehicleModel,
      vehicleMake,
      registrationNumber,
      imageUrl,
      moreInfo,
      fuel,
      price,
      regExpiration: expiration,
    });

    const result = await newCar.save();

    if (!result) {
      const error = new Error("Failed to add new car");
      error.status = 400;
      throw error;
    }

    res.status(204).json({
      message: "Added new car successfully",
      data: {
        id: result._id.toString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getCarById = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const fetchedCar = await Car.findById(carId).populate("rentedBy").exec();

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

exports.editCar = async (req, res, next) => {
  try {
    const { carId } = req.params;
    const {
      vehicleMake,
      vehicleModel,
      registrationNumber,
      imageUrl,
      moreInfo,
      fuel,
      price,
    } = req.body;

    const fetchedCar = await Car.findById(carId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
      throw error;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.status = 403;
      error.data = errors.array();
      throw error;
    }

    fetchedCar.vehicleMake = vehicleMake;
    fetchedCar.vehicleModel = vehicleModel;
    fetchedCar.registrationNumber = registrationNumber;
    fetchedCar.imageUrl = imageUrl;
    fetchedCar.moreInfo = moreInfo;
    fetchedCar.fuel = fuel;
    fetchedCar.price = price;

    const result = await fetchedCar.save();

    if (!result) {
      const error = new Error("Failed to update the car");
      error.status = 406;
      throw error;
    }

    res.status(200).json({
      message: "Update successful",
      data: {
        id: result._id.toString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCarById = async (req, res, next) => {
  const { carId } = req.params;
  try {
    const fetchedCar = await Car.findById(carId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
      throw error;
    }

    const deletionResult = await Car.findByIdAndDelete(carId);

    if (!deletionResult) {
      const error = new Error("Failed to delete the car");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    next(err);
  }
};

exports.rentCar = async (req, res, next) => {
  try {
    const { carId } = req.params;
    const { userId, payload } = req.body;

    const fetchedCar = await Car.findById(carId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
      throw error;
    }

    if (payload === true) {
      fetchedCar.rentedBy = null;
    } else if (payload === false) {
      fetchedCar.rentedBy = userId;
    }

    fetchedCar.available = payload;

    const result = await fetchedCar.save();

    if (!result) {
      const error = new Error("Failed to update the car");
      error.status = 406;
      throw error;
    }

    res.status(200).json({
      message: "Car status updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
