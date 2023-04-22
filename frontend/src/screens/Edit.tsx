import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";

const Edit = () => {
  const [contact, setContact] = useState<ContactType>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const getContactAPI = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/contacts/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        const details = {
          _id: result._id,
          firstname: result.firstname,
          lastname: result.lastname,
          status: result.status,
        };

        setContact(details);
      } catch (err) {
        console.log(err);
      }

      setLoading(!loading);
    };
    getContactAPI();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-red-400">Edit Contact</h1>
      {contact?._id ? (
        <ContactForm contact={contact} loading={loading} />
      ) : (
        <p className="font-black text-2xl text-slate-900">No Results</p>
      )}
    </>
  );
};

export default Edit;
