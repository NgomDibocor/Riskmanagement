/**
 * @author: Dibocor NGOM
 * @date: Creation: 15/08/2018
 * @description: Controller for managing Measure
*/
public with sharing class OrmMeasureController {
    /**
	 * @author: Dibocor NGOM
	 * @date: Creation: 15/08/2018
	 * @description: get recordType Measure
	*/
    public static Id getMeasureRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Measure').getRecordTypeId();
        return RecordTypeId;
    }
    /**
	 * @author: David diop
	 * @date: Creation: 15/08/2018
	 * @description: get recordType MeasureProgression
	*/
    public static Id getMeasureProgressionRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Product2.getRecordTypeInfosByName()
                  .get('RT measure Progression').getRecordTypeId();
        return RecordTypeId;
    }
    /**
	 * @author: Dibocor NGOM
	 * @date: Creation: 15/08/2018
	 * @description: find all measure related to the assessmentRisk
	*/
	@AuraEnabled
	public static List<Assessment__c> getAllMeasuresByAssessmentRisk(String idAssRisk){
		return [SELECT Id, Name, orm_description__c 
		        FROM Assessment__c 
		        WHERE orm_assessmentRisk__c =: idAssRisk 
		        AND RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId()];
	
	}
	
	/**
	 * @author: Dibocor NGOM
	 * @date: Creation: 15/08/2018
	 * @description: find all measure related to the assessmentRisk
	*/
	@AuraEnabled
	public static Assessment__c add(Assessment__c item){        
        item.RecordTypeId = OrmMeasureController.getMeasureRecordTypeId();
		upsert item;
		return item;
	}
	
	/**
	 * @author: Abdoulaye
	 * @date: Creation: 17/08/2018
	 * @description: update a list of Measure
	*/
	@AuraEnabled
	public static List <Assessment__c> updateMeasures(List<Assessment__c> measures) {
        update measures;
        return measures;
    }
    
    /**
	 * @author: Laye
	 * @date: Creation: 18/08/2018
	 * @description: delete all causes where the iD is in causeIds list 
	*/
	@AuraEnabled
	public static List <String> deleteMeasures(List<String> measureIds){
		
		// for store Error Messages  
  		List <String> oErrorMsg = new List <String>();
  		// Query Records for delete where id in lstRecordId [which is pass from client side controller]
  		List<Assessment__c> measures = [SELECT Id FROM Assessment__c WHERE Id IN :measureIds AND 
  			RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId()];
  		Database.DeleteResult[] drDels = Database.delete(measures, false);
  		// Iterate through each returned result
  		for (Database.DeleteResult dr: drDels) {
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
	 * @author: David Diop
	 * @date: Creation: 20/08/2018
	 * @description: find all measure related to the assessmentRisk 
	*/
	@AuraEnabled
	public static List<Assessment__c> getAllMeasures(){
		return 	[SELECT Id, Name, orm_description__c,orm_AssessmentRisk__r.orm_assessment__c
		        FROM Assessment__c 
		        WHERE RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId() AND CreatedById = :UserInfo.getUserId()];
	}	
	/**
	 *
	 * @author David diop
	 * @version 1.0
	 * @description  this method returns an assessment
	 * @history 
	 * 2018-07-24 : David diop- Implementation
	 */
    @AuraEnabled 
    public static Assessment__c getAssessment(String idAss){
        return OrmAssessmentController.getAssessment(idAss);
    }
    /**
	 *
	 * @author david
	 * @version 1.0
	 * @description  this method returns all Users
	 * @history 
	 * 2018-08-07 :david - Implementation
	 */
    @AuraEnabled 
    public static List<User> getUsers(){
        return [Select Id, Name From User ];
         
    }
    /**
	 *
	 * @author David diop
	 * @version 1.0
	 * @description  this method returns an Measure
	 * @history 
	 * 2018-07-24 : David diop- Implementation
	 */
    @AuraEnabled 
    public static Assessment__c getMeasure(String idMeasure){
     return 	[SELECT Id, Name, orm_description__c,orm_assessmentRisk__c,
     			        orm_AssessmentRisk__r.orm_assessment__c,orm_endDate__c,orm_startDate__c,
     			        orm_measure_Status__c,orm_measure_Cost__c,orm_measureCategorie__c,
     			        orm_measureResponsable__c, orm_measureResponsable__r.Name
		        FROM Assessment__c 
		        WHERE RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId() And Id =:idMeasure];
    }
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns all items of PickList
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */    
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
 	 /**
	 * @author: David diop
	 * @date: Creation: 31/08/2018
	 * @description: find all measureProgression related to the measure
	*/
	@AuraEnabled
	public static List<Product2> getAllMeasuresProgressionByMeasure(String idMeasure){
		return [SELECT Id,orm_pourcentage__c,Description,Family,
		orm_poucentageProgression__c,orm_dateProgression__c,orm_measure__c
		        FROM Product2 
		        WHERE orm_measures__c =: idMeasure 
		        AND RecordTypeId =: OrmMeasureController.getMeasureProgressionRecordTypeId()];
	
	}
	/**
	 * @author: David diop
	 * @date: Creation: 31/08/2018
	 * @description: add Measure Progression 
	*/
	@AuraEnabled
	public static Product2 addMeasureProgression(Product2 item){        
        item.RecordTypeId = OrmMeasureController.getMeasureProgressionRecordTypeId();
		upsert item;
		return item;
	}
	/**
	 * @author: David
	 * @date: Creation: 28/08/2018
	 * @description: method for update records after inline editing
	*/
    @AuraEnabled
    public static List <Product2> updateMeasureProgressions(List<Product2> measureProgression) {
        update measureProgression;
        return measureProgression;
    }
	
}