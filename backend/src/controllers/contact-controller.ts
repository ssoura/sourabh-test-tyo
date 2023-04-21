import { Contact } from "../models/contact-model";
import { Request, Response } from "express";

const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getContact = async (req: Request, res: Response) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send("Contact not found");
  }
};

const createContact = async (req: Request, res: Response) => {
  console.log("xwedcewfdewfd");
  const { firstname, lastname, status } = req.body;
  const contact = new Contact({ firstname, lastname, status });
  try {
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateContact = async (req: Request, res: Response) => {
  const { firstname, lastname, status } = req.body;
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, status },
      { new: true }
    );
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export { getContacts, getContact, createContact, updateContact, deleteContact };
