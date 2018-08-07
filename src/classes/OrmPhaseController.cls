/**
 * @author: Laye
 * @date: Modification: 27/07/2018
 * @description: Controller for managing phase
*/
public with sharing class OrmPhaseController {
	
	/**
	 * @author: Laye
	 * @date: Creation: 06/08/2018
	 * @description: get recordType Phase
	*/
    public static Id getPhaseRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Phase').getRecordTypeId();
        return RecordTypeId;
    }
    
    /**
	 * @author: Laye
	 * @date: Creation: 06/08/2018
	 * @description: add Phase
	*/
	@AuraEnabled
	public static Macro add(Macro item){        
        item.RecordTypeId = OrmPhaseController.getPhaseRecordTypeId();
		upsert item;
		return item;
	}
	
	/**
	 * @author: Laye
	 * @date: Creation: 06/08/2018
	 * @description: get picklist phase
	*/
	@AuraEnabled
    public static List <String> getSelectOptions(sObject objObject, string fld) {
        system.debug('objObject --->' + objObject);
        system.debug('fld --->' + fld);
        List <String> allOpts = new list <String> ();
        // Get the object type of the SObject.
        Schema.sObjectType objType = objObject.getSObjectType();
        
        // Describe the SObject using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        
        // Get a map of fields for the SObject
        map <String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
        
        // Get the list of picklist values for this field.
        list <Schema.PicklistEntry> values =
            fieldMap.get(fld).getDescribe().getPickListValues();
        
        // Add these values to the selectoption list.
        for (Schema.PicklistEntry a: values) {
            allOpts.add(a.getValue());
        }
        system.debug('allOpts ---->' + allOpts);
        allOpts.sort();
        return allOpts;
    }
    
    /**
	 * @author: Laye
	 * @date: Creation: 07/08/2018
	 * @description: method for update records after inline editing
	*/
    @AuraEnabled
    public static List <Macro> updatePhases(List<Macro> phases) {
        update phases;
        return phases;
    }
    
    /**
	 * @author: Laye
	 * @date: Creation: 07/08/2018
	 * @description: find all phases related to the assessment
	*/
	@AuraEnabled
	public static List<Macro> findAllPhasesByAssessment(String idAss){
		return [SELECT Id, orm_phase__c FROM Macro WHERE orm_assessment__c=: idAss AND 
		 RecordTypeId =: OrmPhaseController.getPhaseRecordTypeId()];	
	}
}