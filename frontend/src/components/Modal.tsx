import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, body }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-scroll outline-none focus:outline-none bg-slate-200 bg-opacity-70">
        <div className="relative w-full h-auto mx-auto my-6 lg:w-5/6 lg:max-w-7xl lg:h-screen lg:max-h-[95%]">
          {/*content*/}
          <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none lg:h-auto focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between pt-5 pl-5 pr-5 rounded-t ">
              <h3 className="text-3xl font-semibold text-red-400">{title}</h3>
              <button
                className="p-1 ml-auto text-red-400 transition border-0 hover:opacity-70"
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-5">{body}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
