import connection from "../db.js";

const users = [
    {
        id: 1,
        userName: "Hasan",
        password: "1234",
        role: "ADMIN",
    },
    {
        id: 2,
        userName: "Heshmat",
        password: "1234",
        role: "USER",
    },
    {
        id: 3,
        userName: "Gholam",
        password: "1234",
        role: "USER",
    },
];

async function main() {

    await connection.user.deleteMany({});
    await connection.plan.deleteMany({});
    await connection.vote.deleteMany({});

    for (const user of users) {
        await connection.user.create({
        data: user,
        });
    }
}

main();