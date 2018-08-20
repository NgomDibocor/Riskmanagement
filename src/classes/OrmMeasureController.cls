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
		        WHERE RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId()];
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
}