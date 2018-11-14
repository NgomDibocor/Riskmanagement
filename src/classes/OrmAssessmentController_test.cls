/**
 * @author: David
 * @date: Creation: 14/11/2018
 * @description: class de teste de assessment
 */
@isTest
public class OrmAssessmentController_test {
     @testSetup
    static void setUp(){
   		List<Account> organisations = Orm_TestFactory.generateOrganisation(); 
   		List<Assessment__c> assessments = Orm_TestFactory.generateAssessment(); 
   		List<Assessment__c> activities= Orm_TestFactory.generateActivity(assessments[0].Id); 
   		
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
        Assessment__c assessment = new Assessment__c(Name= 'assessmentOrg', orm_typeAssessment__c= 'Organisation');
        assessment = OrmAssessmentController.add(assessment);
        System.assertNotEquals(assessment.Id, null);
        
         Assessment__c assessmentProject = new Assessment__c(Name= 'assessmentProject', orm_typeAssessment__c= 'Project');
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
}