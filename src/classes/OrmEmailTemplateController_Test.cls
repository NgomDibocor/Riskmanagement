/**
 * @author David diop
 * @date Creation 21/11/2018
 * @description Test class for  OrmEmailTemplateController.
 */
@isTest
public with sharing class OrmEmailTemplateController_Test {
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
     * @author: David diop
     * @date: Creation 21/11/2018
     * @description: cover getTemplates 
     */
	static testmethod void getTemplates_Test() {
		String thisMethod = '##### getTemplates_Test';
        System.debug(thisMethod + ' - START');
            Test.startTest();
            System.assertNotEquals(OrmEmailTemplateController.getTemplates().Size(), 0);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
	}
	     /**
     * @author: David diop
     * @date: Creation 21/11/2018
     * @description: cover getTemplateDetails 
     */
	static testmethod void getTemplateDetails_Test() {
		String thisMethod = '##### getTemplateDetails_Test';
        System.debug(thisMethod + ' - START');
        Id templteId= [SELECT Id FROM EmailTemplate limit 1].Id;
            Test.startTest();
            System.assertNotEquals(OrmEmailTemplateController.getTemplateDetails(templteId).Id,Null);
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
	}
	 /**
     * @author: David diop
     * @date: Creation 21/11/2018
     * @description: cover updateContactWorkshop 
     */
	static testmethod void updateContactWorkshop_Test() {
		String thisMethod = '##### getTemplateDetails_Test';
        System.debug(thisMethod + ' - START');
        Id contactWorkshop= [SELECT Id FROM orm_ContactWorkshop__c limit 1].Id;
            Test.startTest();
       		Test.stopTest();
        System.debug(thisMethod + ' - STOP');
	}
    
}