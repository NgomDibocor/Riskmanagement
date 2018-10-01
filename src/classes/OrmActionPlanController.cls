public with sharing class OrmActionPlanController {
    public static Id getAssessmentRiskRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.orm_assessmentRisk__c.getRecordTypeInfosByName()
                  .get('orm RT asssessmentRisk').getRecordTypeId();
        return recordTypeId;
    }
    
    public static Id getCauseRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT cause').getRecordTypeId();
        return RecordTypeId;
    }
    
    public static Id getImpactRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT impact').getRecordTypeId();
        return RecordTypeId;
    }
    public static Id getMeasureRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Measure').getRecordTypeId();
        return RecordTypeId;
    }
     /**
	 *
	 * @author David Diop
	 * @version 1.0
	 * @description  this method returns all assessmentRisks of user connected
	 * @history 
	 * 2018-07-20 : David Diop - Implementation
	 */
    @AuraEnabled 
    public static List<List<String>> getAllMeasure( String idAssessment)
    {
       List<orm_assessmentRisk__c> assRiskList = [Select id,orm_assessment__r.Id,orm_Risk__r.Name,
                       (SELECT id,Name, orm_description__c,orm_AssessmentRisk__r.orm_assessment__c,orm_endDate__c,
     			        orm_measure_Status__c,orm_Cost_Effect__c,orm_measureCategorie__c,orm_justification_Cost_Effect__c,
     			        orm_measureResponsable__c, orm_measureResponsable__r.Name,orm_organisation__r.Name 
                        FROM Assessments__r 
                        WHERE RecordTypeId =: OrmActionPlanController.getMeasureRecordTypeId())
                        FROM orm_assessmentRisk__c  WHERE orm_assessment__r.Id =:idAssessment];
                        
            List<List<String>> assessmentList = new List<List<String>>();
         for (orm_assessmentRisk__c assRisk: assRiskList){
            List<String> info = new List<String>();
               info.add(assRisk.id);
               info.add(assRisk.orm_Risk__r.Name);
               assessmentList.add(info);
            }
                        
      return assessmentList;
    }
}