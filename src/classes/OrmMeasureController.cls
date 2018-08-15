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
		return [SELECT Id, Name, orm_description__c FROM Assessment__c WHERE orm_assessmentRisk__c =: idAssRisk AND 
					RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId()];
	
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
	
}