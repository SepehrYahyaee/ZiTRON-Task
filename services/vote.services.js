import connection from "../db.js";

export const voteService = {
    db: connection,

    async createVote(byUser, onPlan) {
        return await this.db.vote.create({
            data: {
                byUser, onPlan,
            }
        })
    },

    getVote() {},

    updateVote() {},

    deleteVote() {},
}