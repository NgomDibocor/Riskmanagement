/**
 * @author: David
 * @date: Creation: 14/11/2018
 * @description: class de teste de OrmActionPlan
 */
@isTest
public  class OrmActionPlan_Test {
    
        @testSetup
    static void setUp(){ 
   		List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();   
    }
      /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getAllMeasure
     */
    @isTest
    static void getAllMeasure_Test(){
        String methodName='getAllMeasure';
        System.debug('### start- '+methodName);
		Assessment__c assessment = [SELECT Id FROM Assessment__c limit 1];
        System.assertNotEquals(OrmActionPlanController.getAllMeasure(assessment.Id),null);
        System.debug('### end- '+methodName);
    }
}