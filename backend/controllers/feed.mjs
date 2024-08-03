import { validationResult } from "express-validator";

import Car from "../models/Car.mjs";
import User from "../models/User.mjs";

export const getAllCars = async (req, res, next) => {
  const limitValue = req.query.limit || 2;
  const skipValue = req.query.skip || 0;
  try {
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

export const addNewCar = async (req, res, next) => {
  const {
    body: {
      vehicleMake,
      vehicleModel,
      registrationNumber,
      imageUrl,
      moreInfo,
      fuel,
      price,
      expiration,
    },
  } = req;

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
    initialPrice: price,
  });
  try {
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

export const getCarById = async (req, res, next) => {
  const {
    params: { carId },
  } = req;
  try {
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

export const editCar = async (req, res, next) => {
  const {
    body: {
      vehicleMake,
      vehicleModel,
      registrationNumber,
      imageUrl,
      moreInfo,
      fuel,
      price,
    },
    params: { carId },
  } = req;
  try {
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

export const deleteCarById = async (req, res, next) => {
  const {
    params: { carId },
  } = req;
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

export const rentCar = async (req, res, next) => {
  const {
    body: { userId, payload },
    params: { carId },
  } = req;

  try {
    const fetchedCar = await Car.findById(carId);
    const user = await User.findById(userId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
      throw error;
    }

    if (payload === true) {
      fetchedCar.rentedBy = null;
      fetchedCar.rentedAt = null;
      user.rentedCars = user.rentedCars.filter(
        (car) => car.toString() !== carId
      );
    } else if (payload === false) {
      fetchedCar.rentedBy = userId;
      fetchedCar.rentedAt = new Date();
      if (!user.rentedCars.includes(carId)) {
        user.rentedCars.push(carId);
      }
    }

    fetchedCar.available = payload;

    const result = await fetchedCar.save();

    if (!result) {
      const error = new Error("Failed to update the car");
      error.status = 406;
      throw error;
    }

    user.save();

    res.status(200).json({
      message: "Car status updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getRentedCars = async (req, res, next) => {
  const {
    query: { idCardNumber },
  } = req;
  
  try {
    const user = await User.findOne({ id_card_number: idCardNumber }).exec();

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const fetchedCars = await Car.find({
      _id: { $in: user.rentedCars },
    })
      .populate("rentedBy")
      .exec();

    if (!fetchedCars || fetchedCars.length === 0) {
      const error = new Error("Could not fetch data");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      data: fetchedCars,
      total: fetchedCars.length,
      message: "Success",
    });
  } catch (err) {
    next(err);
  }
};
