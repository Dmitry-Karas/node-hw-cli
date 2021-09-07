import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./db/contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

async function listContacts() {
  const contacts = await readContacts();

  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const contact = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );

  console.table(contact);
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  console.log("Removing a contact...");

  await getContactById(contactId);

  await fs.writeFile(
    contactsPath,
    JSON.stringify(
      contacts.filter((contact) => String(contact.id) !== String(contactId)),
      null,
      2
    )
  );

  console.table(await readContacts());
  console.log("The contact has been successfully deleted");
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const id = nanoid();
  const contact = { id, name, email, phone };

  console.log("Adding a contact...");
  console.table(contact);

  await fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, contact], null, 2)
  );

  console.table(await readContacts());
  console.log("The contact has been successfully added");
}

export default { listContacts, getContactById, removeContact, addContact };
