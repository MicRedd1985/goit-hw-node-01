const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const userList = JSON.parse(data);
        return userList;
    } catch (err) {
        console.log(err.message);
    }
};
const getContactById = async (contactId) => {
    try {
        const userList = await listContacts();
        const user = userList.find((item) => item.id === contactId);
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        console.log(err.message);
    }
};

const updateContactById = async (contactId, name, email, phone) => {
    try {
        const userList = await listContacts();
        const indx = userList.findIndex((item) => item.id === contactId);
        if (indx === -1) {
            return null;
        }
        userList[indx] = { id: contactId, name, email, phone };
        await updateUser(userList);
        return userList;
    } catch (err) {
        console.log(err.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const userList = await listContacts();
        const newUserList = userList.filter((item) => item.id !== contactId);
        await updateUser(newUserList);
        return newUserList;
    } catch (err) {
        console.log(err.message);
    }
};

const addContact = async (name, email, phone) => {
    try {
        const userList = await listContacts();
        const newUser = { id: v4(), name, email, phone };
        userList.push(newUser);
        await updateUser(userList);
        return newUser;
    } catch (err) {
        console.log(err.message);
    }
};

const updateUser = async (userList) => {
    await fs.writeFile(contactsPath, JSON.stringify(userList));
};

module.exports = {
    listContacts,
    getContactById,
    updateContactById,
    removeContact,
    addContact,
};