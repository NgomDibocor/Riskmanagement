/**
 * @author: David
 * @date: Creation: 16/11/2018
 * @description: class de teste de OrmPhaseController
 */
@isTest
public with sharing class OrmAssumptionAssessmentRisk_Test {
        @testSetup
    static void setUp(){	
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> risques = OrmAssessmentFactory.generateRisk(); 
   		List<orm_assessmentRisk__c> assessmentRisk= OrmAssessmentFactory.generateAssessmentRisk(assessments[0].Id ,risques[0].Id); 
   		List<Macro> assumption = OrmAssumptionAssessmentRiskFactory.generateAssumptionAssessmentRisk(assessmentRisk[0].Id);
    }
        /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAssumptionByAssessmentRisk
     */
    @isTest
    static void findAssumptionByAssessmentRisk_Test(){
        String methodName='findAssumptionByAssessmentRisk';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        System.assertEquals(OrmAssumptionAssessmentRiskController.findAssumptionByAssessmentRisk(assessmentRiskId).size(), 20);
        System.debug('### end- '+methodName);
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
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro assumption = new Macro( Name= 'assumption',orm_assessmentRisk__c = assessmentRiskId,RecordTypeId = OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId());
        assumption= OrmAssumptionAssessmentRiskController.add(assumption);
        System.assertNotEquals(assumption.Id, null);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test updateAssumption
     */
    @isTest
    static void updateAssumption_Test(){
        String methodName='updateAssumption';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro assumption = [SELECT Id FROM Macro where orm_assessmentRisk__c =: assessmentRiskId AND  RecordTypeId =:  OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId() limit 1];
        List<Macro> assumptions = new List<Macro>();
        			assumptions.add(assumption);
        integer size = OrmAssumptionAssessmentRiskController.findAssumptionByAssessmentRisk(assessmentRiskId).size();
        OrmAssumptionAssessmentRiskController.updateAssumption(assumptions);
        System.assertEquals(OrmAssumptionAssessmentRiskController.findAssumptionByAssessmentRisk(assessmentRiskId).size(), size);
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
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro assumption = [SELECT Id FROM Macro where orm_assessmentRisk__c=:assessmentRiskId AND RecordTypeId =:  OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId() limit 1];
        List<String> assumptionIds = new List<String>();
        			assumptionIds.add(assumption.Id);
        integer size = OrmAssumptionAssessmentRiskController.findAssumptionByAssessmentRisk(assessmentRiskId).size();
        OrmAssumptionAssessmentRiskController.deleteRecordAssumption(assumptionIds);
        System.assertEquals( OrmAssumptionAssessmentRiskController.findAssumptionByAssessmentRisk(assessmentRiskId).size(), size-1);
        System.debug('### end- '+methodName);
    }
}