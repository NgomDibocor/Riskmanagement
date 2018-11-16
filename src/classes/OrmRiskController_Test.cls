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
}