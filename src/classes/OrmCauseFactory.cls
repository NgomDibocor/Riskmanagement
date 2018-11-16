public with sharing class OrmCauseFactory {
     /**
   * @author : David
   * @date : 15/11/2018
   * @description :generate   list of cause
   */
    public static List<Macro> generateMeasureProgress(String  idAssessmentRisk )
    {
        List<Macro> causes = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            causes.add(new Macro( Name= 'cause'+i,orm_assessmentRisk__c = idAssessmentRisk,RecordTypeId = OrmCauseController.getCauseRecordTypeId()));
       } 
        insert causes;
        return causes;
    }
}