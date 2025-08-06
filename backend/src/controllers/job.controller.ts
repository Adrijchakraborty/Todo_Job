import type { NextFunction, Request, Response } from "express";
import { Job, type JobDocument } from "../models/job.model.ts";
import { AppError } from "../utils/AppError.ts";

export const addNew = async (req: Request<{}, {}, JobDocument>, res: Response<JobDocument>, next: NextFunction) => {
    try {
        const { title, company, description, dueDate, link } = req.body;

        if (!title || !company || !dueDate || !link) {
            return next(new AppError("Please provide all required fields", 400));
        }

        const newJob = await Job.create({
            title,
            company,
            description,
            dueDate,
            link,
            userId: req.session.userId
        });

        res.status(201).json(newJob);
    } catch (error) {
        next(error);
    }
}

export const getAll = async (req: Request<{}, {}, JobDocument>, res: Response<JobDocument[]>, next: NextFunction) => {
    const user = req.session.userId;

    try {
        const jobList = await Job.find({ userId: user });
        res.status(200).json(jobList);
    } catch (error) {
        next(error);
    }
}

export const getOne = async (req: Request<{}, {}, JobDocument>, res: Response<JobDocument>, next: NextFunction) => {
    const { id } = req.params as {id: string};

    try {
        const job = await Job.findById(id);
        if (!job) return next(new AppError("No result", 404));
        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
}