const prompt = require('prompt-sync')({ sigint: true });
class ContactDetail {

    constructor(...parameter) {
        this.firstName = parameter[0];
        this.lastName = parameter[1];
        this.address = parameter[2];
        this.city = parameter[3];
        this.state = parameter[4];
        this.zip = parameter[5];
        this.phone = parameter[6];
        this.email = parameter[7];
    }

    // getter and setter method
    get firstName() { return this._firstName; }
    set firstName(fName) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(fName))
            this._firstName = fName;
        else throw 'First name is Invalid!';
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        let lastNameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$')
        if (lastNameRegex.test(lastName))
            this._lastName = lastName;
        else throw "Last name invalid";
    }

    get address() {
        return this._address;
    }
    set address(address) {
        let addressRegex = RegExp('^[A-Za-z\\s0-9]{4,}$')
        if (addressRegex.test(address))
            this._address = address;
        else throw "Address is Invalid.";
    }

    get city() {
        return this._city;
    }
    set city(city) {
        let cityRegex = RegExp('^[A-Za-z]{4,}$')
        if (city === undefined || cityRegex.test(city))
            this._city = city;
        else throw "City name is Invalid";
    }

    get state() {
        return this._state;
    }
    set state(state) {
        let stateRegex = RegExp('^[A-Za-z\\s]{4,}$');
        if (stateRegex.test(state))
            this._state = state;
        else throw "State is Invalid";
    }

    get zip() { return this._zip; }
    set zip(zip) {
        let zipRegex = RegExp('^[0-9]{6}$');
        if (zipRegex.test(zip))
            this._zip = zip;
        else throw "Zip code is invalid";
    }

    get phoneNumber() { return this._phone; }
    set phoneNumber(phoneNumber) {
        let phoneRegex = RegExp('^([0-9]{2})[\\s]([0-9]{10})');
        if (phoneRegex.test(phoneNumber))
            this._phone = phoneNumber;
        else throw "Phone number is invalid";
    }

    get email() { return this._email; }
    set email(email) {
        let emailRegex = RegExp('^[a-zA-z]{1}([.]{0,1}[a-zA-z0-9+-]{1,}){0,}[@]{1}[a-zA-Z0-9]{1,}[.]{1}[a-z]{2,3}([.]{1}[a-z]{2}){0,1}$');
        if (emailRegex.test(email))
            this._email = email;
        else throw "Email is invalid";
    }

    toString() {
        return "FirstName=" + this.firstName + ", LastName=" + this.lastName + ", Address=" + this.address +
            ", City=" + this.city + ", State=" + this.state + ", Zip=" + this.zip + ", Phone=" + this.phone + ", Email=" + this.email;
    }

}

let contact = new ContactDetail("Jag", "Agni", "India", "Kanpur", "Uttar Pradesh", 123456, 123456789, "abc@123.com");
console.log(contact.toString());

try {
    contact.firstName = "jag";
} catch (e) {
    console.error(e);
}

// check if state invalid
try {
    contact.state = "Up";
} catch (e) {
    console.error(e);
}

function editContacts(firstName) {
    let editContact;
    addressBookArray.forEach(contact => {
        if (contact.firstName == firstName) {
            editContact = contact;
        }
    });
    let city = prompt("Enter new city name: ");
    editContact.city = city;
    console.log("Edited contact - " + editContact);
}

function removeContact(firstName) {
    let removeContact;
    let index;
    addressBookArray.forEach(contact => {
        if (contact.firstName == firstName) {
            removeContact = contact;
            index = addressBookArray.indexOf(removeContact);
        }
    });
    console.log("Delete contact: " + removeContact);
    addressBookArray.splice(index, 1);
    console.log("Array after deletion: " + addressBookArray);
}

function getContactsCount() {
    return addressBookArray.reduce(count => count + 1, 0);
}

function checkIfCountactExists(newContact) {
    let contactPresent = false;
    addressBookArray.forEach(contact => {
        if (contact.firstName == newContact.firstName && contact.lastName == newContact.lastName) {
            contactPresent = true;
        }
    });
    return contactPresent;
}
function addContact(newContact) {
    let contactPresent = checkIfCountactExists(newContact);
    if (contactPresent == true) {
        console.log("Contact already present");
    } else {
        addressBookArray.push(newContact);
    }
}

function findPersonInCity(firstName, city) {
    let contacts = addressBookArray.filter(contact => contact.firstName == firstName && contact.city == city);
    if (contacts.length > 0)
        console.log("Person in city --- " + contacts);
    else
        console.log("Not present in this city");
}

function findContactsByCity(city) {
    let contacts = addressBookArray.filter(contact => contact.city == city);
    console.log("In City--- " + contacts);
}
function findContactsByState(state) {
    let contacts = addressBookArray.filter(contact => contact.state == state);
    console.log("In State--- " + contacts);
}

let addressBookArray = new Array();

let firstContact = new ContactDetail("First", "Contact", "India", "Agra", "Uttar Pradesh", 123456, 123456789, "abcdf@123.com");
addContact(firstContact);
let secondContact = new ContactDetail("Second", "Contact", "India", "Lucknow", "Uttar Pradesh", 123000, 987654321, "second@123.com");
addContact(secondContact);
let duplicateContact = new ContactDetail("Second", "Contact", "India", "Lucknow", "Uttar Pradesh", 123000, 987654321, "second@123.com");
addContact(duplicateContact);
let thirdContact = new ContactDetail("Third", "Contact", "India", "Kanpur", "Uttar Pradesh", 123000, 987654321, "second@123.com");
addContact(thirdContact);

console.log(addressBookArray);

editContacts("First");
removeContact("Second");

let contactsCount = getContactsCount();
console.log("Number of contacts= " + contactsCount);

findPersonInCity("Third", "Kanpur");
findPersonInCity("Second", "Pune");

findContactsByCity("Kanpur");
findContactsByState("Uttar Pradesh");