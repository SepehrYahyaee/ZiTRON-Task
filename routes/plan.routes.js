import express from "express";
import { userController, planController } from "../controllers/index.js";
import { authentication, isAdmin } from "../middlewares/index.js";

export const router = express.Router(); // api/plan

router.route("/")
    .get(planController.getPlans);

router.route("/:id")
    .get(planController.getSpecificPlan)
    .post(authentication, userController.vote);

router.route("/new")
    .post(authentication, isAdmin, planController.createPlan);
