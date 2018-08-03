/**
 * @author: Laye
 * @date: Creation: 27/07/2018
 * @description: Controller for managing Cause
*/
public with sharing class OrmCauseController {
    
    /**
	 * @author: Laye
	 * @date: Creation: 27/07/2018
	 * @description: get recordType Cause
	*/
    public static Id getCauseRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT cause').getRecordTypeId();
        return RecordTypeId;
    }
    
    /**
	 * @author: Laye
	 * @date: Creation: 28/07/2018
	 * @description: add Cause
	*/
	@AuraEnabled
	public static Macro add(Macro item){        
        item.RecordTypeId = OrmCauseController.getCauseRecordTypeId();
		upsert item;
		return item;
	}
	
	/**
	 * @author: Laye
	 * @date: Creation: 28/07/2018
	 * @description: find all Cause
	*/
	@AuraEnabled
	public static List<Macro> findAll(){
		return [SELECT Id, Name, Description FROM Macro WHERE RecordTypeId =: OrmCauseController.getCauseRecordTypeId()];
	}
	
	/**
	 * @author: Laye
	 * @date: Creation: 30/07/2018
	 * @description: find all causes related to the assessmentRisk
	*/
	@AuraEnabled
	public static List<Macro> findAllCausesByAssessmentRisk(String idAssRisk){
		return [SELECT Id, Name, Description FROM Macro WHERE orm_assessmentRisk__c=: idAssRisk];
	
	}
	
	/**
	 * @author: Laye
	 * @date: Creation: 31/07/2018
	 * @description: method for update records after inline editing
	*/
    @AuraEnabled
    public static List <Macro> updateCauses(List<Macro> causes) {
        update causes;
        return causes;
    }
    
    
    /**
     * @author: Laye
     * @dateCreation: 03/08/2018
     * @description: method for filtering cause related to an AssessmentRisk
    */
    @AuraEnabled 
    public static List<Macro> filter(String key, String idAssessmentRisk) {
    	
        return (List<Macro>)[FIND:key IN ALL FIELDS RETURNING Macro
                                        (Name,Description WHERE Id=: idAssessmentRisk AND 
                                        	RecordTypeId =: OrmCauseController.getCauseRecordTypeId() )][0];                                
    }
    
}