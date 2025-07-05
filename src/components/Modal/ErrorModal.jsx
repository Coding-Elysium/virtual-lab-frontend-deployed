const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold primary-color mb-2">Error</h2>
        <p className="text-sm text-gray-700">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1 background-primary-color text-white rounded hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
