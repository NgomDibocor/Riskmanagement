public with sharing class OrmAssessmentRiskController {
    public static Id getAssessmentRiskRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.orm_assessmentRisk__c.getRecordTypeInfosByName()
                  .get('orm RT asssessmentRisk').getRecordTypeId();
        return recordTypeId;
    }
    @AuraEnabled 
    public static List<orm_assessmentRisk__c> findAll()
    {
       return  [Select Id,Name,orm_security__c,orm_date__c,orm_cost__c,orm_environmentAndCommunity__c,
                          orm_frequency__c,orm_healthAndSafety__c,orm_manageAbility__c,orm_phase__c,orm_productionLoss__c,orm_reputation__c,
                          orm_schedule__c,orm_status__c,orm_vulnerability__c,orm_assessment__c,
                          orm_Risk__r.Name,orm_assumption__r.Name,orm_assessment__r.Name, orm_assessment__r.orm_description__c From orm_assessmentRisk__c];
    }
    
  /* @AuraEnabled 
    public static Map<Integer, sObject> getAssessmentRisks()
    {
        List<AggregateResult> agrResults =  [Select orm_assessment__r.Id, orm_assessment__r.Name,  
                                             count(orm_Risk__c) nbRisk
                                             From orm_assessmentRisk__c 
                                             GROUP BY orm_assessment__r.Name, orm_assessment__r.Id ];
                                             //Map<Id,nbre>*/
       /* Map<Id, Integer> maiIdNbre = new Map<Id, Integer>();
        for (AggregateResult ar: agrResults){
        	maiIdNbre.put(ar.get('Id').toString(), (Integer)ar.get('nbRisk'));
        } */  //maiIdNbre.keySet()                                   
         
      /*  system.debug('dibo1: '+agrResults.size()) ;     
        Map<sObject, Integer> mapObjects = new Map<sObject, Integer>();  
        for (AggregateResult ar: agrResults){
           mapObjects.put((Integer)ar.get('nbRisk'), [Select Id, Name, orm_description__c, orm_objectif__c 
                           From Assessment__c  
                           WHERE Id =: ar.get('Id').toString() ]);   
        }     
        system.debug('dibo2:  '+mapObjects.size()) ;
        return mapObjects;*/
        
    //}
    
    @AuraEnabled
    public static orm_assessmentRisk__c add (orm_assessmentRisk__c item){
        if(item!=null){
            upsert item;
            return item;
        }   
        return item;
        
    }
}