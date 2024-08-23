import { loginChecker, createToken } from "../providers/index.js";
import { voteService, planService } from "../services/index.js";

export const userController = {

    // Since we have seeds.js which autofills the database, register endpoint is not yet implemented.
    async register() {},

    async login(req, res) {
        const status = await loginChecker(req.body.userName, req.body.password);
        if (status) {
            // Create JWT Token
            res.status(200).send(await createToken({ id: status.id }, process.env.SECRET_KEY, process.env.TOKEN_EXPIRE_TIME));
        } else {
            res.status(401).send("Username or Password is wrong!");
        }
    },

    async vote(req, res) {
        const plan = await planService.getSpecificPlan(req.body.onPlan);

        // TODO: If deadline is arrived, no more voting is allowed!
        const vote = await voteService.createVote(req.user.id, req.body.onPlan);

        if (plan.authorId === req.user.id) res.send("You can not vote on your own plan!");
        res.status(201).send(vote);
    },

    async seeResults(req, res) {
        const { planId } = req.body;
        const plan = await planService.getSpecificPlan(planId);
        res.status(200).send(plan);
    }
}