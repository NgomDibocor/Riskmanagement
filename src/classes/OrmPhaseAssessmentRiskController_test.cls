/**
 * @author: David
 * @date: Creation: 16/11/2018
 * @description: class de teste de OrmPhaseController
 */
@isTest
public with sharing class OrmPhaseAssessmentRiskController_test {
       @testSetup
    static void setUp(){	
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> risques = OrmAssessmentFactory.generateRisk(); 
   		List<orm_assessmentRisk__c> assessmentRisk= OrmAssessmentFactory.generateAssessmentRisk(assessments[0].Id ,risques[0].Id); 
   		List<Macro> phases = OrmPhaseFactory.generatePhaseAssessmentRisk(assessmentRisk[0].Id);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAllPhasesByAssessment
     */
    @isTest
    static void findAllPhaseByAssessmentRisk_Test(){
        String methodName='findAllPhaseByAssessmentRisk';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        System.assertEquals(OrmPhaseAssessmentRiskController.findAllPhaseByAssessmentRisk(assessmentRiskId).size(), 20);
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
        Macro phase = new Macro( Name= 'phase',orm_assessmentRisk__c = assessmentRiskId,RecordTypeId = OrmPhaseAssessmentRiskController.getPhaseRecordTypeId());
        phase= OrmPhaseAssessmentRiskController.add(phase);
        System.assertNotEquals(phase.Id, null);
        System.debug('### end- '+methodName);
    }
        /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test updatePhases
     */
    @isTest
    static void updatePhases_Test(){
        String methodName='updatePhases';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro phase = [SELECT Id FROM Macro where orm_assessmentRisk__c =: assessmentRiskId AND  RecordTypeId =:  OrmPhaseAssessmentRiskController.getPhaseRecordTypeId() limit 1];
        List<Macro> phases = new List<Macro>();
        			phases.add(phase);
        integer size = OrmPhaseAssessmentRiskController.findAllPhaseByAssessmentRisk(assessmentRiskId).size();
        OrmPhaseAssessmentRiskController.updatePhases(phases);
         System.assertEquals(OrmPhaseAssessmentRiskController.findAllPhaseByAssessmentRisk(assessmentRiskId).size(), size);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test deletePhases
     */
    @isTest
    static void deletePhases_Test(){
        String methodName='deletePhases';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro phase = [SELECT Id FROM Macro where orm_assessmentRisk__c=:assessmentRiskId AND RecordTypeId =:  OrmPhaseAssessmentRiskController.getPhaseRecordTypeId() limit 1];
        List<String> phaseIds = new List<String>();
        			phaseIds.add(phase.Id);
        integer size = OrmPhaseAssessmentRiskController.findAllPhaseByAssessmentRisk(assessmentRiskId).size();
        OrmPhaseAssessmentRiskController.deletePhases(phaseIds);
        System.assertEquals( OrmPhaseAssessmentRiskController.findAllPhaseByAssessmentRisk(assessmentRiskId).size(), size-1);
        System.debug('### end- '+methodName);
    }
}