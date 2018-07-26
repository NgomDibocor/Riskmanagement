public class AssessmentRiskController {
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
                          orm_schedule__c,orm_status__c,orm_vulnerability__c,
                          orm_Risk__r.Name,orm_assumption__r.Name,orm_assessment__r.Name From orm_assessmentRisk__c];
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