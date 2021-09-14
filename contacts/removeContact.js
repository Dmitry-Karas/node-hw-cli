import fs from "fs/promises";
import contactsPath from "../utils/contactsPath.js";
import contactsOperations from "./index.js";

const removeContact = async (contactId) => {
  try {
    const contacts = await contactsOperations.readContacts();
    const contact = await contactsOperations.getContactById(contactId);

    if (!contact) return;

    console.log("Removing a contact...");

    await fs.writeFile(
      contactsPath,
      JSON.stringify(
        contacts.filter((contact) => String(contact.id) !== String(contactId)),
        null,
        2
      )
    );

    console.table(await contactsOperations.readContacts());
    console.log("The contact has been successfully deleted");
  } catch (error) {
    console.log(error.message);
  }
};

export default removeContact;
