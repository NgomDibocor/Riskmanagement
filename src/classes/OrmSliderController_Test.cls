/**
 * @author: David
 * @date: Creation: 19/11/2018
 * @description: class de teste de OrmSliderController
 */
@isTest
public with sharing class OrmSliderController_Test {
       @testSetup
    static void setUp(){	 
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> probabilities = OrmSliderFactory.generateProbability(assessments[0].Id); 
   		List<Macro> HsseImpacts = OrmSliderFactory.generateHsseImpacts(assessments[0].Id); 
   		List<Macro> BusinessImpacts = OrmSliderFactory.generateBusinessImpacts(assessments[0].Id);
    }
         /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test addProbabilities
     */
    @isTest
    static void addProbabilities_Test(){
        String methodName='addProbabilities';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro probability = new Macro( Name='probality',orm_probability__c='rare',orm_pourcentageMin__c= 10 ,orm_pourcentageMax__c= 25,orm_assessment__c =assessmentId,RecordTypeId = OrmSliderController.getProbabilityRecordTypeId());
        List<Macro> probabilityIds = new List<Macro>();
        			probabilityIds.add(probability);
        integer size = OrmSliderController.findAllProbabilitiesByAssessment(assessmentId).size();
        OrmSliderController.addProbabilities(probabilityIds);
        System.assertEquals( OrmSliderController.findAllProbabilitiesByAssessment(assessmentId).size(), size+1);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test findAllProbabilitiesByAssessment
     */
    @isTest
    static void findAllProbabilitiesByAssessment_test(){
        String methodName='findAllProbabilitiesByAssessment';
        System.debug('### start- '+methodName);
        String item2='Budget Risk' ;
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmSliderController.findAllProbabilitiesByAssessment(assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test deletePreviousProbalities
     */
    @isTest
    static void deletePreviousProbalities_Test(){
        String methodName='deletePreviousProbalities';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro probability = [SELECT Id FROM Macro where orm_assessment__c =:assessmentId AND RecordTypeId =: OrmSliderController.getProbabilityRecordTypeId() limit 1];
        List<Macro> probabilityIds = new List<Macro>();
        			probabilityIds.add(probability);
        integer size = OrmSliderController.findAllProbabilitiesByAssessment(assessmentId).size();
        OrmSliderController.deletePreviousProbalities(assessmentId);
        System.assertEquals( OrmSliderController.findAllProbabilitiesByAssessment(assessmentId).size(), 0);
        System.debug('### end- '+methodName);
    }
             /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test addHsseImpacts
     */
    @isTest
    static void addHsseImpacts_Test(){
        String methodName='addHsseImpacts';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro hsseImpacts = new Macro( Name='HsseImpacts',orm_rating__c='low',orm_healthAndSafety__c= 'healthAndSafety' ,orm_security__c='security',orm_environmentAndCommunity__c='environmentAndCommunity',orm_assessment__c =assessmentId,RecordTypeId = OrmSliderController.getHsseImpactRecordTypeId() );
        List<Macro> hsseImpactsIds = new List<Macro>();
        			hsseImpactsIds.add(hsseImpacts);
        integer size = OrmSliderController.findHsseImpactsByAssessment(assessmentId).size();
        OrmSliderController.addHsseImpacts(hsseImpactsIds);
        System.assertEquals( OrmSliderController.findHsseImpactsByAssessment(assessmentId).size(), size+1);
        System.debug('### end- '+methodName);
    }
      /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test findHsseImpactsByAssessment
     */
    @isTest
    static void findHsseImpactsByAssessment_test(){
        String methodName='findHsseImpactsByAssessment';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmSliderController.findHsseImpactsByAssessment(assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
      /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test addBusinessImpacts
     */
    @isTest
    static void addBusinessImpacts_Test(){
        String methodName='addBusinessImpacts';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro BusinessImpacts = new Macro(Name='BusinessImpacts',orm_rating__c='low',orm_costProjectBudgetMin__c = 5 ,orm_costProjectBudgetMax__c = 10,orm_scheduleProjectBaselineMin__c = 15,orm_scheduleProjectBaselineMax__c = 30 ,orm_productionLossMin__c = 31 ,orm_productionLossMax__c= 50 ,orm_reputation__c='reputation',orm_assessment__c =assessmentId,RecordTypeId = OrmSliderController.getBusinessImpactRecordTypeId());
        List<Macro> BusinessImpactsIds = new List<Macro>();
        			BusinessImpactsIds.add(BusinessImpacts);
        integer size = OrmSliderController.findBusinessImpactsByAssessment(assessmentId).size();
        OrmSliderController.addBusinessImpacts(BusinessImpactsIds);
        System.assertEquals( OrmSliderController.findBusinessImpactsByAssessment(assessmentId).size(), size+1);
        System.debug('### end- '+methodName);
    }

     /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test findListBusinessImpacts2ByAssessment
     */
    @isTest
    static void findListBusinessImpacts2ByAssessment_test(){
        String methodName='findListBusinessImpacts2ByAssessment';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmSliderController.findListBusinessImpacts2ByAssessment(assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
}