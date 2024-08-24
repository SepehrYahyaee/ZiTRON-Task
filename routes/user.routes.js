import express from "express";
import { userController } from "../controllers/index.js";
import { asyncErrorHandler } from "../utilities/index.js";
import { loginValidators, validationErrorHandler } from "../middlewares/index.js";

export const router = express.Router(); // api/user

router.route("/login")
    .post(loginValidators, validationErrorHandler, asyncErrorHandler(userController.login));