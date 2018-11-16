/**
 * @author: David
 * @date: Creation: 16/11/2018
 * @description: class de teste de OrmImpactController
 */
@isTest
public with sharing class OrmImpactController_Test {
        @testSetup
    static void setUp(){	
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> risques = OrmAssessmentFactory.generateRisk(); 
   		List<orm_assessmentRisk__c> assessmentRisk= OrmAssessmentFactory.generateAssessmentRisk(assessments[0].Id ,risques[0].Id); 
   		List<Macro> impacts = OrmImpactFactory.generateImpacts(assessmentRisk[0].Id);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAllImpactByAssessmentRisk
     */
    @isTest
    static void findAllImpactByAssessmentRisk_Test(){
        String methodName='findAllImpactByAssessmentRisk';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        System.assertEquals(OrmImpactController.findAllImpactByAssessmentRisk(assessmentRiskId).size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test getImpact
     */
    @isTest
    static void getImpact_Test(){
        String methodName='getImpact';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro impact = [SELECT Id FROM Macro where orm_assessmentRisk__c =:assessmentRiskId and RecordTypeId =: OrmImpactController.getImpactRecordTypeId()   limit 1];
        System.assertEquals(OrmImpactController.getImpact(impact.Id).Id, impact.Id);
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
        Macro impact = new Macro( Name= 'impact',orm_categorie_impact__c='valeur 3',orm_assessmentRisk__c = assessmentRiskId,RecordTypeId = OrmImpactController.getImpactRecordTypeId());
        impact= OrmImpactController.add(impact);
        System.assertNotEquals(impact.Id, null);
        System.debug('### end- '+methodName);
    }
        /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test updateImpact
     */
    @isTest
    static void updateImpact_Test(){
        String methodName='updateImpact';
        System.debug('### start- '+methodName);
        Macro impact = [SELECT Id FROM Macro where RecordTypeId =: OrmImpactController.getImpactRecordTypeId() limit 1];
        impact= OrmImpactController.updateImpact(impact);
        System.assertNotEquals(impact.Id, null);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test getSelectOptions
     */
    @isTest
    static void getSelectOptions_Test(){
        String methodName='getSelectOptions';
        System.debug('### start- '+methodName);
        Macro impact = new Macro();
        List<String> lstPick = OrmImpactController.getSelectOptions(impact,'orm_categorie_impact__c');
        System.assertNotEquals(lstPick.size(), 0);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test deleteImpacts
     */
    @isTest
    static void deleteImpacts_Test(){
        String methodName='deleteImpacts';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro impact = [SELECT Id FROM Macro where orm_assessmentRisk__c=:assessmentRiskId AND RecordTypeId =:  OrmImpactController.getImpactRecordTypeId() limit 1];
        List<String> impactIds = new List<String>();
        			impactIds.add(impact.Id);
        integer size = OrmImpactController.findAllImpactByAssessmentRisk(assessmentRiskId).size();
        OrmImpactController.deleteImpacts(impactIds);
        System.assertEquals( OrmImpactController.findAllImpactByAssessmentRisk(assessmentRiskId).size(), size-1);
        System.debug('### end- '+methodName);
    }
}