/**
 * @author: Salimata NGOM
 * @date: Creation: 30/08/2018
 * @description: Controller for managing Assumption
*/
public with sharing class OrmAssumptionController {
/**
 * @author: Salimata NGOM
 * @date: Creation: 30/08/2018
 * @description: get recordType Cause
*/
    public static Id getAssumptionRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Assumption').getRecordTypeId();
        return RecordTypeId;
    }
 /**
 * @author: Salimata NGOM
 * @date: Creation: 30/08/2018
 * @description: add new Assumption
*/
	@AuraEnabled
	public static Macro add(Macro item){        
        item.RecordTypeId = OrmAssumptionController.getAssumptionRecordTypeId();
		upsert item;
		return item;
	}
	
/**
* @author: Salimata NGOM
* @date: Creation: 30/08/2018
* @description: find all assumptions related to the assessmentRisk
*/
	@AuraEnabled
	public static List<Macro> findAllAssumptionByAssessmentRisk(String asssessment){
		return [SELECT Id, Name FROM Macro WHERE orm_assessment__c=: asssessment AND 
					RecordTypeId =:OrmAssumptionController.getAssumptionRecordTypeId()];
	
	}
	/**
 * save List workshop
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method for update records Assumption after inline editing
 * @history 
 * 2018-08-30 : Salimata NGOM - Implementation
 */ 
     
    @AuraEnabled
    public static List <Macro> saveAssumption(List<Macro> listAssumption) {
        update listAssumption;
        return listAssumption;
    }
}