import { useNavigate } from "react-router-dom";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";

import { AppDispatch, createContact, editContact } from "../../store";
import Alert from "./Alert";

export default function ContactForm({ contact, loading }: ContactFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const schema: ZodType<ContactFormData> = z.object({
    firstname: z.string().min(2).max(30),
    lastname: z.string().min(2).max(30),
    status: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      firstname: contact?.firstname,
      lastname: contact?.lastname,
      status: contact?.status,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: ContactFormData) => {
    try {
      if (contact?._id) {
        const editValues: ContactType = {
          _id: contact?._id,
          firstname: values.firstname,
          lastname: values.lastname,
          status: values.status,
        };
        // Edit contact
        dispatch(editContact(editValues));
      } else {
        //New Contact
        dispatch(createContact(values));
      }
      navigate("/");
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-slate-700 font-bold text-xl uppercase text-center">
        {true ? "Edit Contact" : "New Contact"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <div className="mb-4">
          <label htmlFor="firstname" className="text-slate-800 ">
            First Name:
          </label>
          <input
            type="text"
            className="mt-2 block w-full p-3 bg-slate-50 rounded-md"
            {...register("firstname")}
          />
          {errors.firstname && <Alert>{errors.firstname.message}</Alert>}
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="text-slate-800 ">
            Last Name:
          </label>
          <input
            type="text"
            className="mt-2 block w-full p-3 bg-slate-50 rounded-md"
            {...register("lastname")}
          />
          {errors.lastname && <Alert>{errors.lastname.message}</Alert>}
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="text-slate-800 ">
            Status:
          </label>
          <div>
            <input type="radio" value="active" {...register("status")} />
            <label className="pl-2">Active</label>
          </div>

          <div>
            <input type="radio" value="inactive" {...register("status")} />
            <label className="pl-2">Inactive</label>
          </div>
          {errors.status && <Alert>{errors.status.message}</Alert>}
        </div>

        <input
          type="submit"
          value={true ? "Save Changes" : "Add Contact"}
          className="mt-5 w-full bg-slate-700 p-3 text-white text-lg rounded-md uppercase cursor-pointer"
        />
      </form>
    </div>
  );
}
