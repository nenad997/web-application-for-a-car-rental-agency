import * as validator from "express-validator";

import {
  getAllCars,
  addNewCar,
  getCarById,
  editCar,
} from "../controllers/feed.mjs";
import Car from "../models/Car.mjs";

jest.mock("../models/Car.mjs");

jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => true),
    array: jest.fn(() => []),
  })),
  matchedData: jest.fn(() => ({
    vehicleMake: "Toyota",
    vehicleModel: "Corolla",
    registrationNumber: "AB-123-CD",
    imageUrl: "http://example.com/car.jpg",
    moreInfo: "Some info",
    fuel: "Gasoline",
    price: "10000",
    regExpiration: new Date("2025-12-31"),
  })),
}));

describe("getAllCars controller", () => {
  const mockReq = {
    query: {
      limit: 2,
      skip: 0,
    },
  };

  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };

  const mockNext = jest.fn();
  it("should fetch all cars from database", async () => {
    try {
      await getAllCars(mockReq, mockRes, mockNext);
      expect(Car.find).toHaveBeenCalled();
    } catch (error) {
      expect(mockRes.status).toBe(404);
    }
  });

  it("should next an error if failed to fetch cars", async () => {
    jest.spyOn(Car, "find").mockImplementationOnce(() => {
      throw new Error("Failed to fetch cars");
    });

    await getAllCars(mockReq, mockReq, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error("Failed to fetch cars"));

    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });
});

describe("addNewCar controller", () => {
  const mockReq = {
    query: {
      limit: 2,
      skip: 0,
    },
  };

  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };

  const mockNext = jest.fn();

  it("should throw an error if validation failed", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => false),
      array: jest.fn(() => [{ msg: "Validation Error" }]),
    }));

    try {
      await addNewCar(mockReq, mockRes, mockNext);
      expect(validator.validationResult).toHaveBeenCalledWith(mockReq);
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.data).toEqual([{ msg: "Validation Error" }]);
    }

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should add a new car to database and save it", async () => {
    const saveMethod = jest.spyOn(Car.prototype, "save").mockResolvedValueOnce({
      _id: "123456",
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      registrationNumber: "AB-123-CD",
      imageUrl: "http://example.com/car.jpg",
      moreInfo: "Some info",
      fuel: "Gasoline",
      price: "10000",
      regExpiration: new Date("2025-12-31"),
    });

    await addNewCar(mockReq, mockRes, mockNext);
    expect(validator.matchedData).toHaveBeenCalledWith(mockReq);
    expect(Car).toHaveBeenCalledWith({
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      registrationNumber: "AB-123-CD",
      imageUrl: "http://example.com/car.jpg",
      moreInfo: "Some info",
      fuel: "Gasoline",
      price: "10000",
      regExpiration: new Date("2025-12-31"),
    });
    expect(saveMethod).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.json).toHaveBeenCalled();
  });
});

describe("getCarById controllers", () => {
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };

  const mockNext = jest.fn();

  it("should fetch a car by selected carId from database", async () => {
    const mockReq = {
      params: {
        carId: "test__id",
      },
    };

    jest.spyOn(Car, "findById").mockImplementationOnce(() => {
      return {
        id: "test__id",
        vehicleMake: "Toyota",
        vehicleModel: "Corolla",
        registrationNumber: "AB-123-CD",
        imageUrl: "http://example.com/car.jpg",
        moreInfo: "Some info",
        fuel: "Gasoline",
        price: "10000",
        regExpiration: new Date("2025-12-31"),
      };
    });

    try {
      await getCarById(mockReq, mockRes, mockNext);
      expect(Car.findById).toHaveBeenCalledWith("test__id");
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  it("should return null if car with selected id does not exist", async () => {
    const mockReq = {
      params: {
        carId: "wrong__id",
      },
    };

    jest.spyOn(Car, "findById").mockImplementationOnce(() => null);

    await getCarById(mockReq, mockRes, mockNext);

    expect(Car.findById).toHaveBeenCalledWith("wrong__id");
    expect(Car.findById).toHaveReturnedWith(null);
  });
});

describe("editCar controller", () => {
  const mockReq = {
    params: {
      carId: "test__id",
    },
  };

  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };

  const mockNext = jest.fn();

  it("should call validator methods with request param", async () => {
    await editCar(mockReq, mockRes, mockNext);

    expect(validator.validationResult).toHaveBeenCalledWith(mockReq);
    expect(validator.matchedData).toHaveBeenCalledWith(mockReq);
  });

  it("should fetch a car by id from database", async () => {
    jest.spyOn(Car, "findById").mockImplementationOnce(() => {
      return {
        id: "test__id",
        vehicleMake: "Toyota",
        vehicleModel: "Corolla",
        registrationNumber: "AB-123-CD",
        imageUrl: "http://example.com/car.jpg",
        moreInfo: "Some info",
        fuel: "Gasoline",
        price: "10000",
        regExpiration: new Date("2025-12-31"),
      };
    });

    await getCarById(mockReq, mockRes, mockNext);

    expect(Car.findById).toHaveBeenCalledTimes(1);
    expect(Car.findById).toHaveBeenCalledWith("test__id");
  });

  it("should update a car in database using SET method", async () => {});
});
