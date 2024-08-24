import express from "express";
import { userController, planController } from "../controllers/index.js";
import { authentication, isAdmin } from "../middlewares/index.js";
import { asyncErrorHandler } from "../utilities/index.js";

export const router = express.Router(); // api/plan

router.route("/new")
    .post(authentication, isAdmin, asyncErrorHandler(planController.createPlan));

router.route("/")
    .get(asyncErrorHandler(planController.getAllPlans));

router.route("/:id")
    .get(asyncErrorHandler(planController.getSpecificPlan))
    .post(authentication, asyncErrorHandler(userController.vote));

router.route("/:id/results")
    .get(authentication, isAdmin, asyncErrorHandler(userController.seeResults));