import connection from "../db.js";

export const userService = {
    db: connection,

    // Not yet needed, since we have seeds.js and autofill for data!
    async createUser() {},

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

    async updateUser() {},

    async deleteUser() {},
}