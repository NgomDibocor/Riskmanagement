public with sharing class OrmAssumptionAssessmentRiskController {
    
    /**
 * @author: David 
 * @date: Creation: 30/08/2018
 * @description: get recordType assumption
*/
    public static Id getAssumptionRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Assumption').getRecordTypeId();
        return RecordTypeId;
    }
 /**
* @author: David 
* @date: Creation: 30/08/2018
* @description: find all assumptions related to the assessmentRisk
*/
	@AuraEnabled
	public static List<Macro> findAssumptionByAssessmentRisk(String asssessmentRiskId){
		return [SELECT Id, Name,orm_assessmentRisk__c FROM Macro WHERE orm_assessmentRisk__c=: asssessmentRiskId AND 
					RecordTypeId =:OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId()];
	
	}
/**
 * @author: Salimata NGOM
 * @date: Creation: 30/08/2018
 * @description: add new Assumption
*/
	@AuraEnabled
	public static Macro add(Macro item){        
        item.RecordTypeId = OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId();
		upsert item;
		return item;
	}
 /**
 * @author David
 * @version 1.0
 * @description method for update records Assumption after inline editing
 * @history 
 * 2018-08-30 :David - Implementation
 */ 
     
    @AuraEnabled
    public static List <Macro> save(List<Macro> listAssumption) {
        update listAssumption;
        return listAssumption;
    }
}