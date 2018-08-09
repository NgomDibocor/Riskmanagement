/*
    *David mignane diop
    *controller class for the risk object
    *le 27/07/2018
    */
public with sharing class OrmRiskController {
	/*
    *David mignane diop
    *function for the recovery of the ricord type
    *le 27/07/2018
    */
       public static Id getRiskRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Risk').getRecordTypeId();
        return recordTypeId;
    }
    /*
    *David mignane diop
    *risk list function
    *le 27/07/2018
    */
    @AuraEnabled 
    public static List<Macro> findAll(String item)
    {
       return  [Select Id,Name,Description,orm_associate__c,orm_categorieRisk__c,orm_assessment__r.name From Macro where 
       RecordTypeId=:OrmRiskController.getRiskRecordTypeId() and orm_categorieRisk__c=:item ];
    }
    /*
    *David mignane diop
    *risk list function
    *le 27/07/2018
    */
    @AuraEnabled 
    public static List<orm_assessmentRisk__c> findAllAssessmentRisk(String item,String assessment)
    {
       return  [Select Id,orm_assessment__r.name,orm_assessment__r.Id,orm_Risk__r.Name,
                       orm_Risk__r.orm_categorieRisk__c,orm_Risk__r.Description From orm_assessmentRisk__c 
               where orm_Risk__r.orm_categorieRisk__c=:item and orm_assessment__r.Id =:assessment];
    }
   
     /*
    *David mignane diop
    *function for the risk filter
    *le 27/07/2018
    */
     @AuraEnabled 
    public static List<orm_assessmentRisk__c> findAllResearchPicklist(String Research,String assessment)
    {
         return  [Select Id,orm_assessment__r.name,orm_assessment__r.Id,orm_Risk__r.Name,
                       orm_Risk__r.orm_categorieRisk__c,orm_Risk__r.Description From orm_assessmentRisk__c 
               where orm_Risk__r.orm_categorieRisk__c=:Research and orm_assessment__r.Id =:assessment];                               
    }
    /*
    *David mignane diop
    *function of adding a new risk
    *le 27/07/2018
    */
     @AuraEnabled
    public static Macro add (Macro item){
        if(item!=null){
           item.RecordTypeId=OrmRiskController.getRiskRecordTypeId();
            upsert item;
           return item;
        }   
        return item;
        
    }
     /*
    *David mignane diop
    *function of adding a new assessment risk
    *le 02/08/2018
    */
     @AuraEnabled
    public static orm_assessmentRisk__c addAssessmentRisk (orm_assessmentRisk__c item)
    {
            upsert item;
            return item;   
    }
    
     /*
    *David mignane diop
    *function of adding a new assessment risk
    *le 02/08/2018
    */
     @AuraEnabled
    public static List<orm_assessmentRisk__c> addAssessmentRisks (List<orm_assessmentRisk__c> items)
    {
            insert items;
            return items;   
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
    
     @AuraEnabled 
    public static List<orm_assessmentRisk__c> liste(String item)
    {
       return  [Select Id,orm_assessment__r.id,orm_risk__r.name From orm_assessmentRisk__c where  orm_assessment__r.id=:item ];
    }
    
}