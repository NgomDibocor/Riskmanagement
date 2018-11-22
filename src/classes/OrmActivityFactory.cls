public with sharing class OrmActivityFactory {
   /**
   * @author : David
   * @date : 16/11/2018
   * @description :generate   list of activities
   */
    public static List<Assessment__c> generateActivities(String  idAssessment ){
        List<Assessment__c> activities = new List<Assessment__c>();
        for(Integer i=0;i<20; i++){
            activities.add(new Assessment__c( Name= 'impact'+i,orm_activityStatus__c='Planned',orm_assessment__c = idAssessment,RecordTypeId = OrmActivityController.getActivityRecordTypeId()));
        } 
        insert activities;
        return activities;
    }
   /**
   * @author : David
   * @date : 16/11/2018
   * @description :generate   list of activitiesProof
   */
    public static List<Product2> generateActivitiesProof(String  idActivity ){
        List<Product2> activitiesProof = new List<Product2>();
        for(Integer i=0;i<20; i++){
            activitiesProof.add(new Product2( Name= 'activitiesProof'+i,orm_Activite__c = idActivity,RecordTypeId = OrmActivityController.getActivityProofRecordTypeId()));
        } 
        insert activitiesProof;
        return activitiesProof;
    }
}