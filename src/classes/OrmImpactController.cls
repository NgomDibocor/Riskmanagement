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
		return [SELECT Id, Name, Description,orm_categorie_impact__c FROM Macro WHERE orm_assessmentRisk__c=: idAssRisk AND 
					RecordTypeId =: OrmImpactController.getImpactRecordTypeId()];
	
	}
	/**
	 * @author: david
	 * @date: Creation: 28/08/2018
	 * @description: find  impacts 
	*/
	@AuraEnabled
	public static Macro getImpact(String idImpact){
		return [SELECT Id, Name, Description,orm_categorie_impact__c FROM Macro WHERE Id =: idImpact AND 
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
    /**
	 * @author: Laye
	 * @date: Creation: 13/08/2018
	 * @description: delete all causes where the iD is in causeIds list 
	*/
	@AuraEnabled
	public static List <String> deleteImpacts(List<String> impactIds){
		
		// for store Error Messages  
  		List <String> oErrorMsg = new List <String>();
  		// Query Records for delete where id in lstRecordId [which is pass from client side controller]
  		List<Macro> impacts = [SELECT Id FROM Macro WHERE Id IN :impactIds AND 
  			RecordTypeId =:OrmImpactController.getImpactRecordTypeId()];
  		Database.DeleteResult[] drDels = Database.delete(impacts, false);
  		// Iterate through each returned result
  		for (Database.DeleteResult dr: drDels) {
	   		if (dr.isSuccess()) {
	      		system.debug('successful delete contact');
	     		// Operation was successful
	   		} else {
	    		// Operation failed, so get all errors   
	    		oErrorMsg.add('');
	    		for (Database.Error err: dr.getErrors()) {
	     			// add Error message to oErrorMsg list and return the list
	     			oErrorMsg.add(err.getStatusCode() + ': ' + err.getMessage());
	    		}
	   		}
	  	}
	  	return oErrorMsg;  		
	}
    
    
}