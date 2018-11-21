public with sharing class OrmSliderFactory {
   /**
   * @author : David
   * @date : 19/11/2018
   * @description :generate   list of Probability
   */
    public static List<Macro> generateProbability(String  idAssessment)
    {
        List<Macro> probabilities = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            probabilities.add(new Macro(Name='probality'+i,orm_probability__c='rare',orm_pourcentageMin__c= 10 ,orm_pourcentageMax__c= 25,orm_assessment__c =idAssessment,RecordTypeId = OrmSliderController.getProbabilityRecordTypeId()));
       } 
        insert probabilities;
        return probabilities;
    }
     /**
   * @author : David
   * @date : 19/11/2018
   * @description :generate  list of HsseImpacts
   */
    public static List<Macro> generateHsseImpacts(String  idAssessment)
    {
        List<Macro> HsseImpacts = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            HsseImpacts.add(new Macro(Name='HsseImpacts'+i,orm_rating__c='low',orm_healthAndSafety__c= 'healthAndSafety' ,orm_security__c='security',orm_environmentAndCommunity__c='environmentAndCommunity',orm_assessment__c =idAssessment,RecordTypeId = OrmSliderController.getHsseImpactRecordTypeId()));
        } 
        insert HsseImpacts;
        return HsseImpacts;
    }
   /**
   * @author : David
   * @date : 19/11/2018
   * @description :generate  list of BusinessImpacts
   */
    public static List<Macro> generateBusinessImpacts(String  idAssessment)
    {
        List<Macro> BusinessImpacts = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            BusinessImpacts.add(new Macro(Name='BusinessImpacts'+i,orm_rating__c='low',orm_costProjectBudgetMin__c = 5 ,orm_costProjectBudgetMax__c = 10,orm_scheduleProjectBaselineMin__c = 15,orm_scheduleProjectBaselineMax__c = 30 ,orm_productionLossMin__c = 31 ,orm_productionLossMax__c= 50 ,orm_reputation__c='reputation',orm_assessment__c =idAssessment,RecordTypeId = OrmSliderController.getBusinessImpactRecordTypeId()));
        } 
        insert BusinessImpacts;
        return BusinessImpacts;
    }
}