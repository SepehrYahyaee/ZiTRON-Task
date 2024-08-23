import { voteService } from "../services/index.js";

export async function alreadyVoted(byUser, onPlan) {
    const vote = await voteService.getSpecificVote(byUser, onPlan);
    console.log(vote);
    if (vote.byUser) return true;
    return false;
}