public with sharing class OrmRiskController {
       public static Id getRiskRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Risk').getRecordTypeId();
        return recordTypeId;
    }
    /*
    *David mignane diop
    *fonction liste risque
    *le 27/07/2018
    */
    @AuraEnabled 
    public static List<Macro> findAll()
    {
       return  [Select Id,Name,Description,orm_categorieRisk__c,orm_assessment__r.name From Macro where 
       RecordTypeId=:OrmRiskController.getRiskRecordTypeId()];
    }
    /*
    *David mignane diop
    *fonction pour le filtre des risques
    *le 27/07/2018
    */
     @AuraEnabled 
    public static List<Macro> findAllResearch(String Research)
    {
        return (List<Macro>)[FIND:Research IN ALL FIELDS RETURNING Macro
                                        (Name,Description,orm_categorieRisk__c,orm_assessment__r.name)][0];
                                        
    }
     @AuraEnabled
    public static Macro add (Macro item){
        if(item!=null){
           item.RecordTypeId=OrmRiskController.getRiskRecordTypeId();
            upsert item;
           return item;
        }   
        return item;
        
    }
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