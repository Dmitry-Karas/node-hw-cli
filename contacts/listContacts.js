import contactsOperations from "./index.js";

const listContacts = async () => {
  try {
    const contacts = await contactsOperations.readContacts();

    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
};

export default listContacts;
