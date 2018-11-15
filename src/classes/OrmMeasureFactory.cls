public with sharing class OrmMeasureFactory {
       /**
   * @author : David
   * @date : 15/11/2018
   * @description :generate   list of Measure
   */
    public static List<Assessment__c> generateMeasure(String  idAssessmentRisk )
    {
        List<Assessment__c> measures = new List<Assessment__c>();
        for(Integer i=0;i<20; i++)
        {
            measures.add(new Assessment__c( Name= 'measure'+i,orm_measureCategorie__c ='Corrective' ,orm_assessmentRisk__c = idAssessmentRisk,RecordTypeId = OrmMeasureController.getMeasureRecordTypeId()));
       } 
        insert measures;
        return measures;
    }
     /**
   * @author : David
   * @date : 15/11/2018
   * @description :generate   list of MeasureProgress
   */
    public static List<Product2> generateMeasureProgress(String  idMeasure )
    {
        List<Product2> measuresProgress = new List<Product2>();
        for(Integer i=0;i<20; i++)
        {
            measuresProgress.add(new Product2( Name= 'measureProgress'+i,Family ='draft' ,orm_measures__c = idMeasure,RecordTypeId = OrmMeasureController.getMeasureProgressionRecordTypeId()));
       } 
        insert measuresProgress;
        return measuresProgress;
    }
}