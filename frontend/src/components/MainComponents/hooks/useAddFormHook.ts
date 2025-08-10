import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
    handleClose: () => void;
}

type FormData = {
    title: string;
    company: string;
    description: string;
    dueDate: string;
    link: string;
    status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
};



export const useAddFormHook = ({handleClose}: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        title: '',
        company: '',
        description: '',
        dueDate: '',
        link: '',
        status: 'To Do',
    });

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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.post('/api/job/', formData)
                .then(() => {
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

    };

    return {loading, formData,handleChange, handleSubmit}
}