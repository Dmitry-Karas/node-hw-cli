import fs from "fs/promises";
import contactsPath from "../utils/contactsPath.js";

const readContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export default readContacts;
