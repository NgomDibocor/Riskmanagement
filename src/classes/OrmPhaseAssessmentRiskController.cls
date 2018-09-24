public with sharing class OrmPhaseAssessmentRiskController {
      
        public static Id getPhaseRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Phase').getRecordTypeId();
        return RecordTypeId;
    }
    
    /**
	 * @author: david
	 * @date: Creation: 28/08/2018
	 * @description: find all impacts related to the assessmentRisk
	*/
	@AuraEnabled
	public static List<Macro> findAllPhaseByAssessmentRisk(String idAssRisk){
		return [SELECT Id, Description, orm_assessmentRisk__c FROM Macro WHERE orm_assessmentRisk__c=: idAssRisk AND 
					RecordTypeId =: OrmPhaseAssessmentRiskController.getPhaseRecordTypeId()];
	
	}
	  /**
	 * @author: Laye
	 * @date: Creation: 06/08/2018
	 * @description: add Phase
	*/
	@AuraEnabled
	public static Macro add(Macro item){        
        item.RecordTypeId = OrmPhaseAssessmentRiskController.getPhaseRecordTypeId();
		upsert item;
		return item;
	}
}