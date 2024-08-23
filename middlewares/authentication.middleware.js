import jwt from "jsonwebtoken";
import { userService } from "../services/index.js";

export async function authentication(req, res, next) {
    try {
        if (!req.headers.authorization) res.status(401).send("Authentication token needed!");
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        if (payload){
            req.user = await userService.getUserById(payload.id);
            next();
        } else {
            throw new Error("token needed");
        }
    } catch (error) {
        next(error);
    }
}