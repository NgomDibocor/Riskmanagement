public with sharing class OrmSliderController {
    
    public static Id getProbabilityRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT probabilite').getRecordTypeId();
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
}