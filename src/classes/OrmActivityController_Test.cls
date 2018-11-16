/**
 * @author: David
 * @date: Creation: 16/11/2018
 * @description: class de teste de OrmActivityController
 */
@isTest
public with sharing class OrmActivityController_Test {
          @testSetup
    static void setUp(){	
    	List<Assessment__c> assessments = OrmAssessmentFactory.generateAssessment();  
   		List<Assessment__c> activities = OrmActivityFactory.generateActivities(assessments[0].Id);
   		List<Product2> activitiesProof = OrmActivityFactory.generateActivitiesProof(activities[0].Id);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findAllActivity
     */
    @isTest
    static void findAllActivity_test(){
        String methodName='findAllActivity';
        System.debug('### start- '+methodName);
        System.assertEquals(OrmActivityController.findAllActivity().size(), 20);
        System.debug('### end- '+methodName);
    }
              /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test findActivityByAssessment
     */
    @isTest
    static void findActivityByAssessment_test(){
        String methodName='findActivityByAssessment';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        System.assertEquals(OrmActivityController.findActivityByAssessment(assessmentId).size(), 20);
        System.debug('### end- '+methodName);
    }
      /**
     * @author: david
     * @date: Creation:  15/11/2018
     * @date: Modification:  15/11/2018
     * @description: methode de test findActivity
     */
    @isTest
    static void findActivity_Test(){
        String methodName='findActivity';
        System.debug('### start- '+methodName);
        Assessment__c activity = [SELECT Id FROM Assessment__c where RecordTypeId =: OrmActivityController.getActivityRecordTypeId() limit 1];
        System.assertEquals(OrmActivityController.findActivity(activity.Id).Id, activity.Id);
        System.debug('### end- '+methodName);
    }
      /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test saveActivity
     */
    @isTest
    static void saveActivity_Test(){
        String methodName='saveActivity';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Assessment__c activity = [SELECT Id FROM Assessment__c where orm_assessment__c =: assessmentId AND  RecordTypeId =:  OrmActivityController.getActivityRecordTypeId() limit 1];
        List<Assessment__c> activities = new List<Assessment__c>();
        			activities.add(activity);
        integer size =OrmActivityController.findActivityByAssessment(assessmentId).size();
        OrmActivityController.saveActivity(activities);
        System.assertEquals(OrmActivityController.findActivityByAssessment(assessmentId).size(), size);
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
        Assessment__c assessment = new Assessment__c();
        List<String> lstPick = OrmActivityController.getSelectOptions(assessment,'orm_activityStatus__c');
        System.assertNotEquals(lstPick.size(), 0);
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
        Assessment__c activity = new Assessment__c( Name= 'activity',orm_activityStatus__c='Planned',orm_assessment__c = assessmentId,RecordTypeId = OrmActivityController.getActivityRecordTypeId());
        activity= OrmActivityController.add(activity);
        System.assertNotEquals(activity.Id, null);
        System.debug('### end- '+methodName);
    }
          /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test updateActivity
     */
    @isTest
    static void updateActivity_Test(){
        String methodName='updateActivity';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Assessment__c activity = [SELECT Id FROM Assessment__c where orm_assessment__c =: assessmentId AND  RecordTypeId =:  OrmActivityController.getActivityRecordTypeId() limit 1];
        integer size =OrmActivityController.findActivityByAssessment(assessmentId).size();
        OrmActivityController.updateActivity(activity);
        System.assertEquals(OrmActivityController.findActivityByAssessment(assessmentId).size(), size);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test deleteRecordActivities
     */
    @isTest
    static void deleteRecordActivities_Test(){
        String methodName='deleteRecordActivities';
        System.debug('### start- '+methodName);
        Id assessmentId = [SELECT Id FROM Assessment__c limit 1].Id;
        Assessment__c activity = [SELECT Id FROM Assessment__c where orm_assessment__c =: assessmentId AND  RecordTypeId =:  OrmActivityController.getActivityRecordTypeId() limit 1];
        List<String> activityIds = new List<String>();
        			activityIds.add(activity.Id);
        integer size = OrmActivityController.findActivityByAssessment(assessmentId).size();
        OrmActivityController.deleteRecordActivities(activityIds);
        System.assertEquals( OrmActivityController.findActivityByAssessment(assessmentId).size(), size-1);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test addActivityProof
     */
    @isTest
    static void addActivityProof_Test(){
        String methodName='addActivityProof';
        System.debug('### start- '+methodName);
        Id activity = [SELECT Id FROM Assessment__c  where RecordTypeId =: OrmActivityController.getActivityRecordTypeId() limit 1].Id;
        Product2 activityProof = new Product2( Name= 'activity',orm_Activite__c = activity,RecordTypeId =  OrmActivityController.getActivityProofRecordTypeId());
        activityProof= OrmActivityController.addActivityProof(activityProof);
        System.assertNotEquals(activityProof.Id, null);
        System.debug('### end- '+methodName);
    }
              /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test getAllMeasuresProgressionByMeasure
     */
    @isTest
    static void getAllMeasuresProgressionByMeasure_test(){
        String methodName='getAllMeasuresProgressionByMeasure';
        System.debug('### start- '+methodName);
        Id activity = [SELECT Id FROM Assessment__c  where RecordTypeId =: OrmActivityController.getActivityRecordTypeId() limit 1].Id;
        System.assertEquals(OrmActivityController.getAllMeasuresProgressionByMeasure(activity).size(), 20);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test updateActiviteProof
     */
    @isTest
    static void updateActiviteProof_Test(){
        String methodName='updateActivity';
        System.debug('### start- '+methodName);
        Id activity = [SELECT Id FROM Assessment__c  where RecordTypeId =: OrmActivityController.getActivityRecordTypeId() limit 1].Id;
        Product2 activityProof = [SELECT Id FROM Product2 where orm_Activite__c =: activity AND  RecordTypeId =:  OrmActivityController.getActivityProofRecordTypeId() limit 1];
        List<Product2> activitiesProof = new List<Product2>();
        			activitiesProof.add(activityProof);
        integer size =OrmActivityController.getAllMeasuresProgressionByMeasure(activity).size();
        OrmActivityController.updateActiviteProof(activitiesProof);
        System.assertEquals(OrmActivityController.getAllMeasuresProgressionByMeasure(activity).size(), size);
        System.debug('### end- '+methodName);
    }
     /**
     * @author: david
     * @date: Creation:  16/11/2018
     * @date: Modification:  16/11/2018
     * @description: methode de test deleteRecordActivityProof
     */
    @isTest
    static void deleteRecordActivityProof_Test(){
        String methodName='deleteRecordActivityProof';
        System.debug('### start- '+methodName);
        Id activity = [SELECT Id FROM Assessment__c  where RecordTypeId =: OrmActivityController.getActivityRecordTypeId() limit 1].Id;
        Product2 activityProof = [SELECT Id FROM Product2 where orm_Activite__c =: activity AND  RecordTypeId =:  OrmActivityController.getActivityProofRecordTypeId() limit 1];
        List<String> activityProofIds = new List<String>();
        			activityProofIds.add(activityProof.Id);
        integer size = OrmActivityController.getAllMeasuresProgressionByMeasure(activity).size();
        OrmActivityController.deleteRecordActivityProof(activityProofIds);
        System.assertEquals( OrmActivityController.getAllMeasuresProgressionByMeasure(activity).size(), size-1);
        System.debug('### end- '+methodName);
    }
}