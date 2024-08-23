import express from "express";
import { userController } from "../controllers/index.js";
import { authentication } from "../middlewares/index.js";
import { asyncErrorHandler } from "../utilities/index.js";

export const router = express.Router(); // api/user

router.route("/login")
    .post(asyncErrorHandler(userController.login));

// router.route("/")