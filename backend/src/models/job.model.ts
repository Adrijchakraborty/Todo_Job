import mongoose, { Document, Schema } from 'mongoose';

export interface JobDocument extends Document {
  title: string;
  company: string;
  description?: string;
  dueDate?: Date;
  link?: string;
  remarks?: string;
  status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema: Schema<JobDocument> = new Schema<JobDocument>(
  {
    title: { type: String, required: true },
    company: {type: String, required: true},
    description: { type: String },
    dueDate: { type: Date },
    link: { type: String },
    remarks: { type: String },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed', 'Blocked'],
      default: 'To Do',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model<JobDocument>('Job', jobSchema);
