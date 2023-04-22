type ContactType = {
  _id: string;
  firstname: string;
  lastname: string;
  status: string;
};

interface ContactFormProps {
  contact?: ContactType;
  loading?: boolean;
}

interface ContactFormData {
  firstname: string;
  lastname: string;
  status: string;
}
