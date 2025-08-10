import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAddFormHook } from '../hooks/useAddFormHook';

interface ItemProps {
    show: boolean;
    handleClose: () => void;
}


const AddItemForm: React.FC<ItemProps> = ({ show, handleClose }) => {
    const form_style =
        'mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400';

    const {loading, formData,handleChange, handleSubmit} = useAddFormHook({handleClose})

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={18} />
                        </button>

                        {/* Form */}
                        <h2 className="text-2xl font-semibold mb-4">Add a Job</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Title & Company */}
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={form_style}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className={form_style}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={form_style}
                                ></textarea>
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-medium">Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className={form_style}
                                />
                            </div>

                            {/* Link */}
                            <div>
                                <label className="block text-sm font-medium">Apply Link</label>
                                <input
                                    type="url"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    className={form_style}
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={form_style}
                                    required
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <button
                                disabled={loading}
                                    type="submit"
                                    className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${loading && 'cursor-not-allowed'}`}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddItemForm;
