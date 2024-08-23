import { planService } from "../services/index.js";

export const planController = {

    async createPlan(req, res) {
        const planData = {
            text: req.body.text,
            deadline: req.body.deadline,
            authorId: +req.user.id
        }

        const plan = await planService.createPlan(planData);

        res.status(201).send(plan);
    },

    async getPlans(req, res) {
        res.status(200).send(await planService.getAllPlans());
    },

    async getSpecificPlan(req, res) {
        res.status(200).send(await planController.getSpecificPlan(+req.params.id));
    }
}