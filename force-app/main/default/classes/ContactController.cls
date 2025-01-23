public with sharing class ContactController {

    @AuraEnabled()
    public static List<Contact> getContacts() {
        return [SELECT Id,Name,Email FROM Contact];
    }

    @AuraEnabled()
    public static void updateContactEmail(Id contactId, String newEmail) {
        try {
            Contact c = [SELECT Id,Name,Email FROM Contact WHERE Id = :contactId LIMIT 1];
            if (c != null) {
                c.Email = newEmail;
                update c;
            } else {
                throw new AuraHandledException('Contact not found');
            }
        } catch (Exception e) {
            throw new AuraHandledException('Error updating email: ' + e.getMessage());
        }
    }
}