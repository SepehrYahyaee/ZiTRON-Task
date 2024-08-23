import jwt from "jsonwebtoken";
import { userService } from "../services/index.js";
import { AppError } from "../utilities/index.js";

export async function authentication(req, res, next) {
    try {
        if (!req.headers.authorization) throw new AppError("Token is required in headers!", 401);
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        if (payload){
            req.user = await userService.getUserById(payload.id);
            next();
        } else {
            throw new AppError("Token is required in headers!", 401);
        }
    } catch (error) {
        next(error);
    }
}