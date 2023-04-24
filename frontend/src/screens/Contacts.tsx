import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchContacts } from "../store/thunks/contactsThunks";
import { AppDispatch, RootState } from "../store";

import Contact from "../components/contact/ContactCard";

const Contacts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  //  TODO : Add loading state to UI
  // const status = useSelector((state: RootState) => state.contacts.status);
  // const error = useSelector((state: RootState) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl text-red-400">Contacts</h1>
        <Link
          className={`text-white text-4xl w-28 text-center rounded p-1 m-1 bg-red-400 mt-2 hover:text-red-300`}
          to="/new"
        >
          New
        </Link>
      </div>
      <div className="grid mx-auto justify-center sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts &&
          contacts.map((contact: ContactType) => (
            <Contact key={contact._id} contact={contact} />
          ))}
      </div>
    </>
  );
};

export default Contacts;
