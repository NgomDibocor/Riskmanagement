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
	public static List<Macro> findAllAssumptionByAssessmentRisk(String asssessmentId){
		return [SELECT Id, Name,orm_assessmentRisk__c FROM Macro WHERE orm_assessmentRisk__c=: asssessmentId AND 
					RecordTypeId =:OrmAssumptionController.getAssumptionRecordTypeId()];
	
	}
}