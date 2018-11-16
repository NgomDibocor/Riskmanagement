/**
 * @author Salimata NGOM
 * @version 1.0
 * @description class for add data test 
 * @history 
 * 2018-11-16 : Salimata NGOM 
 */
public with sharing class OrmContactFactory {
   /**
   * @author : Salimata NGOM
   * @date : 16/11/2018
   * @description :generate list of contact
   */
    public static List<Contact> generateContact(String idOrganisation){
    	
    	List<Contact> listContact=new List<Contact> ();
    	 for(Integer i=0;i<20; i++)
        {
        	listContact.add (new Contact(FirstName='firstNameContact'+i,LastName='lastNameContact'+i,Email='contact'+i+'@gmail.com',orm_organisation__c=null,
        	RecordTypeId=OrmContactController.getContactRecordTypeId()));
        }
        insert listContact;
        return listContact;
        }
  /**
   * @author : Salimata NGOM
   * @date : 16/11/2018
   * @description :generate list of contact workshop (participant)
   */
    public static List<orm_ContactWorkshop__c> generateContactWorkshop(String idContact, String idWorkshop){
    	
    	List<orm_ContactWorkshop__c> listContactWorkshop=new List<orm_ContactWorkshop__c> ();
    	 for(Integer i=0;i<20; i++)
        {
        	listContactWorkshop.add (new orm_ContactWorkshop__c(orm_contact__c=idContact,orm_Workshop__c=idWorkshop,
        	RecordTypeId=OrmContactController.getContactWorkshopRecordTypeId()));
        }
        insert listContactWorkshop;
        return listContactWorkshop;
        }
}