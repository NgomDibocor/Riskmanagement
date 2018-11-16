/**
 * @author: David
 * @date: Creation: 15/11/2018
 * @description: class de teste de ormCauseController
 */
@isTest
public class OrmCauseController_Test {
     @testSetup
    static void setUp(){	
   		List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> risques = OrmAssessmentFactory.generateRisk(); 
   		List<orm_assessmentRisk__c> assessmentRisk= OrmAssessmentFactory.generateAssessmentRisk(assessments[0].Id ,risques[0].Id);
   		List<Macro> causes = OrmCauseFactory.generateMeasureProgress(assessmentRisk[0].Id);
    }
    /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test findAllCausesByAssessmentRisk
     */
    @isTest
    static void findAllCausesByAssessmentRisk_Test(){
        String methodName='findAllCausesByAssessmentRisk';
        System.debug('### start- '+methodName);
        Id assessmentRisk = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        System.assertEquals(OrmCauseController.findAllCausesByAssessmentRisk(assessmentRisk).size(), 20);
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
        Id assessmentRisk = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro cause = new Macro( Name= 'cause',orm_assessmentRisk__c = assessmentRisk,RecordTypeId = OrmCauseController.getCauseRecordTypeId());
        cause= OrmCauseController.add(cause);
        System.assertNotEquals(cause.Id, null);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test updateCauses
     */
    @isTest
    static void updateCauses_Test(){
        String methodName='updateCauses';
        System.debug('### start- '+methodName);
        Id assessmentRisk = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Macro cause = [SELECT Id FROM Macro where RecordTypeId =: OrmCauseController.getCauseRecordTypeId() limit 1];
        List<Macro> causes = new List<Macro>();
        			causes.add(cause);
        integer size = OrmCauseController.findAllCausesByAssessmentRisk(assessmentRisk).size();
        OrmCauseController.updateCauses(causes);
         System.assertEquals(OrmCauseController.findAllCausesByAssessmentRisk(assessmentRisk).size(), size);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAll
     */
    @isTest
    static void findAll_Test(){
        String methodName='getAllMeasures';
        System.debug('### start- '+methodName);
        System.assertEquals(OrmCauseController.findAll().size(), 20);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test deleteCauses
     */
    @isTest
    static void deleteCauses_Test(){
        String methodName='deleteCauses';
        System.debug('### start- '+methodName);
        Macro cause = [SELECT Id FROM Macro where RecordTypeId =: OrmCauseController.getCauseRecordTypeId() limit 1];
        List<String> causeIds = new List<String>();
        			causeIds.add(cause.Id);
        integer size = OrmCauseController.findAll().size();
        OrmCauseController.deleteCauses(causeIds);
        System.assertEquals( OrmCauseController.findAll().size(), size-1);
        /* test if measureIds is null*/
        List<String> causeIds2 = new List<String>();
                     causeIds2.add('abc');
        OrmCauseController.deleteCauses(causeIds2);
        System.assertEquals(OrmCauseController.findAll().size(), size-1);
        System.debug('### end- '+methodName);
    }
     
}