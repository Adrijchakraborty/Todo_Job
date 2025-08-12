import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useJobStore } from "../../../zustand/jobStore";

export interface DisplayProps {
    _id: string;
    title: string;
    company: string;
    description: string;
    dueDate: Date;
    link: string;
    remarks?: string;
    status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
}

export const useFetchJobs = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const setJobData = useJobStore((state) => state.setJobData);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/job");
            setJobData(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchJobs();
    }, []);


    return { loading }
}