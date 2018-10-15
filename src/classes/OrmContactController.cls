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
 * find one contact 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get one contact 
 * @history 
 * 2018-10-05 : Salimata NGOM - Implementation
 */
   
 @AuraEnabled 
  public static Contact findOneContact(string idcontact){
        Contact oneContact = new Contact();
        oneContact = [Select Id, Name,FirstName,LastName,Email,Phone, orm_organisation__c
                    From Contact where RecordTypeId=:OrmContactController.getContactRecordTypeId() and Id=:idcontact];
                   
        return oneContact;
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
		
		try{
       item.RecordTypeId = OrmContactController.getContactRecordTypeId();
      
		upsert item;
		return item;
		}catch(Exception e){
       throw new AuraHandledException(e.getMessage());
       return null;
}       
        
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
 * @description method to associate single contact to workshop
 * @history 
 * 2018-09-26: Salimata NGOM - Implementation
 */
    @AuraEnabled
	public static orm_ContactWorkshop__c addOneContactWorkShop(orm_ContactWorkshop__c item){ 
		orm_ContactWorkshop__c contactworkshop  = new orm_ContactWorkshop__c();
			item.RecordTypeId = OrmContactController.getContactWorkshopRecordTypeId();
			item.orm_dateAjout__c=Date.today();
			insert item;
		return item;
		       
		
	}
	
/**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to get contacts associate with workshop
 * @history 
 * 2018-08-09: Salimata NGOM - Implementation
 */
  @AuraEnabled 
    public static List<orm_ContactWorkshop__c> findAllContactWorkshop(String item){
        List<orm_ContactWorkshop__c> allContact = new List<orm_ContactWorkshop__c>();
        allContact = [Select orm_contact__c, orm_contact__r.Id, orm_contact__r.orm_organisation__c, orm_Workshop__c,orm_Workshop__r.Name,orm_notification__c
                    From orm_ContactWorkshop__c where 
                    RecordTypeId=:OrmContactController.getContactWorkshopRecordTypeId() and  
                    orm_Workshop__c=:item
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
    public static orm_ContactWorkshop__c getContactWorkshop (String item,String contact){
       orm_ContactWorkshop__c contactworkshop = new orm_ContactWorkshop__c();
    
       contactworkshop=[Select Id,orm_contact__c, orm_Workshop__c,orm_Workshop__r.Name,orm_notification__c,orm_dateAjout__c
                    From orm_ContactWorkshop__c where 
                    RecordTypeId=:OrmContactController.getContactWorkshopRecordTypeId() and  
                    orm_Workshop__c=:item and orm_contact__c=:contact];
                   return contactworkshop;
        
    }
    
 /** @author Salimata NGOM
 * @version 1.0
 * @description method to send mail 
 * @history 
 * 2018-08-24: Salimata NGOM - Implementation
 */ 
     @AuraEnabled 
    public static void sendMailMethod(String mMail ,String mSubject ,String mbody){
    
     List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();     
  
     //  Create a new Email
       Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    
    // Set list of people who should get the email
       List<String> sendTo = new List<String>();
       sendTo.add(mMail);
       mail.setToAddresses(sendTo);
    
    // Set who the email is sent from
       mail.setReplyTo('noreply@gmail.com'); // change it with your mail address.
       mail.setSenderDisplayName('salesforce User'); 
    
    //  Set email contents - you can use variables!
      mail.setSubject(mSubject);
      mail.setHtmlBody(mbody);
    
    //  Add your email to the master list
      mails.add(mail);
    
  // Send all emails in the master list
     Messaging.sendEmail(mails);
   } 
   
  /**
 * @author Salimata NGOM
 * @version 1.0
 * @description method to update orm_ContactWorkshop__c item
 * @history 
 * 2018-08-28: Salimata NGOM - Implementation
 */
    @AuraEnabled
	public static orm_ContactWorkshop__c updateContactWorkshop(orm_ContactWorkshop__c item){        
        item.RecordTypeId=OrmContactController.getContactWorkshopRecordTypeId();
		upsert item;
		return item;
	}

}