import { Router } from "express";

import {
  signup,
  login,
  getById,
  edit,
  deleteOne,
} from "../controllers/auth.mjs";
import {
  signupOrEditValidationChain,
  loginValidationChain,
} from "../validation/auth-chains.mjs";

const router = Router();

router.post("/signup", signupOrEditValidationChain, signup);

router.post("/login", loginValidationChain, login);

router.get("/:userId", getById);

router.put("/:userId", signupOrEditValidationChain, edit);

router.delete("/:userId", deleteOne);

export default router;
