/**
 * @author: David
 * @date: Creation: 14/11/2018
 * @description: class de teste de assessment
 */
@isTest
public class OrmAssessmentController_test {
     @testSetup
    static void setUp(){
   		List<Account> organisations = OrmAssessmentFactory.generateOrganisation(); 
   		List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment(); 
   		List<Assessment__c> activities= OrmAssessmentFactory.generateActivity(assessments[0].Id); 
   		List<Macro> risques = OrmAssessmentFactory.generateRisk(); 
   		List<orm_assessmentRisk__c> assessmentRisk= OrmAssessmentFactory.generateAssessmentRisk(assessments[0].Id ,risques[0].Id);
   		List<Assessment__c> measures = OrmMeasureFactory.generateMeasure(assessmentRisk[0].Id);  
   		
    }
    
     /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test add
     */
    @isTest
    static void add_Test(){
        String methodName='add';
        System.debug('### start- '+methodName);
        Assessment__c assessment = new Assessment__c(Name= 'assessmentOrg', orm_typeAssessment__c= 'Organisation',RecordTypeId = OrmAssessmentController.getOrganisationRecordTypeId());
        assessment = OrmAssessmentController.add(assessment);
        System.assertNotEquals(assessment.Id, null);
        
         Assessment__c assessmentProject = new Assessment__c(Name= 'assessmentProject', orm_typeAssessment__c= 'Project', RecordTypeId = OrmAssessmentController.getProjetRecordTypeId());
        assessmentProject = OrmAssessmentController.add(assessmentProject);
        System.assertNotEquals(assessmentProject.Id, null);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test getSelectOptions
     */
    @isTest
    static void getSelectOptions_Test(){
        String methodName='getSelectOptions';
        System.debug('### start- '+methodName);
        Assessment__c assessment = new Assessment__c();
        List<String> lstPick = OrmAssessmentController.getSelectOptions(assessment,'orm_typeProjet__c');
        System.assertNotEquals(lstPick.size(), 0);
        System.debug('### end- '+methodName);
    }
      /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test getOrganisations
     */
    @isTest
    static void getOrganisations_Test(){
        String methodName='getOrganisations';
        System.debug('### start- '+methodName);
        System.assertEquals(OrmAssessmentController.getOrganisations().size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test findAllActiviteByAssessment
     */
    @isTest
    static void findAllActiviteByAssessment_Test(){
        String methodName='findAllActiviteByAssessment';
        System.debug('### start- '+methodName);
        Assessment__c assessment = [SELECT Id FROM Assessment__c limit 1];
        System.assertEquals(OrmAssessmentController.findAllActiviteByAssessment(assessment.Id).size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test getAssessment
     */
    @isTest
    static void getAssessment_Test(){
        String methodName='getAssessment';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Assessment__c assessment = OrmAssessmentController.getAssessment(assessmentId);
        System.assertNotEquals(assessment.Id, null);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test getUsers
     */
    @isTest
    static void getUsers_Test(){
        String methodName='getAssessment';
        System.debug('### start- '+methodName);
        System.assertNotEquals(OrmAssessmentController.getUsers().size(), 0);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test getUsers
     */
    @isTest
    static void getIdFirstAssessmentRisk_Test(){
        String methodName='getIdFirstAssessmentRisk';
        System.debug('### start- '+methodName);
        Id idAssessment = [SELECT Id FROM Assessment__c limit 1].Id;
        String assessmentRisk = OrmAssessmentController.getIdFirstAssessmentRisk(idAssessment);
        System.assertNotEquals(assessmentRisk, null);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test getUsers
     */
    @isTest
    static void ifListNotEmptyGetIdFirstAssessmentRisk_Test(){
        String methodName='ifListNotEmptyGetIdFirstAssessmentRisk';
        System.debug('### start- '+methodName);
        Id idAssessment = [SELECT Id FROM Assessment__c limit 1].Id;
        Id idAssessment2 = null;
        String assessmentRisk = OrmAssessmentController.ifListNotEmptyGetIdFirstAssessmentRisk(idAssessment);
         String assessmentRisk2 = OrmAssessmentController.ifListNotEmptyGetIdFirstAssessmentRisk(idAssessment2);
        System.assertNotEquals(assessmentRisk, null);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test ifListNotEmptyGetIdFirstMeasure
     */
    @isTest
    static void ifListNotEmptyGetIdFirstMeasure_Test(){
        String methodName='ifListNotEmptyGetIdFirstMeasure';
        System.debug('### start- '+methodName);
        Id assessmentRisk = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        String measure = OrmAssessmentController.ifListNotEmptyGetIdFirstMeasure(assessmentRisk);
        System.assertNotEquals(measure, null);
        System.debug('### end- '+methodName);
    }
}