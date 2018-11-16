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
	     OrmContactFactory.generateContact(listOrganisation[0].Id);  
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
         listContacts[0].orm_organisation__c=null;
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
}