import { type NextFunction, type Request, type Response } from "express"
import { AppError } from "../utils/AppError.js";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
        return next(new AppError("Unaothorized", 401));
    }
    next();
}
