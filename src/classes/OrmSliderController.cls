public with sharing class OrmSliderController {
    
    public static Id getProbabilityRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT probabilite').getRecordTypeId();
        return recordTypeId;
    }   
    
    public static Id getHsseImpactRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Order.getRecordTypeInfosByName()
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
          
          delete probabilities;                              
    }
    
    @AuraEnabled 
    public static Macro getProbability(String assessment, String probability)
    {
         return  [SELECT Id, orm_probability__c, orm_pourcentageMin__c, orm_pourcentageMax__c
                  From Macro 
                  WHERE   orm_assessment__c =:assessment 
                       and 
                          RecordTypeId=: OrmSliderController.getProbabilityRecordTypeId()
                       and
                          orm_probability__c =: probability];                               
    }
    
    @AuraEnabled 
    public static void deletePreviousHsseImpacts(String assessment)
    {
          List<Order> hsseImpacts = [SELECT Id
					                 From Order 
					                 WHERE   orm_assessment__c =:assessment 
					                       and 
					                          RecordTypeId=: OrmSliderController.getHsseImpactRecordTypeId()]; 
          
          delete hsseImpacts;                              
    }
    
    @AuraEnabled
    public static List<Order> addHsseImpacts(List<Order> items)
    {
    	List<Order> res = new List<Order>();
    	for (Order item : items) {
    		item.RecordTypeId = OrmSliderController.getHsseImpactRecordTypeId();
		    upsert item;
		    res.add(item);
		}

        return res;   
   }
    
}