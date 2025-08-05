import type { NextFunction, Request, Response } from "express";
import type { userType } from "../types/user.ts";
import { User } from "../models/user.model.ts";
import { AppError } from "../utils/AppError.ts";

export const register = async(req: Request<{},{},userType>,res: Response<userType>,next: NextFunction)=>{
    const {username, password} = req.body;

    let user = await User.findOne({username});

    if(user) {
        return next(new AppError("User already exists", 403));
    }

    user = await User.create({username, password});

    res.status(201).json(user);

}

export const login = async(req: Request<{},{},userType>,res: Response<userType>,next: NextFunction)=>{
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(!user) {
        return next(new AppError("No user found", 404));
    }

    const checkPassword = password && await user.comparePassword(password);

    if(!checkPassword) {
        next(new AppError("Invalid Credentials", 401));
    }

    req.session.userId = user._id.toString();

    res.status(200).json(user);

}