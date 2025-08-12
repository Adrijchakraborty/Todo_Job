import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useJobStore } from "../../../zustand/jobStore";
import type { DisplayProps } from "./useFetchJobs";

interface FormData {
    _id?: string;
    title: string;
    company: string;
    description: string;
    dueDate: string;
    link: string;
    remarks?: string;
    status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
};

interface Props {
    handleClose: () => void;
    initialData?: Partial<DisplayProps>
}

export const useAddFormHook = ({ handleClose, initialData }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        title: initialData?.title || '',
        company: initialData?.company || '',
        description: initialData?.description || '',
        dueDate: initialData?.dueDate || '',
        link: initialData?.link || '',
        status: initialData?.status || 'To Do',
    });

    const addJob = useJobStore((state) => state.addJob);
    const deleteJob = useJobStore((state) => state.deleteJob);

    // Handle changes for all inputs
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const formSubmit = async () => {
        try {
            setLoading(true);
            await axios.post('/api/job/', formData)
                .then((res) => {
                    addJob(res.data)
                    toast.success("Job post Created!!");
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error)
        }
        finally {
            setFormData({
                title: '',
                company: '',
                description: '',
                dueDate: '',
                link: '',
                status: 'To Do',
            });
            handleClose();
            setLoading(false);
        }
    }

    const formEdit = async () => {
        try {
            setLoading(true);
            await axios.put(`/api/job/edit/${initialData?._id}`, formData)
                .then((res) => {
                    toast.success("Job Edited Successfully!!");
                    deleteJob(res.data?._id);
                    addJob(res.data);
                    setFormData({
                        title: res.data?.title || '',
                        company: res.data?.company || '',
                        description: res.data?.description || '',
                        dueDate: res.data?.dueDate || '',
                        link: res.data?.link || '',
                        status: res.data?.status || 'To Do',
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error)
        }
        finally {

            handleClose();
            setLoading(false);
        }
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        initialData ? formEdit() : formSubmit();
    };

    return { loading, formData, handleChange, handleSubmit }
}