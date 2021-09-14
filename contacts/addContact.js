import fs from "fs/promises";
import { nanoid } from "nanoid";
import contactsPath from "../utils/contactsPath.js";
import contactsOperations from "./index.js";

const addContact = async (name, email, phone) => {
  try {
    const contacts = await contactsOperations.readContacts();
    const id = nanoid();
    const contact = { id, name, email, phone };

    console.log("Adding a contact...");
    console.table(contact);

    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, contact], null, 2)
    );

    console.table(await contactsOperations.readContacts());
    console.log("The contact has been successfully added");
  } catch (error) {
    console.log(error.message);
  }
};

export default addContact;
