import { AppError } from "../utilities/index.js";

export async function isAdmin(req, res, next) {
    try {
        if (req.user.role === "USER") {
            throw new AppError("Not an Admin!", 403);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}