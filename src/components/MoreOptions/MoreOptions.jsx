import { BsThreeDotsVertical } from 'react-icons/bs';

const MoreOptionsButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 bg-white hover:bg-white/80 text-indigo-500 rounded-md p-1.5 shadow-md backdrop-blur-sm"
    >
      <BsThreeDotsVertical size={16} />
    </button>
  );
};

export default MoreOptionsButton;
