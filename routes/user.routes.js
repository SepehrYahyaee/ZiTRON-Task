import express from "express";
import { userController } from "../controllers/index.js";
import { asyncErrorHandler } from "../utilities/index.js";
import { loginValidators, validationErrorHandler } from "../middlewares/index.js";

export const router = express.Router(); // api/user

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.route("/login")
    .post(loginValidators, validationErrorHandler, asyncErrorHandler(userController.login));