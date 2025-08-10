import type { NextFunction, Request, Response } from "express";
import type { userType } from "../types/user.ts";
import { User, type UserDocument } from "../models/user.model.ts";
import { AppError } from "../utils/AppError.ts";

export const register = async (req: Request<{}, {}, UserDocument>, res: Response<userType>, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return next(new AppError("User already exists", 403));
        }

        user = await User.create({ username, password });

        req.session.userId = user._id.toString();

        const { password: pass, ...rest } = user.toObject();
        res.status(201).json(rest);
    } catch (error) {
        next(error);
    }

}

export const login = async (req: Request<{}, {}, UserDocument>, res: Response<userType>, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return next(new AppError("No user found", 404));
        }

        const checkPassword = password && await user.comparePassword(password);

        if (!checkPassword) {
            return next(new AppError("Invalid Credentials", 401));
        }

        req.session.userId = user._id.toString();

        const { password: pass, ...rest } = user.toObject();

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }

}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
        if (err) {
            return next(new AppError("Logout failed", 500));
        }
        res.clearCookie('user_id');
        res.json( 'Logged out successfully' );
    });
}

export const user = async(req: Request, res: Response<userType>, next: NextFunction) => {
    const userId = req.session.userId;
    const user = await User.findById(userId)

    if(!user) return next(new AppError("User not found",404));

    const {password,...rest} = user.toObject();
    res.status(200).json(rest)
}