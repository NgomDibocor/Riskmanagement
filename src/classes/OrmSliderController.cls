public with sharing class OrmSliderController {
    
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
    
    @AuraEnabled
    public static List<Macro> addProbabilities(List<Macro> items)
    {
    	List<Macro> res = new List<Macro>();
    	for (Macro item : items) {
    		item.RecordTypeId = OrmSliderController.getProbabilityRecordTypeId();
		    upsert item;
		    res.add(item);
		}

        return res;   
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
    public static void deletePreviousProbalities(String assessment)
    {
          List<Macro> probabilities = [SELECT Id
					                   From Macro 
					                   WHERE   orm_assessment__c =:assessment 
					                       and 
					                           RecordTypeId=: OrmSliderController.getProbabilityRecordTypeId()]; 
         
         if(probabilities.size() > 0){
              delete probabilities; 
          }
    }
    
    
    
    /*@AuraEnabled 
    public static void deletePreviousHsseImpacts(String assessment)
    {
          List<Macro> hsseImpacts = [SELECT Id
					                 From Macro 
					                 WHERE   orm_assessment__c =:assessment 
					                       and 
					                          RecordTypeId=: OrmSliderController.getHsseImpactRecordTypeId()]; 
          if(hsseImpacts.size() > 0){
              delete hsseImpacts; 
          }
                                       
    }*/
    
    @AuraEnabled
    public static List<Macro> addHsseImpacts(List<Macro> items)
    {
    	List<Macro> res = new List<Macro>();
    	for (Macro item : items) {
    		item.RecordTypeId = OrmSliderController.getHsseImpactRecordTypeId();
		    upsert item;
		    res.add(item);
		}

        return res;   
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
    
}