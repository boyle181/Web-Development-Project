
const contacts = [
    {'name': 'David', 'email': 'limpingman@gmail.com', 'date': '2023-09-27', 'ageRange': 'male', 'oceanview': true, 'animal' : 'lobster', 'id' : 0},
    {'name': 'Johnny', 'email': 'guywithglasses@gmail.com', 'date': '2023-09-27', 'ageRange': 'male', 'oceanview': false, 'animal' : 'border collie', 'id' : 1}
    ]
let next_id = 2;

async function getContactById(id) {
    for (const contact of contacts) {
        if (contact.id == id) {
            return contact
        }
    }
    return null;
}

async function addContact(newContact) {
    newContact.id = next_id;
    next_id++;
    contacts.push(newContact);
    return newContact;
}

async function getContacts() {
    return contacts
}

async function deleteContact(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (id == contacts[i].id) {
            contacts.splice(i,1)
            return true
        }
    }
    return false
}


module.exports = {
    addContact,
    getContactById,
    getContacts,
    deleteContact
};