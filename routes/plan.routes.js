import express from "express";
import { userController, planController } from "../controllers/index.js";
import { authentication, isAdmin, validationErrorHandler, createPlanValidators, voteValidators, seeResultsValidators } from "../middlewares/index.js";
import { asyncErrorHandler } from "../utilities/index.js";

export const router = express.Router(); // api/plan

/**
 * @swagger
 * /plans/new:
 *   post:
 *     summary: Create a new plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Plan created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
router.route("/new")
    .post(authentication, isAdmin, createPlanValidators, validationErrorHandler, asyncErrorHandler(planController.createPlan));

    /**
 * @swagger
 * /plans:
 *   get:
 *     summary: Get all plans
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: List of all plans
 *       500:
 *         description: Internal server error
 */
router.route("/")
    .get(asyncErrorHandler(planController.getAllPlans));

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Get a specific plan
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the plan
 *       404:
 *         description: Plan not found
 */
router.route("/:id")
    .get(asyncErrorHandler(planController.getSpecificPlan));

/**
 * @swagger
 * /plans/{id}:
 *   post:
 *     summary: Vote for a plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vote:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vote recorded successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route("/:id")
    .post(authentication, voteValidators, validationErrorHandler, asyncErrorHandler(userController.vote));

/**
 * @swagger
 * /plans/{id}/results:
 *   get:
 *     summary: Get results for a specific plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Results of the plan
 *       404:
 *         description: Plan not found
 *       401:
 *         description: Unauthorized
 */
router.route("/:id/results")
    .get(authentication, isAdmin, seeResultsValidators, validationErrorHandler, asyncErrorHandler(userController.seeResults));