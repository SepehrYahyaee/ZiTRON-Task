import express from "express";
import { userController } from "../controllers/index.js";
import { authentication } from "../middlewares/index.js";

export const router = express.Router(); // api/user

router.route("/login")
    .post(userController.login);

router.route("/results")
    .get()