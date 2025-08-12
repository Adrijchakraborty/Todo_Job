import axios from "axios";
import toast from "react-hot-toast";
import { useJobStore } from "../../../zustand/jobStore";

export const useHandleDelete = () => {
    const deleteJob = useJobStore((state) => state.deleteJob);
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/job/${id}`);
            deleteJob(id);
            toast.success("Deleted Successfully!!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete job");
        }
    }

    return { handleDelete }
}