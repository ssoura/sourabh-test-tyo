import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { deleteContact } from "../../store/thunks/contactsThunks";
import { AppDispatch } from "../../store";

const Contact = ({ contact }: { contact: ContactType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { firstname, lastname, status, _id: id } = contact;

  return (
    <div className="flex flex-col bg-slate-100 rounded p-2 shadow-sm shadow-slate-200 items-center">
      <div>
        <h1>
          <span className="font-semibold">First Name: </span>
          {`${firstname}`}
        </h1>
        <h1>
          <span className="font-semibold">Last Name: </span>
          {`${lastname}`}
        </h1>
        <p>
          <span className="font-semibold">Status: </span> {status}
        </p>
      </div>
      <div className="flex gap-2 ">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 uppercase font-bold text-xs rounded-md block mt-3"
          type="button"
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit
        </button>
        <button
          className="bg-orange-600 hover:bg-orange-700 text-white p-2 uppercase font-bold text-xs rounded-md block mt-3"
          type="button"
          onClick={() => dispatch(deleteContact(id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
