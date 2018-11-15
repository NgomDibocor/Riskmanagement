/**
 * @author Salimata NGOM
 * @date Creation 30/10/2018
 * @description Test class for OrmWorkshopController.
 */
@isTest
private class OrmWorkshopControllerTest {

	  @testSetup
    static void setUp(){
   
    	
    	List<Assessment__c> listAssessment=Orm_TestFactory.generateAssessment();  
	     List<Account> listOrganisation=Orm_TestFactory.generateOrganisation();
	     Orm_TestFactory.generateWorkshop(listAssessment[0].Id,listOrganisation[0].Id);  
    }
@isTest
	static void addWorkShop_TEST() {
	List<Contract>	listworkshop=[select Id, Name,RecordTypeId from Contract where RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId()];
	 List<Account> listOrganisation=[select Id, Name from Account where RecordTypeId=:OrmOrganisationController.getOrganisationRecordTypeId()];
		String thisMethod = '##### addWorkShop_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        //get list workshop from TestFactory
       
        	OrmWorkshopController.addWorkShop(listworkshop[0]);
        
        System.debug(thisMethod + ' - STOP');
		
	}
    
}