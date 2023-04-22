import ContactForm from "../components/ContactForm";

const New = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-red-400">New Contact</h1>
      <p className="mt-3">Fill in the following fields to add new contact.</p>
      <ContactForm />
    </>
  );
};

export default New;
