import express from "express";
import { userController, planController } from "../controllers/index.js";
import { authentication, isAdmin, validationErrorHandler, createPlanValidators, voteValidators, seeResultsValidators } from "../middlewares/index.js";
import { asyncErrorHandler } from "../utilities/index.js";

export const router = express.Router(); // api/plan

router.route("/new")
    .post(authentication, isAdmin, createPlanValidators, validationErrorHandler, asyncErrorHandler(planController.createPlan));

router.route("/")
    .get(asyncErrorHandler(planController.getAllPlans));

router.route("/:id")
    .get(asyncErrorHandler(planController.getSpecificPlan))
    .post(authentication, voteValidators, validationErrorHandler, asyncErrorHandler(userController.vote));

router.route("/:id/results")
    .get(authentication, isAdmin, seeResultsValidators, validationErrorHandler, asyncErrorHandler(userController.seeResults));