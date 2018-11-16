public with sharing class OrmImpactFactory {
     /**
   * @author : David
   * @date : 16/11/2018
   * @description :generate   list of impacts
   */
    public static List<Macro> generateImpacts(String  idAssessmentRisk )
    {
        List<Macro> impacts = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            impacts.add(new Macro( Name= 'impact'+i,orm_categorie_impact__c='valeur 3',orm_assessmentRisk__c = idAssessmentRisk,RecordTypeId = OrmImpactController.getImpactRecordTypeId()));
       } 
        insert impacts;
        return impacts;
    }
}