const contactsOperations = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const userList = await contactsOperations.listContacts();
            console.table(userList);
            break;

        case "get":
            const getUser = await contactsOperations.getContactById(id);
            if (!getUser) {
                throw new Error(`Product by id=${id} not found`);
            }
            console.table(getUser);
            break;

        case "add":
            await contactsOperations.addContact(name, email, phone);
            const addUser = await contactsOperations.listContacts();
            console.table(addUser);
            break;

        case "remove":
            const removeUser = await contactsOperations.removeContact(id);
            console.table(removeUser);
            break;

        case "update":
            const updateUser = await contactsOperations.updateContactById(
                id,
                name,
                email,
                phone
            );
            console.table(updateUser);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
};

invokeAction(argv);