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

    async getSpecificVote(byUser, onPlan) {
        return await this.db.vote.findUnique({
            where: {
                byUser_onPlan: {
                    byUser,
                    onPlan,
                }
            }
        })
    },

}