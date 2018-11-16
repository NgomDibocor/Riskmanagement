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
		return [SELECT Id, Name, Description FROM Macro WHERE orm_assessmentRisk__c=: idAssRisk AND 
					RecordTypeId =: OrmCauseController.getCauseRecordTypeId()];
	
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
   
    @AuraEnabled 
    public static List<Macro> filter(String key, String idAssessmentRisk) {
    	
        return (List<Macro>)[FIND:key IN ALL FIELDS RETURNING Macro
                                        (Name,Description WHERE Id=: idAssessmentRisk AND 
                                        	RecordTypeId =: OrmCauseController.getCauseRecordTypeId() )][0];                                
    }
     */
    /**
	 * @author: Laye
	 * @date: Creation: 13/08/2018
	 * @description: delete all causes where the iD is in causeIds list 
	*/
	@AuraEnabled
	public static List <String> deleteCauses(List<String> causeIds){
		
		// for store Error Messages  
  		List <String> oErrorMsg = new List <String>();
  		// Query Records for delete where id in lstRecordId [which is pass from client side controller]
  		List<Macro> causes = [SELECT Id FROM Macro WHERE Id IN :causeIds AND 
  			RecordTypeId =:OrmCauseController.getCauseRecordTypeId()];
  		delete causes;
	  	return oErrorMsg;  		
	}

    /* @AuraEnabled
    public static List <Macro> updateCauseRecords(List<Macro> causes) {
        update causes;
        return causes;
    }
    */
}