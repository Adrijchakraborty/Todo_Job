import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import { Job, type JobDocument } from "../models/job.model.js";
import { AppError } from "../utils/AppError.js";

dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const addNew = async (req: Request<{}, {}, JobDocument>, res: Response<JobDocument>, next: NextFunction) => {
    try {
        const { title, company, description, dueDate, link, status } = req.body;

        if (!title || !company || !dueDate || !link) {
            return next(new AppError("Please provide all required fields", 400));
        }

        const newJob = await Job.create({
            title,
            company,
            description,
            dueDate,
            link,
            status,
            userId: req.session.userId
        });
        res.status(201).json(newJob);
    } catch (error) {
        next(error);
    }
}

export const extractJobWithAI = async (
  req: Request<{}, {}, { aiContent?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { aiContent } = req.body;

    if (!aiContent) {
      return next(new AppError("Please provide job description text", 400));
    }

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are an assistant that extracts structured job details.
Return ONLY valid JSON with fields:
{ "title": string, "company": string, "description": string, "dueDate"?: string (YYYY-MM-DD) | empty, "link": string }`
        },
        {
          role: "user",
          content: `Extract job details from the following content:\n\n${aiContent}`
        }
      ],
      temperature: 0
    });

    const output = chatCompletion.choices[0]?.message?.content || "{}";
    const aiData = JSON.parse(output);

    res.json(aiData);
  } catch (error) {
    console.error(error);
    next(new AppError("Please provide valid details", 400));
  }
};


export const editOne = async (
  req: Request<{ id: string }, {}, JobDocument>,
  res: Response<JobDocument>,
  next: NextFunction
) => {
  try {
    const { title, company, description, dueDate, link, status } = req.body;
    const { id } = req.params;

    const editedJob = await Job.findByIdAndUpdate(
      id,
      { title, company, description, dueDate, link, status },
      { new: true, runValidators: true }
    );

    if (!editedJob) {
      return next(new AppError("No job found", 404));
    }

    res.status(200).json(editedJob);
  } catch (error) {
    next(error);
  }
};


export const getAll = async (req: Request<{}, {}, JobDocument>, res: Response<JobDocument[]>, next: NextFunction) => {
    const user = req.session.userId;

    try {
        const jobList = await Job.find({ userId: user });
        res.status(200).json(jobList);
    } catch (error) {
        next(error);
    }
}

export const deleteOne = async (req: Request<{id : string}>, res: Response<JobDocument>, next: NextFunction) => {
    const { id } = req.params;

    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) return next(new AppError("No result", 404));
        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
}

export const getOne = async (req: Request<{id: string}>, res: Response<JobDocument>, next: NextFunction) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);
        if (!job) return next(new AppError("No result", 404));
        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
}