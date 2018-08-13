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
 * getContactWorkshopRecordTypeId
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get Record type of contact workshop 
 * @history 
 * 2018-08-07: Salimata NGOM - Implementation
 */
    
     public static Id getContactWorkshopRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.orm_ContactWorkshop__c.getRecordTypeInfosByName()
                  .get('orm RT contactWorkshow').getRecordTypeId();
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
/**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to associate contact to workshop
 * @history 
 * 2018-08-07: Salimata NGOM - Implementation
 */
    @AuraEnabled
	public static List<orm_ContactWorkshop__c> addWorkShopContact(List<orm_ContactWorkshop__c> items){ 
		List<orm_ContactWorkshop__c> listcontactworkshop  = new List<orm_ContactWorkshop__c>();
		for (orm_ContactWorkshop__c contactworkshop:items){
			contactworkshop.RecordTypeId = OrmContactController.getContactWorkshopRecordTypeId();
			contactworkshop.orm_dateAjout__c=Date.today();
			listcontactworkshop.add(contactworkshop);
		}
			insert listcontactworkshop;
		return listcontactworkshop;
		       
		
	}
	
/**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to get contacts associate with workshop
 * @history 
 * 2018-08-09: Salimata NGOM - Implementation
 */
  @AuraEnabled 
    public static List<orm_ContactWorkshop__c> findAllContactWorkshop(Contract item){
        List<orm_ContactWorkshop__c> allContact = new List<orm_ContactWorkshop__c>();
        allContact = [Select orm_contact__c, orm_contact__r.Id
                    From orm_ContactWorkshop__c where 
                    RecordTypeId=:OrmContactController.getContactWorkshopRecordTypeId() and  
                    orm_Workshop__c=:item.Id
                   ];
        return allContact;
    }
    
    /**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to dissociate contacts  with workshop
 * @history 
 * 2018-08-13: Salimata NGOM - Implementation
 */
    	@AuraEnabled
	public static orm_ContactWorkshop__c deleteContactWorkshop(orm_ContactWorkshop__c item){
		delete item;
		return item;
	}
	/**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to get orm_ContactWorkshop__c with parameters workshop and contact
 * @history 
 * 2018-08-13: Salimata NGOM - Implementation
 */
  @AuraEnabled 
    public static orm_ContactWorkshop__c getContactWorkshop(String item,String contact){
       orm_ContactWorkshop__c contactworkshop = new orm_ContactWorkshop__c();
    
       contactworkshop=[Select Id,orm_contact__c, orm_Workshop__c
                    From orm_ContactWorkshop__c where 
                    RecordTypeId=:OrmContactController.getContactWorkshopRecordTypeId() and  
                    orm_Workshop__c=:item and orm_contact__c=:contact];
                   return contactworkshop;
        
    }
    
}