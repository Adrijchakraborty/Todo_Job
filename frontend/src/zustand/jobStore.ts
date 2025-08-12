import { create } from 'zustand'

interface JobProps {
  _id: string;
  title: string;
  company: string;
  description: string;
  dueDate: Date;
  link: string;
  remarks?: string;
  status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
}

interface JobStore {
  jobData: JobProps[];
  setJobData: (jobs: JobProps[]) => void;
  addJob: (job: JobProps) => void;
  deleteJob: (id: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobData: [],
  setJobData: (jobs) => set({ jobData: jobs }),
  addJob: (job) =>
    set((state) => ({
      jobData: [...state.jobData, job],
    })),
  deleteJob: (id: string) =>
    set((state) => ({
      jobData: state.jobData.filter((job) => job._id !== id),
    })),
}));

