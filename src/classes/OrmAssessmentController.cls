public class OrmAssessmentController {
	
    public static Id getAssessmentRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Assessment').getRecordTypeId();
        return recordTypeId;
    }
    public static Id getOrganisationRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Organisation').getRecordTypeId();
        return recordTypeId;
    }
    public static Id getProjetRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Projet').getRecordTypeId();
        return recordTypeId;
    }
    public static Id getProcessusRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Processus').getRecordTypeId();
        return recordTypeId;
    }
    
    @AuraEnabled
	public static Assessment__c add(Assessment__c item){
        if( item.orm_typeAssessment__c == 'Organisation'){
            item.RecordTypeId=OrmAssessmentController.getOrganisationRecordTypeId();
        }
        if( item.orm_typeAssessment__c == 'Projet'){
            item.RecordTypeId=OrmAssessmentController.getProjetRecordTypeId();
        }
        if( item.orm_typeAssessment__c == 'Processus'){
            item.RecordTypeId=OrmAssessmentController.getProcessusRecordTypeId();
        }
		upsert item;
		return item;
	}
    
    @AuraEnabled 
    public static List<Assessment__c> findAll(){
        List<Assessment__c> assessments = new List<Assessment__c>();
        assessments = [Select Id, Name, orm_description__c From Assessment__c];
        //where RecordTypeId=: OrmAssessmentController.getAssessmentRecordTypeId() 
                    //order by Name desc LIMIT 8 
        return assessments;
    }
    
    @AuraEnabled
	public static List <String> getSelectOptions(sObject objObject, string fld) {
      List <String> allOpts = new list <String> ();
      // Get the object type of the SObject.
      Schema.sObjectType objType = objObject.getSObjectType();
     
      // Describe the SObject using its object type.
      Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
     
      // Get a map of fields for the SObject
      map <String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
     
      // Get the list of picklist values for this field.
      list <Schema.PicklistEntry> values =
       fieldMap.get(fld).getDescribe().getPickListValues();
     
      // Add these values to the selectoption list.
      for (Schema.PicklistEntry a: values) {
       allOpts.add(a.getValue());
      }
      system.debug('allOpts ---->' + allOpts);
      allOpts.sort();
      return allOpts;
 	}
    
    @AuraEnabled 
    public static List<Account> getOrganisations(){
        return OrmOrganisationController.getOrganisations();
    }
    
    @AuraEnabled
    public static List<Assessment__c> findAllActiviteByAssessment(string idAssessment){
        /*List<Assessment__c> activities = new List<Assessment__c>();
        activities = [Select Id, Name,StartDate,
                       EndDate,Status,orm_user__c, Description,
                       orm_assessment__c,orm_assessment__r.Name
                       From Assessment__c 
                       where RecordTypeId=:OrmActivityController.getActivityRecordTypeId() AND
                       orm_assessment__c=: idAssessment
                    order by Name];
        return activities;*/ 
        return OrmActivityController.findAllActivity();
    }
    
    @AuraEnabled
    public static Assessment__c getSingleAssessment(){
        return [SELECT Id FROM Assessment__c
                       WHERE RecordTypeId=:OrmAssessmentController.getAssessmentRecordTypeId() LIMIT 1];
    }   
    
}