/**
 * @author: David
 * @date: Creation: 16/11/2018
 * @description: class de teste de OrmPhaseController
 */
@isTest
public with sharing class OrmAssumptionController_Test {
         @testSetup
    static void setUp(){	
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> assumption = OrmAssumptionAssessmentRiskFactory.generateAssumption(assessments[0].Id);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test add
     */
    @isTest
    static void add_Test(){
        String methodName='add';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro assumption = new Macro( Name= 'assumption',orm_assessment__c = assessmentId,RecordTypeId = OrmAssumptionController.getAssumptionRecordTypeId());
        assumption= OrmAssumptionController.add(assumption);
        System.assertNotEquals(assumption.Id, null);
        System.debug('### end- '+methodName);
    }
            /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAssumptionByAssessmentRisk
     */
    @isTest
    static void findAllAssumptionByAssessment(){
        String methodName='findAssumptionByAssessmentRisk';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmAssumptionController.findAllAssumptionByAssessment(assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test saveAssumption
     */
    @isTest
    static void save_Test(){
        String methodName='saveAssumption';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro assumption = [SELECT Id FROM Macro where orm_assessment__c =: assessmentId AND  RecordTypeId =:  OrmAssumptionController.getAssumptionRecordTypeId() limit 1];
        List<Macro> assumptions = new List<Macro>();
        			assumptions.add(assumption);
        integer size = OrmAssumptionController.findAllAssumptionByAssessment(assessmentId).size();
        OrmAssumptionController.saveAssumption(assumptions);
        System.assertEquals(OrmAssumptionController.findAllAssumptionByAssessment(assessmentId).size(), size);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test deleteRecordAssumption
     */
    @isTest
    static void deleteRecordAssumption_Test(){
        String methodName='deleteRecordAssumption';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro assumption = [SELECT Id FROM Macro where orm_assessment__c=:assessmentId AND RecordTypeId =:  OrmAssumptionController.getAssumptionRecordTypeId() limit 1];
        List<String> assumptionIds = new List<String>();
        			assumptionIds.add(assumption.Id);
        integer size = OrmAssumptionController.findAllAssumptionByAssessment(assessmentId).size();
        OrmAssumptionController.deleteRecordAssumption(assumptionIds);
        System.assertEquals( OrmAssumptionController.findAllAssumptionByAssessment(assessmentId).size(), size-1);
        System.debug('### end- '+methodName);
    }
}