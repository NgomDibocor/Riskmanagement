public with sharing class OrmImpactController {
    /**
	 * @author: david
	 * @date: Creation: 28/08/2018
	 * @description: get recordType Impact
	*/
    public static Id getImpactRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT impact').getRecordTypeId();
        return RecordTypeId;
    }
    /**
	 * @author: david
	 * @date: Creation: 28/08/2018
	 * @description: find all impacts related to the assessmentRisk
	*/
	@AuraEnabled
	public static List<Macro> findAllImpactByAssessmentRisk(String idAssRisk){
		return [SELECT Id, Name, Description FROM Macro WHERE orm_assessmentRisk__c=: idAssRisk AND 
					RecordTypeId =: OrmImpactController.getImpactRecordTypeId()];
	
	}
	 /*
    *David mignane diop
    *function of adding a new impact
    *le 27/07/2018
    */
     @AuraEnabled
    public static Macro add (Macro item){
        if(item!=null){
           item.RecordTypeId=OrmImpactController.getImpactRecordTypeId();
            upsert item;
            return item;
        }   
        return item;
        
    }
    
	/**
	 * @author: David
	 * @date: Creation: 28/08/2018
	 * @description: method for update records after inline editing
	*/
    @AuraEnabled
    public static List <Macro> updateImpacts(List<Macro> impacts) {
        update impacts;
        return impacts;
    }
	 /*
    *David mignane diop
    *  picklist recovery function
    *le 27/07/2018
    */
     // method for fetch picklist values dynamic  
    @AuraEnabled
    public static List < String > getSelectOptions(sObject objObject, string fld) {
        system.debug('objObject --->' + objObject);
        system.debug('fld --->' + fld);
        List < String > allOpts = new list < String > ();
        // Get the object type of the SObject.
        Schema.sObjectType objType = objObject.getSObjectType();
        
        // Describe the SObject using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        
        // Get a map of fields for the SObject
        map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
        
        // Get the list of picklist values for this field.
        list < Schema.PicklistEntry > values =
            fieldMap.get(fld).getDescribe().getPickListValues();
        
        // Add these values to the selectoption list.
        for (Schema.PicklistEntry a: values) {
            allOpts.add(a.getValue());
        }
        system.debug('allOpts ---->' + allOpts);
        allOpts.sort();
        return allOpts;
    }
    
}