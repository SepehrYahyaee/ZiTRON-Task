import connection from "../db.js";

export const planService = {
    db: connection,

    async createPlan(planData) {
        return await this.db.plan.create({
            data: planData,
        });
    },

    async getAllPlans() {
        return await this.db.plan.findMany({});
    },

    async getSpecificPlan(id) {
        return await this.db.plan.findUnique({
            where: {
                id: +id,
            }
        })
    },

    async getResults(id) {
        return await this.db.plan.findUnique({
            where: {
                id,
            },
            include: {
                votes: {
                    select: {
                        user: {
                            select: {
                                userName: true
                            }
                        }
                    }
                },
            }
        });
    }
}