import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchContacts } from "../store/thunks/contactsThunks";
import { AppDispatch, RootState } from "../store";

import Contact from "../components/contact/ContactCard";
import { BarLoader } from "react-spinners";

const Contacts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  //  TODO : Add loading state to UI
  const status = useSelector((state: RootState) => state.contacts.status);
  // const error = useSelector((state: RootState) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex mx-auto justify-center">
        <BarLoader color="#ff0000" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex mx-auto justify-center">
        <h1> Error in loading data </h1>
      </div>
    );
  }

  if (status === "succeeded") {
    return (
      <>
        <div className="flex justify-between">
          <h1 className="font-black text-4xl text-red-400">Contacts</h1>
          <Link
            className={`text-white text-2xl w-28 text-center rounded p-1 m-2 bg-blue-500 mt-2 hover:text-blue-300`}
            to="/new"
          >
            New
          </Link>
        </div>
        <div className="grid grid-cols-1 mx-auto justify-center sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts &&
            contacts?.map((contact: ContactType) => (
              <Contact key={contact._id} contact={contact} />
            ))}
        </div>
      </>
    );
  } else {
    <div className="flex justify-between mx-auto">
      <h1>Error</h1>
    </div>;
  }
};

export default Contacts;
