import { Router } from "express";

import {
  createUser,
  login,
  getUserDataById,
  editUser,
  deleteUser,
} from "../controllers/auth.mjs";
import {
  signupOrEditValidationChain,
  loginValidationChain,
} from "../validation/auth-chains.mjs";

const router = Router();

router.post("/signup", signupOrEditValidationChain, createUser);

router.post("/login", loginValidationChain, login);

router.get("/user/:userId", getUserDataById);

router.put("/user/:userId", signupOrEditValidationChain, editUser);

router.delete("/user/:userId", deleteUser);

export default router;
