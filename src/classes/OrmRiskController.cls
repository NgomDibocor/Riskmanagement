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
       return  [Select Id,Name,Description,orm_categorieRisk__c,orm_assessment__r.name From Macro where 
       RecordTypeId=:OrmRiskController.getRiskRecordTypeId() and orm_categorieRisk__c=:item ];
    }
    
      public static Id getProbabilityRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT probabilite').getRecordTypeId();
        return recordTypeId;
    }

     public static Id getHsseImpactRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT HSSE Impact').getRecordTypeId();
        return recordTypeId;
    }
     public static Id getBusinessImpactRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Business Impact').getRecordTypeId();
        return recordTypeId;
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
                       orm_Risk__r.orm_categorieRisk__c,orm_Risk__r.Description 
                From orm_assessmentRisk__c 
                where orm_Risk__r.orm_categorieRisk__c=:item and orm_assessment__r.Id =:assessment
                order by CreatedDate];
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
    public static List<orm_assessmentRisk__c> deleteAssessmentRisks (List<orm_assessmentRisk__c> items)
    {
            delete items;
            return items;  
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
    /*
    *David mignane diop
    *risk list function
    *le 27/07/2018
    */
    @AuraEnabled 
    public static orm_assessmentRisk__c findAssessmentRisk(String item)
    {
       return  [Select Id,orm_assessment__r.name,orm_assessment__r.Id,orm_Risk__r.Name,
                       orm_Risk__r.orm_categorieRisk__c,orm_Risk__r.Description,orm_cost__c,orm_date__c,orm_schedule__c,
                       orm_environmentAndCommunity__c,orm_frequency__c,orm_healthAndSafety__c,orm_manageAbility__c,
                       orm_productionLoss__c,orm_reputation__c,orm_security__c,orm_status__c,orm_vulnerability__c,orm_probability__c,orm_riskManager__c,orm_riskManager__r.Name,orm_ScheduleRisk__c,
                       orm_production_Loss_Risk__c,orm_uncertainty__c,orm_justificationUncertainty__c
               From orm_assessmentRisk__c 
               where Id =:item];
    }
    
    @AuraEnabled 
    public static List<Macro> findAllProbabilitiesByAssessment(String assessment)
    {
         return  [SELECT Id, orm_probability__c, orm_pourcentageMin__c, orm_pourcentageMax__c
                  From Macro 
                  WHERE   orm_assessment__c =:assessment 
                       and 
                          RecordTypeId=: OrmSliderController.getProbabilityRecordTypeId()];                               
    }
    @AuraEnabled 
    public static List<Macro> findHsseImpactsByAssessment(String assessment)
    {
         return  [SELECT Id, orm_rating__c, orm_healthAndSafety__c, orm_security__c, orm_environmentAndCommunity__c
                  From Macro 
                  WHERE   orm_assessment__c =:assessment 
                       and 
                          RecordTypeId=: OrmSliderController.getHsseImpactRecordTypeId()];                               
    }
     /**
	 *
	 * @author david
	 * @version 1.0
	 * @description  this method returns all Users
	 * @history 
	 * 2018-08-07 :david - Implementation
	 */
    @AuraEnabled 
    public static List<User> getUsers(){
        return [Select Id, Name From User ];
         
    }
      @AuraEnabled 
    public static List<Macro> findBusinessImpactsByAssessment(String assessment)
    {
         return  [SELECT Id, orm_rating__c, orm_costProjectBudgetMin__c, orm_costProjectBudgetMax__c, 
                         orm_scheduleProjectBaselineMin__c, orm_scheduleProjectBaselineMax__c, 
                         orm_productionLossMin__c, orm_productionLossMax__c, orm_reputation__c
                  From Macro 
                  WHERE   orm_assessment__c =:assessment 
                       and 
                          RecordTypeId=: OrmSliderController.getBusinessImpactRecordTypeId()];                               
    }
    
   
   
    
}