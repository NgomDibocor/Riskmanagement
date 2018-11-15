/**
 * @author Salimata NGOM
 * @date Creation 30/10/2018
 * @description Test class for OrmWorkshopController.
 */
@isTest
private class OrmWorkshopControllerTest {

	  @testSetup
    static void setup(){
    	List<Assessment__c> listAssessment=OrmAssessmentFactory.generateAssessment();  
	     List<Account> listOrganisation=OrmAssessmentFactory.generateOrganisation();
	     OrmWorkShopFactory.generateWorkshop(listAssessment[0].Id,listOrganisation[0].Id);  
    }
     /**
     * @author: Salimata NGOM
     * @date: Creation 15/11/2018
     * @description: cover addWorkShop test method in the OrmWorkshopController
     */
@isTest
	static void addWorkShop_TEST() {
	List<Contract>	listworkshop=[select Id, Name,RecordTypeId from Contract where RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId()];
	 List<Account> listOrganisation=[select Id, Name from Account where RecordTypeId=:OrmOrganisationController.getOrganisationRecordTypeId()];
		String thisMethod = '##### addWorkShop_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmWorkshopController.addWorkShop(listworkshop[0]);
        System.debug(thisMethod + ' - STOP');
		
	}
	 /**
     * @author: Salimata NGOM
     * @date: Creation 15/11/2018
     * @description: cover findWorkshopByAssessment test method in the OrmWorkshopController
     */
    @isTest
	static void findWorkshopByAssessment_TEST() {
	List<Assessment__c>	listAssessment=[select Id, Name,RecordTypeId from Assessment__c where RecordTypeId=:OrmAssessmentController.getOrganisationRecordTypeId()];
		String thisMethod = '##### findWorkshopByAssessment_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmWorkshopController.findWorkshopByAssessment(listAssessment[0].Id);
        System.debug(thisMethod + ' - STOP');
	}
    /**
     * @author: Salimata NGOM
     * @date: Creation 15/11/2018
     * @description: cover findAccountByAssessment test method in the OrmWorkshopController
     */
	    @isTest
	static void findAccountByAssessment_TEST() {
	List<Assessment__c>	listAssessment=[select Id, Name,RecordTypeId from Assessment__c where RecordTypeId=:OrmAssessmentController.getOrganisationRecordTypeId()];
		String thisMethod = '##### findAccountByAssessment_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmWorkshopController.findAccountByAssessment(listAssessment[0].Id);
        System.debug(thisMethod + ' - STOP');
	}
	
	/**
     * @author: Salimata NGOM
     * @date: Creation 15/11/2018
     * @description: cover saveWorkShop test method in the OrmWorkshopController
     */
	    @isTest
	static void saveWorkShop_TEST() {
	List<Contract>	listWorkshop=[select Id, Name,RecordTypeId from Contract where RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId() ];
		String thisMethod = '##### saveWorkShop_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmWorkshopController.saveWorkShop(listWorkshop);
        System.debug(thisMethod + ' - STOP');
	}
	/**
     * @author: Salimata NGOM
     * @date: Creation 15/11/2018
     * @description: cover findAllContact test method in the OrmWorkshopController
     */
	    @isTest
	static void findAllContact_TEST() {
		String thisMethod = '##### findAllContact_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmWorkshopController.findAllContact();
        System.debug(thisMethod + ' - STOP');
	}
     /**
     * @author: Salimata NGOM
     * @date: Creation 15/11/2018
     * @description: cover findAllContactWorkshop test method in the OrmWorkshopController
     */
	    @isTest
	static void findAllContactWorkshop_TEST() {
	List<Contract>	workshop=[select Id, Name,RecordTypeId from Contract where RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId()];
		String thisMethod = '##### findAllContactWorkshop_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmWorkshopController.findAllContactWorkshop(workshop[0].Id);
        System.debug(thisMethod + ' - STOP');
	}
	 /**
     * @author: Salimata NGOM
     * @date: Creation 15/11/2018
     * @description: cover deleteRecordWorkshop test method in the OrmWorkshopController
     */
	    @isTest
	static void deleteRecordWorkshop_TEST() {
	List<Contract>	listworkshop=[select Id, Name,RecordTypeId from Contract where RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId()];
	List <String> listIdworkshop= new List<String> ();
	for(Contract workshop:listworkshop){
		listIdworkshop.add(workshop.Id);
	}
	// add string different to string workshop for produce Operation failed
	listIdworkshop.add('11');
		String thisMethod = '##### deleteRecordWorkshop_TEST';
        System.debug(thisMethod + ' - START');
        //start test implementation
        	OrmWorkshopController.deleteRecordWorkshop(listIdworkshop);
        	List <String> listIdworkshopEmpty= new List<String> ();
        	   	OrmWorkshopController.deleteRecordWorkshop(listIdworkshopEmpty);
        System.debug(thisMethod + ' - STOP');
	}
}