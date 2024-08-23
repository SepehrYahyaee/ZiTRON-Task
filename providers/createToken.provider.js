import { AppError } from "../utilities/index.js";
import jwt from "jsonwebtoken";

export async function createToken(payload, secretKey, expireTime) {
    try {
        const accessToken = jwt.sign(payload, secretKey, { expiresIn: expireTime });
        return { accessToken };
    } catch (error) {
        throw new AppError("Failed to create the access token!", 500);
    }
}