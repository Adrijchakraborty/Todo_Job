import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import { type DisplayProps } from '../hooks/useFetchJobs';
import { useJobStore } from '../../../zustand/jobStore';
import { useHandleDelete } from '../hooks/useHandleDelete';

interface CardProps {
  status: DisplayProps['status'];
  bgColor: string;
}

const DisplayCards: React.FC<CardProps> = ({ status, bgColor }) => {
  const jobData = useJobStore((state) => state.jobData);
  const { handleDelete } = useHandleDelete();

  return (
    <AnimatePresence>
      {jobData
        ?.filter((job) => job.status === status)
        .map((job) => (
          <motion.div
            key={job._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={`rounded-lg shadow-md p-4 mb-4 w-11/12 mx-auto flex flex-col justify-between transition-transform ${bgColor}`}
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
          </motion.div>
        ))}
    </AnimatePresence>
  );
};

export default DisplayCards;
