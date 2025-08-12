import React from "react";

interface WarnProps {
  showWarn: boolean;
  close: () => void;
  onConfirm: () => void;
}

const Warning: React.FC<WarnProps> = ({ showWarn, close, onConfirm }) => {
  if (!showWarn) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            No
          </button>
          <button
            onClick={() => {
              onConfirm();
              close();
            }}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
