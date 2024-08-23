import connection from "../db.js";

export const userService = {
    db: connection,

    async getUser(userName) {
        return await this.db.user.findUnique({
            where: {
                userName,
            },
            select: {
                id: true,
                userName: true,
                password: true,
                role: true,
            }
        })
    },

    async getUserById(id) {
        return await this.db.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                userName: true,
                password: false,
                role: true,
            }
        })
    },
}