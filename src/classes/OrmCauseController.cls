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
    
}