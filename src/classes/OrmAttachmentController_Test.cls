/**
 * @author Salimata NGOM
 * @date Creation 16/11/2018
 * @description Test class for  OrmAttachmentController.
 */
@isTest
private class OrmAttachmentController_Test {
    	  @testSetup
    static void setup(){
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Assessment__c> activities = OrmActivityFactory.generateActivities(assessments[0].Id);
   		List<Product2> activitiesProof = OrmActivityFactory.generateActivitiesProof(activities[0].Id);
    }
    /**
     * @author: Salimata NGOM
     * @date: Creation 19/11/2018
     * @description: cover saveTheFiles test method in the OrmAttachmentController
     */
	static testmethod void saveTheFiles_Test() {
		String thisMethod = '##### saveTheFiles_Test';
        System.debug(thisMethod + ' - START');
        //start test implementation
            Test.startTest();
          Test.stopTest();
        System.debug(thisMethod + ' - STOP');
	}
}