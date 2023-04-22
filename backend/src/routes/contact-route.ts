import { Router } from "express";

import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact-controller";

const router = Router();

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).post(updateContact).delete(deleteContact);

router.use("*", (req, res) => {
  res.send("Welcome to Contacts API!");
});

export default router;
