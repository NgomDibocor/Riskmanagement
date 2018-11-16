public with sharing class OrmAssumptionAssessmentRiskFactory {
   /**
   * @author : David
   * @date : 16/11/2018
   * @description :generate   list of AssumptionAssessmentRisk
   */
    public static List<Macro> generateAssumptionAssessmentRisk(String  idAssessmentRisk )
    {
        List<Macro> assumptions = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            assumptions.add(new Macro( Name= 'cause'+i,orm_assessmentRisk__c = idAssessmentRisk,RecordTypeId = OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId()));
       } 
        insert assumptions;
        return assumptions;
    }
   /**
   * @author : David
   * @date : 16/11/2018
   * @description :generate   list of Assumption
   */
    public static List<Macro> generateAssumption(String  idAssessment)
    {
        List<Macro> assumptions = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            assumptions.add(new Macro( Name= 'cause'+i,orm_assessment__c = idAssessment,RecordTypeId = OrmAssumptionController.getAssumptionRecordTypeId()));
       } 
        insert assumptions;
        return assumptions;
    }
}