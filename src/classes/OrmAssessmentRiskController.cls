/*
    *David mignane diop
    *controller class for the risk object
    *le 27/07/2018
    */
public with sharing class OrmAssessmentRiskController {
	/*
    *David mignane diop
    *function for the recovery of the ricord type
    *le 27/07/2018
    */
    public static Id getAssessmentRiskRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.orm_assessmentRisk__c.getRecordTypeInfosByName()
                  .get('orm RT asssessmentRisk').getRecordTypeId();
        return recordTypeId;
    }
    /*
    *David mignane diop
    *risk list function
    *le 27/07/2018
    */
    @AuraEnabled 
    public static List<orm_assessmentRisk__c> findAll()
    {
       return  [Select Id,Name,orm_security__c,orm_date__c,orm_cost__c,orm_environmentAndCommunity__c,
                          orm_frequency__c,orm_healthAndSafety__c,orm_manageAbility__c,orm_phase__c,orm_productionLoss__c,orm_reputation__c,
                          orm_schedule__c,orm_status__c,orm_vulnerability__c,orm_assessment__c,
                          orm_Risk__r.Name,orm_assumption__r.Name,orm_assessment__r.Name, orm_assessment__r.orm_description__c From orm_assessmentRisk__c];
    }
    
      /*
    *David mignane diop
    * picklist recovery function
    *le 27/07/2018
    */
    @AuraEnabled 
    public static Map<String, Map<String, Object>> getAssessmentRisks()
    {
        List<AggregateResult> agrResults =  [Select orm_assessment__r.Id, orm_assessment__r.Name,  
                                             count(orm_Risk__c) nbRisk
                                             From orm_assessmentRisk__c 
                                             GROUP BY orm_assessment__r.Name, orm_assessment__r.Id ];

        // mapIdAssessmentNbRisk is a map that contains the id and number of Risk of each Assessment
        Map<Id, Integer> mapIdAssessmentNbRisk = new Map<Id, Integer>();
        for (AggregateResult ar: agrResults){
        	mapIdAssessmentNbRisk.put(ar.get('Id').toString(), (Integer)ar.get('nbRisk'));
        }   
        //get all assessment with Id in mapIdAssessmentNbRisk
        List<Assessment__c> assessments = [Select Id, Name, orm_description__c, orm_objectif__c 
                              From Assessment__c  
                              WHERE Id IN : mapIdAssessmentNbRisk.keySet() ];                                 
         
        Map<String, Map<String, Object>> mapObjects = new Map<String, Map<String, Object>>();  
        for (Assessment__c assess: assessments){
           mapObjects.put(assess.Id,  new Map<String, Object>{'nbreRisk' => mapIdAssessmentNbRisk.get(assess.Id), 'assessment' => assess});   
        }    
        
        return mapObjects;
        
    }
    
    @AuraEnabled
    public static orm_assessmentRisk__c add (orm_assessmentRisk__c item){
        if(item!=null){
            upsert item;
            return item;
        }   
        return item;
        
    }
}