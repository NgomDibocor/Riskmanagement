/**
 * @author Salimata NGOM
 * @date Creation 16/11/2018
 * @description Test class for  OrmContactController.
 */
@isTest
private class  OrmContactController_Test {
    
    	  @testSetup
    static void setup(){
	     List<Account> listOrganisation=OrmAssessmentFactory.generateOrganisation();
           List <Contact> listContacts=new List<Contact>();
	    listContacts= OrmContactFactory.generateContact(listOrganisation[0].Id);  
         List<Assessment__c> listAssessment=OrmAssessmentFactory.generateAssessment();  
      List<Contract> listworkshop=  OrmWorkShopFactory.generateWorkshop(listAssessment[0].Id,listOrganisation[0].Id);  
         OrmContactFactory.generateContactWorkshop(listContacts[0].Id,listworkshop[0].Id);  

    }
     /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover findAllContact test method in the OrmContactController
     */
	    @isTest
	static void findAllContact_TEST() {
		String thisMethod = '##### findAllContact_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmContactController.findAllContact();
        System.debug(thisMethod + ' - STOP');
	}
    /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover findOneContact test method in the OrmContactController
     */
	    @isTest
	static void findOneContact_TEST() {
        List <Contact> listContacts=new List<Contact>();
        listContacts=[select Id, Name,orm_organisation__c from Contact where RecordTypeId=:OrmContactController.getContactRecordTypeId()];
		String thisMethod = '##### findOneContact_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmContactController.findOneContact(listContacts[0].Id);
        System.debug(thisMethod + ' - STOP');
	}
    
        /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover add test method in the OrmContactController
     */
	   // @isTest
	static testmethod void add_TEST1() {
        List <Contact> listContacts=new List<Contact>();
        listContacts=[select Id, Name,Email,orm_organisation__c from Contact where RecordTypeId=:OrmContactController.getContactRecordTypeId()];
       listContacts[0].Email=null;
        // listContacts[0].orm_organisation__c=null;
		String thisMethod = '##### add_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
            Test.startTest();
        System.debug('listContact[0]='+listContacts[0]);
        	OrmContactController.add(listContacts[0]);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
          
	}
        
        /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover add test method in the OrmContactController
     */
	   // @isTest
	static testmethod void add_TEST2() {
      
        List <Contact> listContacts=new List<Contact>();
        listContacts=[select Id, Name,Email from Contact where RecordTypeId=:OrmContactController.getContactRecordTypeId()];
		String thisMethod = '##### add_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
            Test.startTest();
        System.debug('listContacts='+listContacts);
        listContacts[2].Email='contact22@gmail.com';
         update listContacts;
        OrmContactController.add(listContacts[2]);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
          
	}
    
    /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover addOneContactWorkShop test method in the OrmContactController
     */
	   // @isTest
	static testmethod void addOneContactWorkShop_Test() {
        	orm_ContactWorkshop__c contactworkshop  = new orm_ContactWorkshop__c();
         List <Contact> listContacts=new List<Contact>();
        listContacts=[select Id, Name,Email from Contact where RecordTypeId=:OrmContactController.getContactRecordTypeId()];
        	List<Contract>	listworkshop=[select Id, Name,RecordTypeId from Contract where RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId()];
    contactworkshop.orm_contact__c=listContacts[0].Id;
           contactworkshop.orm_Workshop__c=listworkshop[0].Id;
		String thisMethod = '##### addOneContactWorkShop_Test';
        System.debug(thisMethod + ' - START');
        //start test implementation
            Test.startTest();
        OrmContactController.addOneContactWorkShop(contactworkshop);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
          
	}
        /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover findAllContactWorkShop test method in the OrmContactController
     */
	   // @isTest
	static testmethod void findAllContactWorkShop_Test() {
        	List<Contract>	listworkshop=[select Id, Name,RecordTypeId from Contract where RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId()];
		String thisMethod = '##### findAllContactWorkShop_Test';
        System.debug(thisMethod + ' - START');
        //start test implementation
            Test.startTest();
        OrmContactController.findAllContactWorkShop(listworkshop[0].Id);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
	}

     /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover getContactWorkshop test method in the OrmContactController
     */
	   // @isTest
	static testmethod void getContactWorkshop_Test() {
 List <Contact> listContacts=new List<Contact>();
         List <Contract> listWorkshops=new List<Contract>();
        listContacts=[select Id, Name,Email from Contact where RecordTypeId=:OrmContactController.getContactRecordTypeId()];
    	listWorkshops=[select Id, Name,RecordTypeId from Contract where RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId()];
        String thisMethod = '##### getContactWorkshop_Test';
        System.debug(thisMethod + ' - START');
        //start test implementation
            Test.startTest();
        System.debug('workshop0='+listWorkshops[0]);
        System.debug('listContact0='+listContacts[0]);
        OrmContactController.getContactWorkshop(listWorkshops[0].Id,listContacts[0].Id);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
	}
	 /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover updateContactWorkshop test method in the OrmContactController
     */
	   // @isTest
	static testmethod void updateContactWorkshop_Test() {
        	List<orm_ContactWorkshop__c> listcontactworkshop  = [select Id,orm_contact__c, orm_Workshop__c,orm_Workshop__r.Name from orm_ContactWorkshop__c where RecordTypeId=:OrmContactController.getContactWorkshopRecordTypeId()];
		String thisMethod = '##### updateContactWorkshop_Test';
        System.debug(thisMethod + ' - START');
        //start test implementation
         System.debug('listcontactworkshop'+listcontactworkshop);
            Test.startTest();   
        OrmContactController.updateContactWorkshop(listcontactworkshop[0]);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
          
	}
            /**
     * @author: Salimata NGOM
     * @date: Creation 16/11/2018
     * @description: cover deleteContactWorkshop test method in the OrmContactController
     */
	   // @isTest
	static testmethod void deleteContactWorkshop_Test() {
        	List<orm_ContactWorkshop__c> listcontactworkshop  = [select Id from orm_ContactWorkshop__c where RecordTypeId=:OrmContactController.getContactWorkshopRecordTypeId()];
		String thisMethod = '##### addOneContactWorkShop_Test';
        System.debug(thisMethod + ' - START');
        //start test implementation
            Test.startTest();
        OrmContactController.deleteContactWorkshop(listcontactworkshop[0]);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
	}
}