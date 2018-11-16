/**
 * @author: David
 * @date: Creation: 16/11/2018
 * @description: class de teste de OrmPhaseController
 */
@isTest
public with sharing class OrmPhaseController_Test {
      @testSetup
    static void setUp(){	
   		List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> phases = OrmPhaseFactory.generatePhases(assessments[0].Id);
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
        Id assessment= [SELECT Id FROM Assessment__c limit 1].Id;
        Macro phase = new Macro( Name= 'phase',orm_assessment__c = assessment,RecordTypeId = OrmPhaseController.getPhaseRecordTypeId());
        phase= OrmPhaseController.add(phase);
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
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro phase = [SELECT Id FROM Macro where RecordTypeId =: OrmPhaseController.getPhaseRecordTypeId() limit 1];
        List<Macro> phases = new List<Macro>();
        			phases.add(phase);
        integer size = OrmPhaseController.findAllPhasesByAssessment(assessmentId).size();
        OrmPhaseController.updatePhases(phases);
         System.assertEquals(OrmPhaseController.findAllPhasesByAssessment(assessmentId).size(), size);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAllPhasesByAssessment
     */
    @isTest
    static void findAllPhasesByAssessment_Test(){
        String methodName='findAllPhasesByAssessment';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmPhaseController.findAllPhasesByAssessment(assessmentId).size(), 20);
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
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro phase = [SELECT Id FROM Macro where orm_assessment__c=:assessmentId AND RecordTypeId =: OrmPhaseController.getPhaseRecordTypeId() limit 1];
        List<String> phaseIds = new List<String>();
        			phaseIds.add(phase.Id);
        integer size = OrmPhaseController.findAllPhasesByAssessment(assessmentId).size();
        OrmPhaseController.deletePhases(phaseIds);
        System.assertEquals( OrmPhaseController.findAllPhasesByAssessment(assessmentId).size(), size-1);
        System.debug('### end- '+methodName);
    }
}