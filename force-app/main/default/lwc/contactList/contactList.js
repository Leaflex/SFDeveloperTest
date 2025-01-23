import { LightningElement, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import updateContactEmail from '@salesforce/apex/ContactController.updateContactEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactList extends LightningElement {
    @track contacts = [];
    @track error;

    connectedCallback() {
        this.fetchContacts();
    }

    fetchContacts() {
        getContacts()
            .then((result) => {
                this.contacts = result;
                this.showToast('Success', 'Contacts loaded successfully', 'success'); // For debugging purposes
            })
            .catch((error) => {
                this.error = error;
                this.showToast('Error', 'Error loading contacts', 'error'); // For debugging purposes
            });
    }

    handleEdit(event) {
        const contactId = event.target.dataset.id;
        const newEmail = prompt('Enter new email:');
        if (newEmail) {
            updateContactEmail({ contactId, newEmail })
                .then(() => {
                    this.fetchContacts();
                })
                .catch((error) => {
                    console.error('Error updating email:', error);
                    this.showToast('Error', 'Error updating email', 'error'); // For debugging purposes
                });
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}
