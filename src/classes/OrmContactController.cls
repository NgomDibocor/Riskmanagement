/**
 * @author Salimata NGOM
 * @version 1.0
 * @description class for managing Contact
 * @history 
 * 2018-08-06 : Salimata NGOM 
 */
public with sharing class OrmContactController {
	
/**
 * getContactRecordTypeId
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get Record type of activity
 * @history 
 * 2018-08-06: Salimata NGOM - Implementation
 */
    
     public static Id getContactRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName()
                  .get('orm RT contact').getRecordTypeId();
        return RecordTypeId;
    }
  
 /**
 * find all contact 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get All contact 
 * @history 
 * 2018-08-06 : Salimata NGOM - Implementation
 */
   
 @AuraEnabled 
    public static List<Contact> findAllContact(){
        List<Contact> allContact = new List<Contact>();
        allContact = [Select Id, Name,FirstName,LastName,Email,Phone, orm_organisation__c
                    From Contact where RecordTypeId=:OrmContactController.getContactRecordTypeId() 
                   ];
        return allContact;
    }  
    
 /**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to add an Contact
 * @history 
 * 2018-08-06: Salimata NGOM - Implementation
 */
    @AuraEnabled
	public static Contact add(Contact item){        
        item.RecordTypeId = OrmContactController.getContactRecordTypeId();
		upsert item;
		return item;
	}
}