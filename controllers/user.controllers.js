import { loginChecker, createToken } from "../providers/index.js";
import { voteService, planService } from "../services/index.js";
import { AppError } from "../utilities/index.js";

export const userController = {

    async login(req, res) {
        const status = await loginChecker(req.body.userName, req.body.password);
        if (status) {
            // Create JWT Token
            res.status(200).send(await createToken({ id: status.id }, process.env.SECRET_KEY, process.env.TOKEN_EXPIRE_TIME));
        } else {
            throw new AppError("Username or Password is Wrong!", 401);
        }
    },

    async vote(req, res) {
        const onPlan = +req.params.id;
        const plan = await planService.getSpecificPlan(onPlan);
        if (!plan) {
            throw new AppError("plan does not exist!", 404);
        }
        const v = await voteService.getSpecificVote(+req.user.id, onPlan);
        if (v.id) {
            throw new AppError("You already voted!", 400);
        }
        if (plan.deadline.getTime() > Date.now()) {
            if (plan.authorId === +req.user.id) {
                throw new AppError("You cannot vote for your own plan!", 400);
            }
            const vote = await voteService.createVote(+req.user.id, onPlan);
            res.status(201).send(vote);
        } else {
            throw new AppError("You cannot vote after the plan's expiry date!", 400);
        }
    }
}