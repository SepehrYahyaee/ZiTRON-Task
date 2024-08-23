import { userService } from "../services/index.js";

export async function loginChecker(userName, password) {
    const user = await userService.getUser(userName);
    if (!user) return false;
    if (user.password === password) return { id: user.id };
    return false;
}