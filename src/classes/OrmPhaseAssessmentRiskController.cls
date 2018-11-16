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
					RecordTypeId =: OrmPhaseAssessmentRiskController.getPhaseRecordTypeId() ORDER BY CreatedDate DESC];
	}
	  /**
	 * @author: David
	 * @date: Creation: 06/08/2018
	 * @description: add Phase
	*/
	@AuraEnabled
	public static Macro add(Macro item){        
        item.RecordTypeId = OrmPhaseAssessmentRiskController.getPhaseRecordTypeId();
		upsert item;
		return item;
	}
	/**
	 * @author: David
	 * @date: Creation: 07/08/2018
	 * @description: method for update records after inline editing
	*/
    @AuraEnabled
    public static List <Macro> updatePhases(List<Macro> phases) {
        update phases;
        return phases;
    }
    /**
	 * @author: David
	 * @date: Creation: 10/08/2018
	 * @description: delete all phases where the iD is in phaseIds list 
	*/
	@AuraEnabled
	public static List <String> deletePhases(List<String> phaseIds){
		// for store Error Messages  
  		List <String> oErrorMsg = new List <String>();
  		// Query Records for delete where id in lstRecordId [which is pass from client side controller]
  		List<Macro> phases = [SELECT Id FROM Macro WHERE Id IN :phaseIds AND RecordTypeId =:OrmPhaseAssessmentRiskController.getPhaseRecordTypeId()];
  	    delete phases;
	  	return oErrorMsg;  		
	}
}