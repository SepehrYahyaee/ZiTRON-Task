import { planService } from "../services/index.js";
import { AppError, logger } from "../utilities/index.js";

export const planController = {

    async createPlan(req, res) {
        if (new Date(req.body.deadline).getTime() < Date.now()) throw new AppError("You cannot create a plan which it's deadline has already passed!", 400);

        const planData = {
            text: req.body.text,
            deadline: req.body.deadline,
            authorId: +req.user.id
        }
        
        res.status(201).send(await planService.createPlan(planData));
        return logger.info(`new Plan created by "${req.user.userName}"`);
    },

    async getAllPlans(req, res) {
        res.status(200).send(await planService.getAllPlans());
    },

    async getSpecificPlan(req, res, next) {
        const { id } = req.params;
        const plan = await planService.getSpecificPlan(+id);
        if (plan) {
            res.status(200).send(plan);
        } else {
            throw new AppError("Not Found", 404);
        }
    }
}