/**
 * @author Abdoulaye
 * @version 1.0
 * @description class for managing Activity
 */ 
public class OrmActivityController {
	
    public static Id getActivityRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Activity').getRecordTypeId();
        return RecordTypeId;
    }
    /**
 * @author David
 * @version 1.0
 * @description class for managing ActivityProof
 */ 
    public static Id getActivityProofRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Product2.getRecordTypeInfosByName()
                  .get('RT ActivityProof').getRecordTypeId();
        return RecordTypeId;
    }
    
 /**
 * find all activity 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get All activity of Unit
 * @history 
 * 2018-07-24 : Salimata NGOM - Implementation
 */
   
 @AuraEnabled 
    public static List<Assessment__c> findAllActivity(){
        List<Assessment__c> allActivity = new List<Assessment__c>();
        allActivity = [Select Id, Name, orm_startDate__c, orm_endDate__c, orm_activityStatus__c,orm_description__c
                    From Assessment__c where RecordTypeId=:OrmActivityController.getActivityRecordTypeId() 
                    order by Name];
        return allActivity;
    }     
    
 /**
 * find all activity Assessment 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get All activity of Unit By assessment
 * @history 
 * 2018-07-24 : Salimata NGOM - Implementation
 */ 
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
    /**
 * find activity  
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get activity
 * @history 
 * 2018-07-24 : Salimata NGOM - Implementation
 */ 
    @AuraEnabled 
    public static Assessment__c findActivity(String activityId){
        return [Select Id, Name, orm_startDate__c, orm_endDate__c, orm_activityStatus__c, orm_user__c,
                       orm_user__r.Name, orm_description__c, orm_assessment__c,orm_assessment__r.Name
                    From Assessment__c 
                    where Id=:activityId and  RecordTypeId=:OrmActivityController.getActivityRecordTypeId()];
    }
 /**
 * save List activity
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method for update records after inline editing
 * @history 
 * 2018-07-24 : Salimata NGOM - Implementation
 */ 
     
    @AuraEnabled
    public static List <Assessment__c> saveActivity(List<Assessment__c> lstActivity) {
        update lstActivity;
        return lstActivity;
    }
 /**
 * get select options picklist
 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description  method for fetch picklist values dynamic 
 * @history 
 * 2018-07-24 : Salimata NGOM - Implementation
 */
   
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
    
    /**
	 * @author Abdoulaye
	 * @version 1.0
	 * @description method to add an Activity
	 */
    @AuraEnabled
	public static Assessment__c add(Assessment__c item){        
        item.RecordTypeId = OrmActivityController.getActivityRecordTypeId();
		upsert item;
		return item;
	}
	/**
	 * @author Abdoulaye
	 * @version 1.0
	 * @description method to add an Activity
	 */
    @AuraEnabled
	public static Assessment__c updateActivity(Assessment__c activity){        
        activity.RecordTypeId = OrmActivityController.getActivityRecordTypeId();
		update activity;
		return activity;
	}
	 /**
 * remove activities selected
 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description  method for remove all activities checked
 * @history 
 * 2018-07-31 : Salimata NGOM - Implementation
 */
   @AuraEnabled
 public static List < String > deleteRecordActivities(List < String > lstRecordId) {
  // for store Error Messages  
  List < String > oErrorMsg = new List < String > ();
  // Query Records for delete where id in lstRecordId [which is pass from client side controller] 
  List < Assessment__c> lstDeleteRec = [select Id from Assessment__c where id IN: lstRecordId and RecordTypeId=:OrmActivityController.getActivityRecordTypeId()];
  
  // delte contact list with Database.DeleteResult[] database class.
  // It deletes some queried contacts using <samp class="codeph apex_code">Database.<span class="statement">delete</span></samp> 
  // with a false second parameter to allow partial processing of records on failure.
  // Next, it iterates through the results to determine whether the operation was successful or not
  // for each record. and check if delete contact successful so print msg on debug, 
  // else add error message to oErrorMsg List and return the list  
  Database.DeleteResult[] DR_Dels = Database.delete(lstDeleteRec, false);
  // Iterate through each returned result
  for (Database.DeleteResult dr: DR_Dels) {
   if (dr.isSuccess()) {
      system.debug('successful delete contact');
     // Operation was successful
   } else {
    // Operation failed, so get all errors   
    oErrorMsg.add('');
    for (Database.Error err: dr.getErrors()) {
     // add Error message to oErrorMsg list and return the list
     oErrorMsg.add(err.getStatusCode() + ': ' + err.getMessage());
    }
   }
  }
  return oErrorMsg;
 
 }
 /**
	 * @author David DIOP
	 * @version 1.0
	 * @description method to add an ActivityProof
	 */
    @AuraEnabled
	public static Product2 addActivityProof(Product2 item){        
        item.RecordTypeId = OrmActivityController.getActivityProofRecordTypeId();
		upsert item;
		return item;
	}
	
	 /**
	 * @author: David diop
	 * @date: Creation: 06/09/2018
	 * @description: find allActivityProof related to the Activity
	*/
	@AuraEnabled
	public static List<Product2> getAllMeasuresProgressionByMeasure(String idActivity){
		return [SELECT Id,Description,Name,
		orm_poucentageProgression__c,orm_dateProgression__c,orm_Activite__c
		        FROM Product2 
		        WHERE orm_Activite__c =: idActivity 
		        AND RecordTypeId =: OrmActivityController.getActivityProofRecordTypeId()];
	
	}
	
	/**
	 * @author: David
	 * @date: Creation: 28/08/2018
	 * @description: method for update records after inline editing
	*/
    @AuraEnabled
    public static List <Product2> updateActiviteProof(List<Product2> activityProof) {
        update activityProof;
        return activityProof;
    }
     /**
 * remove activities selected
 
 *
 * @author David diop
 * @version 1.0
 * @description  method for remove all Activity Proof checked
 * @history 
 * 2018-09-05 : David diop- Implementation
 */
 
   @AuraEnabled
 public static List < String > deleteRecordActivityProof(List < String > lstRecordId) {
  // for store Error Messages  
  List < String > oErrorMsg = new List < String > ();
  // Query Records for delete where id in lstRecordId [which is pass from client side controller] 
  List <Product2> lstDeleteRec = [select Id from Product2 where id IN: lstRecordId and RecordTypeId=:OrmActivityController.getActivityProofRecordTypeId()];
  
  // delte contact list with Database.DeleteResult[] database class.
  // It deletes some queried contacts using <samp class="codeph apex_code">Database.<span class="statement">delete</span></samp> 
  // with a false second parameter to allow partial processing of records on failure.
  // Next, it iterates through the results to determine whether the operation was successful or not
  // for each record. and check if delete contact successful so print msg on debug, 
  // else add error message to oErrorMsg List and return the list  
  Database.DeleteResult[] DR_Dels = Database.delete(lstDeleteRec, false);
  // Iterate through each returned result
  for (Database.DeleteResult dr: DR_Dels) {
   if (dr.isSuccess()) {
      system.debug('successful delete contact');
     // Operation was successful
   } else {
    // Operation failed, so get all errors   
    oErrorMsg.add('');
    for (Database.Error err: dr.getErrors()) {
     // add Error message to oErrorMsg list and return the list
     oErrorMsg.add(err.getStatusCode() + ': ' + err.getMessage());
    }
   }
  }
  return oErrorMsg;
 
 }
  
}