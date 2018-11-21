/**
 * @author: David
 * @date: Creation: 14/11/2018
 * @description: class de teste de assessment
 */
@isTest
public with sharing class OrmAssessmentRiskController_Test {
    @testSetup
    static void setUp(){ 
   		List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment(); 
   		List<Macro> risques = OrmAssessmentFactory.generateRisk(); 
   		List<orm_assessmentRisk__c> assessmentRisk= OrmAssessmentFactory.generateAssessmentRisk(assessments[0].Id ,risques[0].Id); 
   		List<Assessment__c> measures = OrmMeasureFactory.generateMeasure(assessmentRisk[0].Id); 
   		List<Macro> causes = OrmCauseFactory.generateMeasureProgress(assessmentRisk[0].Id); 
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
        System.assertEquals(OrmAssessmentRiskController.findAll().size(), 20);
        System.debug('### end- '+methodName);
    }
         /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test getAssessment
     */
    @isTest
    static void getAssessment_Test(){
        String methodName='getAssessment';
        System.debug('### start- '+methodName);
        Assessment__c assessment = [SELECT Id FROM Assessment__c limit 1];
        System.assertNotEquals(OrmAssessmentRiskController.getAssessment(assessment.Id),Null);
        System.debug('### end- '+methodName);
    }
         /**
     * @author: david
     * @date: Creation:  19/11/2018
     * @date: Modification:  19/11/2018
     * @description: methode de test add
     */
    @isTest
    static void add_Test(){
        String methodName='add';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Id risque = [SELECT Id FROM Macro where RecordTypeId =: OrmRiskController.getRiskRecordTypeId() limit 1].Id;
        orm_assessmentRisk__c assessmentRisk = new orm_assessmentRisk__c(orm_assessment__c=assessmentId,orm_Risk__c = risque);
        assessmentRisk= OrmAssessmentRiskController.add(assessmentRisk);
        System.assertNotEquals(assessmentRisk.Id, null);
        System.debug('### end- '+methodName);
    }
             /**
     * @author: david
     * @date: Creation:  21/11/2018
     * @date: Modification:  21/11/2018
     * @description: methode de test getAllAssessmentRisks
     */
    @isTest
    static void getAllAssessmentRisks_Test(){
        String methodName='getAllAssessmentRisks';
        System.debug('### start- '+methodName);
      List<orm_assessmentRisk__c> assRiskList = [Select id, orm_Risk__r.Name, orm_Risk__r.Description,orm_assessment__r.Id,orm_assessment__r.Name,
                       (SELECT id 
                        FROM Macros__r 
                        WHERE RecordTypeId =: OrmAssessmentRiskController.getCauseRecordTypeId()),
                       (SELECT id FROM Assessments__r 
                        WHERE RecordTypeId =: OrmAssessmentRiskController.getMeasureRecordTypeId())
                        FROM orm_assessmentRisk__c  WHERE CreatedById = :UserInfo.getUserId()];
                        List<List<String>> listAssRisk = new List<List<String>>();
                        System.assertNotEquals(OrmAssessmentRiskController.getAllAssessmentRisks(), null);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  21/11/2018
     * @date: Modification:  21/11/2018
     * @description: methode de test getAssessmentRisks
     */
    @isTest
    static void getAssessmentRisks_Test(){
        String methodName='getAssessmentRisks';
        System.debug('### start- '+methodName);   
        System.assertEquals(OrmAssessmentRiskController.getAssessmentRisks().isEmpty(), false);
        System.debug('### end- '+methodName);
    }
}