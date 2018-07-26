public class OrmActivityController {
	
    public static Id getActivityRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Activity').getRecordTypeId();
        return RecordTypeId;
    }
    
    @AuraEnabled 
    public static List<Assessment__c> findAllActivity(){
        List<Assessment__c> allActivity = new List<Assessment__c>();
        allActivity = [Select Id, Name, orm_startDate__c, orm_endDate__c, orm_activityStatus__c
                    From Assessment__c where RecordTypeId=:OrmActivityController.getActivityRecordTypeId() 
                    order by Name];
        return allActivity;
    }      
    @AuraEnabled 
    public static List<Assessment__c> findActivityByAssessment(String assessment){
        List<Assessment__c> activities = new List<Assessment__c>();
        activities = [Select Id, Name, orm_startDate__c, orm_endDate__c, orm_activityStatus__c, orm_user__c,
                       orm_user__r.Name, orm_description__c, orm_assessment__c,orm_assessment__r.Name
                    From Assessment__c 
                    where orm_assessment__c=:assessment and  RecordTypeId=:OrmActivityController.getActivityRecordTypeId()
                    order by Name];
        return activities;
    }
     // method for update records after inline editing  
    @AuraEnabled
    public static List <Assessment__c> saveActivity(List<Assessment__c> lstActivity) {
        update lstActivity;
        return lstActivity;
    }
   // method for fetch picklist values dynamic  
    @AuraEnabled
    public static List <String> getSelectOptions(sObject objObject, string fld) {
        system.debug('objObject --->' + objObject);
        system.debug('fld --->' + fld);
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
	public static Assessment__c add(Assessment__c item){        
        item.RecordTypeId = OrmActivityController.getActivityRecordTypeId();
		upsert item;
		return item;
	}
}