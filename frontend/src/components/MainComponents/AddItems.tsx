import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import AddItemForm from './sub_components/AddItemForm';

const AddItems: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div className="flex justify-center mt-6">
            {/* Plus Button */}
            <span
                onClick={handleClick}
                className="border cursor-pointer px-6 py-1 flex items-center justify-center rounded"
            >
                <FaPlus />
            </span>

            {/* Modal */}
            <AddItemForm show={show} handleClose={handleClose}/>
        </div>
    );
};

export default AddItems;
