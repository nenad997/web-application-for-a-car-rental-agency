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
