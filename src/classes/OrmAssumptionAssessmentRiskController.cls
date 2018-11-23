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
					RecordTypeId =:OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId() ORDER BY CreatedDate DESC];
	}
/**
 * @author: SDavid diop
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
    public static List <Macro> updateAssumption(List<Macro> listAssumption) {
        update listAssumption;
        return listAssumption;
    }
 /**
 * remove assumption selected
 * @author David diop
 * @version 1.0
 * @description  method for remove all assumptions checked
 * @history 
 * 2018-09-05 : David diop - Implementation
 */
   @AuraEnabled
 public static List < String > deleteRecordAssumption(List < String > lstRecordId) {
	  // for store Error Messages  
	  List < String > oErrorMsg = new List < String > ();
	  // Query Records for delete where id in lstRecordId [which is pass from client side controller] 
	  List <Macro> lstDeleteRec = [select Id from Macro where id IN: lstRecordId and RecordTypeId=:OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId()];
	  // delte contact list with Database.DeleteResult[] database class.
	  // It deletes some queried contacts using <samp class="codeph apex_code">Database.<span class="statement">delete</span></samp> 
	  // with a false second parameter to allow partial processing of records on failure.
	  // Next, it iterates through the results to determine whether the operation was successful or not
	  // for each record. and check if delete contact successful so print msg on debug, 
	  // else add error message to oErrorMsg List and return the list  
	  delete lstDeleteRec;
	  return oErrorMsg;
 }
}