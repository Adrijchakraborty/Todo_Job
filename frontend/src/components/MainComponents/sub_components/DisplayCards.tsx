import React from 'react';
import { type DisplayProps } from '../hooks/useFetchJobs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

interface CardProps {
  jobData: DisplayProps[] | null;
  status: DisplayProps['status'];
  bgColor: string;
  onEdit?: (job: DisplayProps) => void;
  onDelete?: (jobId: string) => void;
}

const DisplayCards: React.FC<CardProps> = ({
  jobData,
  status,
  bgColor
}) => {

  const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/job/${id}`);
            toast.success("Deleted Successfully!!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete job");
        }
    }
  return jobData
    ?.filter((job) => job.status === status)
    .map((job, index) => (
      <div
        key={index}
        className={`rounded-lg shadow-md p-4 mb-4 w-11/12 mx-auto flex flex-col justify-between ${bgColor}`}
      >
        {/* Job Info */}
        <div>
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p className="text-sm text-[var(--p-text)]">{job.company}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex justify-end gap-3">
          <button
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
          >
            <FaEdit size={14} /> Edit
          </button>
          <button
            onClick={() => handleDelete(job._id)}
            className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
          >
            <FaTrash size={14} /> Delete
          </button>
        </div>
      </div>
    ));
};

export default DisplayCards;
