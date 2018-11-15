/**
 * @author: David
 * @date: Creation: 15/11/2018
 * @description: class de teste de OrmMeasureController
 */
@isTest
public  class OrmMeasureController_test {
     @testSetup
    static void setUp(){	
   		List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Macro> risques = OrmAssessmentFactory.generateRisk(); 
   		List<orm_assessmentRisk__c> assessmentRisk= OrmAssessmentFactory.generateAssessmentRisk(assessments[0].Id ,risques[0].Id);
   		List<Assessment__c> measures = OrmMeasureFactory.generateMeasure(assessmentRisk[0].Id);  
   		List<Product2> measuresProgress = OrmMeasureFactory.generateMeasureProgress(measures[0].Id); 
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getAllMeasuresByAssessmentRisk
     */
    @isTest
    static void getAllMeasuresByAssessmentRisk_Test(){
        String methodName='getAllMeasuresByAssessmentRisk';
        System.debug('### start- '+methodName);
        Id assessmentRisk = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        System.assertEquals(OrmMeasureController.getAllMeasuresByAssessmentRisk(assessmentRisk).size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getMeasuresByAssessmentRisk
     */
    @isTest
    static void getMeasuresByAssessmentRisk_Test(){
        String methodName='getMeasuresByAssessmentRisk';
        System.debug('### start- '+methodName);
        Id measureId = [SELECT Id FROM Assessment__c where RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId() limit 1].Id;
        System.assertNotEquals(OrmMeasureController.getMeasuresByAssessmentRisk(measureId), NULL);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getMeasuresByAssessmentRisk
     */
    @isTest
    static void add_Test(){
        String methodName='add';
        System.debug('### start- '+methodName);
        Id assessmentRisk = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Assessment__c measure = new Assessment__c(Name= 'measure1', orm_measureCategorie__c= 'Corrective',orm_assessmentRisk__c = assessmentRisk , RecordTypeId = OrmMeasureController.getMeasureRecordTypeId());
        measure= OrmMeasureController.add(measure);
        System.assertNotEquals(measure.Id, null);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test updateMeasure
     */
    @isTest
    static void updateMeasure_Test(){
        String methodName='updateMeasure';
        System.debug('### start- '+methodName);
        Assessment__c measure = [SELECT Id FROM Assessment__c where RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId() limit 1];
        measure= OrmMeasureController.updateMeasure(measure);
        System.assertNotEquals(measure.Id, null);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getAllMeasures
     */
    @isTest
    static void getAllMeasures_Test(){
        String methodName='getAllMeasures';
        System.debug('### start- '+methodName);
        System.assertEquals(OrmMeasureController.getAllMeasures().size(), 20);
        System.debug('### end- '+methodName);
    }
    
         /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getAssessment
     */
    @isTest
    static void getOrganisations_Test(){
        String methodName='getAssessment';
        System.debug('### start- '+methodName);
        Assessment__c assessment = [SELECT Id FROM Assessment__c limit 1];
        System.assertEquals(OrmMeasureController.getAssessment(assessment.Id).Id, assessment.Id);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getUsers
     */
    @isTest
    static void getUsers_Test(){
        String methodName='getAssessment';
        System.debug('### start- '+methodName);
        System.assertNotEquals(OrmMeasureController.getUsers().size(), 0);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getMeasure
     */
    @isTest
    static void getMeasure_Test(){
        String methodName='getAllMeasures';
        System.debug('### start- '+methodName);
        Assessment__c measure = [SELECT Id FROM Assessment__c where RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId() limit 1];
        System.assertEquals(OrmMeasureController.getMeasure(measure.Id).Id, measure.Id);
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
        List<String> lstPick = OrmMeasureController.getSelectOptions(assessment,'orm_measureCategorie__c');
        System.assertNotEquals(lstPick.size(), 0);
        System.debug('### end- '+methodName);
    }
    /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test deleteMeasures
     */
    @isTest
    static void deleteMeasures_Test(){
        String methodName='deleteMeasures';
        System.debug('### start- '+methodName);
        Assessment__c measure = [SELECT Id FROM Assessment__c where RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId() limit 1];
        List<String> measureIds = new List<String>();
        			measureIds.add(measure.Id);
        integer size = OrmMeasureController.getAllMeasures().size();
        OrmMeasureController.deleteMeasures(measureIds);
        System.assertEquals(OrmMeasureController.getAllMeasures().size(), size-1);
        /* test if measureIds is null*/
        List<String> measureIds2 = new List<String>();
                     measureIds2.add('abc');
        OrmMeasureController.deleteMeasures(measureIds2);
        System.assertEquals(OrmMeasureController.getAllMeasures().size(), size-1);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getAllMeasuresProgressionByMeasure
     */
    @isTest
    static void getAllMeasuresProgressionByMeasure_Test(){
        String methodName='getMeasuresProgression';
        System.debug('### start- '+methodName);
         Assessment__c measure = [SELECT Id FROM Assessment__c where RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId() limit 1];
        System.assertEquals(OrmMeasureController.getAllMeasuresProgressionByMeasure(measure.Id).size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test getMeasuresProgression
     */
    @isTest
    static void getMeasuresProgression_Test(){
        String methodName='getAllMeasuresProgressionByMeasure';
        System.debug('### start- '+methodName);
        Product2 measureProgress = [SELECT Id FROM Product2 where RecordTypeId =: OrmMeasureController.getMeasureProgressionRecordTypeId() limit 1];
        System.assertEquals(OrmMeasureController.getMeasuresProgression(measureProgress.Id).Id, measureProgress.Id);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test addMeasureProgression
     */
    @isTest
    static void addMeasureProgression_Test(){
        String methodName='addMeasureProgression';
        System.debug('### start- '+methodName);
        Id measureId = [SELECT Id FROM Assessment__c limit 1].Id;
        Product2 measureProgress = new Product2(Name= 'measureProgress',Family ='draft', orm_measures__c = measureId,RecordTypeId = OrmMeasureController.getMeasureProgressionRecordTypeId());
        measureProgress= OrmMeasureController.addMeasureProgression(measureProgress);
        System.assertNotEquals(measureProgress.Id, null);
        System.debug('### end- '+methodName);
    }
      /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test updateMeasureProgression
     */
    @isTest
    static void updateMeasureProgression_Test(){
        String methodName='updateMeasureProgression';
        System.debug('### start- '+methodName);
        Product2 measureProgress = [SELECT Id FROM Product2 where RecordTypeId =: OrmMeasureController.getMeasureProgressionRecordTypeId() limit 1];
        measureProgress= OrmMeasureController.updateMeasureProgression(measureProgress);
        System.assertNotEquals(measureProgress.Id, null);
        System.debug('### end- '+methodName);
    }
       /**
     * @author: david
     * @date: Creation:  14/11/2018
     * @date: Modification:  14/11/2018
     * @description: methode de test ifListNotEmptyGetIdFirstMeasure
     */
    @isTest
    static void ifListNotEmptyGetIdFirstMeasure_Test(){
        String methodName='ifListNotEmptyGetIdFirstAssessmentRisk';
        System.debug('### start- '+methodName);
        Id idAssessmentRisk = [SELECT Id FROM orm_assessmentRisk__c limit 1].Id;
        Id idAssessmentRisk2 = null;
         String measure = OrmMeasureController.ifListNotEmptyGetIdFirstMeasure(idAssessmentRisk);
         String measure2 = OrmMeasureController.ifListNotEmptyGetIdFirstMeasure(idAssessmentRisk2);
        System.assertNotEquals(measure, null);
        System.debug('### end- '+methodName);
    }
}