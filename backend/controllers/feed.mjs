import { validationResult, matchedData } from "express-validator";

import Car from "../models/Car.mjs";
import User from "../models/User.mjs";
import { deleteFile } from "../util/files-management.mjs";

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 403;
    error.data = errors.array();
    throw error;
  }

  const {
    vehicleMake,
    vehicleModel,
    registrationNumber,
    fuel,
    price,
    regExpiration,
  } = matchedData(req);

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const newCar = new Car({
    vehicleMake,
    vehicleModel,
    registrationNumber,
    fuel,
    price,
    regExpiration,
    image: `/uploads/images/${req.file.filename}`,
  });

  try {
    const savedCar = await newCar.save();

    if (!savedCar) {
      const error = new Error("Failed to add new car");
      error.status = 400;
      throw error;
    }

    res.status(204).json({
      message: "Added new car successfully",
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
    params: { carId },
  } = req;
  const currentImage = req.body?.imagePreview;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 403;
    error.data = errors.array();
    throw error;
  }

  let imagePath;
  let fetchedCar;

  if (!req.file && !currentImage) {
    return res.status(400).json({ message: "Image is required" });
  }

  if (req.file) {
    imagePath = `/uploads/images/${req.file.filename}`;

    try {
      fetchedCar = await Car.findById(carId);

      await deleteFile(fetchedCar.image);
    } catch (err) {
      console.log(`Failed to delete image file: ${err.message}`);
      next(err);
    }
  }

  if (currentImage) {
    imagePath = currentImage;
  }

  const bodyData = matchedData(req);

  try {
    fetchedCar = await Car.findById(carId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
      throw error;
    }

    fetchedCar.set({
      ...bodyData,
      initialPrice: bodyData.price,
      image: imagePath,
    });

    const savedCar = await fetchedCar.save();

    if (!savedCar) {
      const error = new Error("Failed to update the car");
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

export const deleteCarById = async (req, res, next) => {
  const {
    params: { carId },
  } = req;

  let fetchedCar;

  try {
    fetchedCar = await Car.findById(carId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
      throw error;
    }
  } catch (err) {
    return next(err);
  }

  try {
    const deletionResult = await Car.findByIdAndDelete(
      fetchedCar._id.toString()
    );

    if (!deletionResult) {
      const error = new Error("Failed to delete the car");
      error.status = 404;
      throw error;
    }

    if (deletionResult.image) {
      try {
        await deleteFile(deletionResult.image);
      } catch (err) {
        console.log(`Failed to delete image file: ${err.message}`);
        next(err);
      }
    }

    res.status(200).json({
      message: "Car deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const rentCar = async (req, res, next) => {
  const {
    body: { cancelRent },
    params: { carId },
  } = req;

  try {
    const fetchedCar = await Car.findById(carId);
    const user = await User.findById(req.userId);

    if (!fetchedCar) {
      const error = new Error("Could not fetch a car");
      error.status = 404;
      throw error;
    }

    if (cancelRent) {
      if (fetchedCar.rentedBy.toString() === req.userId.toString()) {
        fetchedCar.rentedBy = null;
        fetchedCar.rentedAt = null;
        user.rentedCars = user.rentedCars.filter(
          (car) => car.toString() !== carId
        );
        fetchedCar.available = cancelRent;
      }
    } else {
      if (!fetchedCar.rentedBy && !fetchedCar.rentedAt) {
        fetchedCar.rentedBy = req.userId;
        fetchedCar.rentedAt = new Date();
        if (!user.rentedCars.includes(carId)) {
          user.rentedCars.push(carId);
        }
        fetchedCar.available = cancelRent;
      }
    }

    const savedCar = await fetchedCar.save();

    if (!savedCar) {
      const error = new Error("Failed to update the car");
      error.status = 406;
      throw error;
    }

    user
      .save()
      .then((savedUser) => {})
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });

    res.status(200).json({
      message: "Car status updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getRentedCars = async (req, res, next) => {
  const {
    query: { idCardNumber },
  } = req;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid idCardNumber field");
    error.status = 402;
    error.data = errors.array();

    throw error;
  }

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
