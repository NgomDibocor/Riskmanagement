/**
 * @author: David
 * @date: Creation: 16/11/2018
 * @description: class de teste de OrmRiskController
 */
@isTest
public with sharing class OrmRiskController_Test {
             @testSetup
    static void setUp(){	 
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> risques = OrmAssessmentFactory.generateRisk(); 
   		List<orm_assessmentRisk__c> assessmentRisk= OrmAssessmentFactory.generateAssessmentRisk(assessments[0].Id ,risques[0].Id);
  		List<Macro> probabilities = OrmSliderFactory.generateProbability(assessments[0].Id);
  		List<Macro> HsseImpacts = OrmSliderFactory.generateHsseImpacts(assessments[0].Id); 
  		List<Macro> BusinessImpacts = OrmSliderFactory.generateBusinessImpacts(assessments[0].Id);
  		List<Pricebook2> AssessmentRiskForTable = OrmAssessmentFactory.generateAssessmentRiskForTable(assessmentRisk[0].Id);
    }
                  /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAllAssessmentRisk
     */
    @isTest
    static void findAllAssessmentRisk_test(){
        String methodName='findAllAssessmentRisk';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmRiskController.findAllAssessmentRisk(assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
    
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAllAssessmentRiskCategory
     */
    @isTest
    static void findAllAssessmentRiskCategory_test(){
        String methodName='findAllAssessmentRiskCategory';
        System.debug('### start- '+methodName);
        string item = 'All';
        String item2='Budget Risk' ;
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmRiskController.findAllAssessmentRiskCategory(item,assessmentId).size(), 20);
        System.assertEquals(OrmRiskController.findAllAssessmentRiskCategory(item2,assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
      /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAllResearchPicklist
     */
    @isTest
    static void findAllResearchPicklist_test(){
        String methodName='findAllResearchPicklist';
        System.debug('### start- '+methodName);
        String item2='Budget Risk' ;
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmRiskController.findAllResearchPicklist(item2,assessmentId).size(), 20);
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
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Macro risque = new Macro( Name= 'risques',orm_categorieRisk__c='Budget Risk',orm_assessment__c = assessmentId,RecordTypeId = OrmRiskController.getRiskRecordTypeId());
        risque= OrmRiskController.add(risque);
        System.assertNotEquals(risque.Id, null);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test addAssessmentRisk
     */
    @isTest
    static void addAssessmentRisk_Test(){
        String methodName='addAssessmentRisk';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Id risque = [SELECT Id FROM Macro where RecordTypeId =: OrmRiskController.getRiskRecordTypeId() limit 1].Id;
        orm_assessmentRisk__c assessmentRisk = new orm_assessmentRisk__c(orm_assessment__c=assessmentId,orm_Risk__c = risque);
        assessmentRisk= OrmRiskController.addAssessmentRisk(assessmentRisk);
        System.assertNotEquals(assessmentRisk.Id, null);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test deleteAssessmentRisks
     */
    @isTest
    static void deleteAssessmentRisks_Test(){
        String methodName='deleteAssessmentRisks';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        orm_assessmentRisk__c assessmentRisk = [SELECT Id FROM orm_assessmentRisk__c where orm_assessment__c=:assessmentId  limit 1];
        List<orm_assessmentRisk__c> assessmentRiskIds = new List<orm_assessmentRisk__c>();
        			assessmentRiskIds.add(assessmentRisk);
        integer size = OrmRiskController.findAllAssessmentRisk(assessmentId).size();
        OrmRiskController.deleteAssessmentRisks(assessmentRiskIds);
        System.assertEquals(OrmRiskController.findAllAssessmentRisk(assessmentId).size(), size-1);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test addAssessmentRisks
     */
    @isTest
    static void addAssessmentRisks_Test(){
        String methodName='addAssessmentRisks';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Id risque = [SELECT Id FROM Macro where RecordTypeId =: OrmRiskController.getRiskRecordTypeId() limit 1].Id;
        orm_assessmentRisk__c assessmentRisk = new orm_assessmentRisk__c( orm_Risk__c = risque ,orm_assessment__c = assessmentId);
        List<orm_assessmentRisk__c> assessmentRiskIds = new List<orm_assessmentRisk__c>();
        			assessmentRiskIds.add(assessmentRisk);
        integer size = OrmRiskController.findAllAssessmentRisk(assessmentId).size();
        OrmRiskController.addAssessmentRisks(assessmentRiskIds);
        System.assertEquals(OrmRiskController.findAllAssessmentRisk(assessmentId).size(), size+1);
        System.debug('### end- '+methodName);
    }
      /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test getSelectOptions
     */
    @isTest
    static void getSelectOptions_Test(){
        String methodName='getSelectOptions';
        System.debug('### start- '+methodName);
        Macro risque = new Macro();
        List<String> lstPick = OrmRiskController.getSelectOptions(risque,'orm_categorieRisk__c');
        System.assertNotEquals(lstPick.size(), 0);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test assessmentRiskId
     */
    @isTest
    static void assessmentRiskId_Test(){
        String methodName='assessmentRiskId';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c where orm_assessment__c=:assessmentId  limit 1].Id;
        OrmRiskController.findAssessmentRisk(assessmentRiskId);
        System.debug('### end- '+methodName);
    }
	 /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  1ç/11/2018
     * @description: methode de test getUsers
     */
    @isTest
    static void getUsers_Test(){
        String methodName='getAssessment';
        System.debug('### start- '+methodName);
        System.assertNotEquals(OrmRiskController.getUsers().size(), 0);
        System.debug('### end- '+methodName);
    }
	    /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:19/11/2018
     * @description: methode de test getAssessment
     */
    @isTest
    static void getAssessment_Test(){
        String methodName='getAssessment';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        OrmRiskController.getAssessment(assessmentId);
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
        System.assertEquals(OrmRiskController.findAllProbabilitiesByAssessment(assessmentId).size(), 20);
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
        String item2='Budget Risk' ;
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmRiskController.findHsseImpactsByAssessment(assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test findBusinessImpactsByAssessment
     */
    @isTest
    static void findBusinessImpactsByAssessment_test(){
        String methodName='findBusinessImpactsByAssessment';
        System.debug('### start- '+methodName);
        String item2='Budget Risk' ;
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmRiskController.findBusinessImpactsByAssessment(assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
        /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test getAssessmentRisks
     */
    @isTest
    static void getAssessmentRisks_Test(){
        String methodName='getAssessmentRisks';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Id assessmentRisk = [SELECT Id FROM orm_assessmentRisk__c where orm_assessment__c=:assessmentId  limit 1].Id;
        List<String> assessmentRiskIds = new List<String>();
        			assessmentRiskIds.add(assessmentRisk);
        integer size = OrmRiskController.findAllAssessmentRisk(assessmentId).size();
        OrmRiskController.getAssessmentRisks(assessmentRiskIds);
        System.assertEquals(OrmRiskController.findAllAssessmentRisk(assessmentId).size(), size);
        System.debug('### end- '+methodName);
    }
         /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test getInfosAssessmentRiskForMatriceTable
     */
    @isTest
    static void getInfosAssessmentRiskForMatriceTable_test(){
        String methodName='getInfosAssessmentRiskForMatriceTable';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Id assessmentRisk2 = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertNotEquals(OrmRiskController.getInfosAssessmentRiskForMatriceTable(assessmentRiskId), null);
        System.assertEquals(OrmRiskController.getInfosAssessmentRiskForMatriceTable(assessmentRisk2), null);
        System.debug('### end- '+methodName);
    }
             /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test allInfosAssessmentRiskForMatriceTable
     */
    @isTest
    static void allInfosAssessmentRiskForMatriceTable_test(){
        String methodName='allInfosAssessmentRiskForMatriceTable';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        System.assertNotEquals(OrmRiskController.allInfosAssessmentRiskForMatriceTable(assessmentRiskId), null);
        System.debug('### end- '+methodName);
    }
         /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test addInfosAssessmentRiskForMatriceTable
     */
    @isTest
    static void addInfosAssessmentRiskForMatriceTable_Test(){
        String methodName='addInfosAssessmentRiskForMatriceTable';
        System.debug('### start- '+methodName);
        Id assessmentRiskId = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Pricebook2 assessmentRisk = new Pricebook2(Name = 'priceBook' ,orm_assessmentRisk__c = assessmentRiskId);
        integer size = OrmRiskController.allInfosAssessmentRiskForMatriceTable(assessmentId).size();
        OrmRiskController.addInfosAssessmentRiskForMatriceTable(assessmentRisk);
        System.assertEquals(OrmRiskController.allInfosAssessmentRiskForMatriceTable(assessmentId).size(), size+1);
        System.debug('### end- '+methodName);
    }
                 /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test findAll
     */
    @isTest
    static void findAll_Test(){
        String methodName='findAll';
        System.debug('### start- '+methodName);
        String item = 'Budget Risk';
        System.assertNotEquals(OrmRiskController.findAll(item), null);
        System.debug('### end- '+methodName);
    }
}