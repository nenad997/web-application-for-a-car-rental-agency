import { Router } from "express";

import {
  createUser,
  login,
  getUserDataById,
  editUser,
  deleteUser,
} from "../controllers/auth.mjs";
import {
  signupValidationChain,
  loginValidationChain,
} from "../validation/auth-chains.mjs";

const router = Router();

router.post("/signup", signupValidationChain, createUser);

router.post("/login", loginValidationChain, login);

router.get("/user/:userId", getUserDataById);

router.put("/user/:userId", signupValidationChain, editUser);

router.delete("/user/:userId", deleteUser);

export default router;
