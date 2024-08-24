import { body, param, validationResult, checkExact } from "express-validator";
import { AppError } from "../utilities/index.js";

export function validationErrorHandler(req, res, next) {
    try {
        const isValid = validationResult(req);
        if (!isValid.isEmpty()){
            const message = isValid.errors[0].msg;
            throw new AppError(message, 400);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

export const loginValidators = [
    body("userName").isString().trim().escape().notEmpty().withMessage("username validation Error!"),
    body("password").isString().trim().escape().notEmpty().withMessage("password validation Error!"),
    checkExact()
];

export const createPlanValidators = [
    body("text").isString().trim().escape().notEmpty().isLength({ min: 4, max: 255 }).withMessage("plan's text validation error!"),
    body("deadline").isISO8601().toDate().trim().escape().notEmpty().withMessage("plan's deadline validation error!"),
    checkExact()
];

export const voteValidators = [
    param("id").isNumeric().trim().escape().withMessage("path's parameters id validation error!"),
    checkExact()
];

export const seeResultsValidators = [
    param("id").isNumeric().trim().escape().withMessage("path's parameters id validation error!"),
    checkExact()
];