public with sharing class OrmAssessmentFactory {
        /**
   * @author : David
   * @date : 14/11/2018
   * @description :generer une liste d'assessment
   */
    public static List<Assessment__c> generateAssessment()
    {
        List<Assessment__c> assessmentOrg = new List<Assessment__c>();
        for(Integer i=0;i<20; i++)
        {
            assessmentOrg.add(new Assessment__c(Name='assessmentOrg'+ i,orm_typeAssessment__c = 'Organisation', RecordTypeId = OrmAssessmentController.getOrganisationRecordTypeId()));
       } 
        insert assessmentOrg;
        return assessmentOrg;
    }
     /**
   * @author : David
   * @date : 14/11/2018
   * @description :generate   list of organisation
   */
    public static List<Account> generateOrganisation()
    {
        List<Account> organisations = new List<Account>();
        for(Integer i=0;i<20; i++)
        {
            organisations.add(new Account(Name='organisation'+ i,RecordTypeId=OrmOrganisationController.getOrganisationRecordTypeId()));
       } 
        insert organisations;
        return organisations;
    }
        /**
   * @author : David
   * @date : 14/11/2018
   * @description :generate   list of Activity
   */
    public static List<Assessment__c> generateActivity(String  idAssessment)
    {
        List<Assessment__c> activities = new List<Assessment__c>();
        for(Integer i=0;i<20; i++)
        {
            activities.add(new Assessment__c(Name='activity'+i,orm_assessment__c=idAssessment,RecordTypeId = OrmActivityController.getActivityRecordTypeId()));
       } 
        insert activities;
        return activities;
    }
   /**
   * @author : David
   * @date : 15/11/2018
   * @description :generate   list of Risk
   */
    public static List<Macro> generateRisk()
    {
        List<Macro> risques = new List<Macro>();
        for(Integer i=0;i<20; i++)
        {
            risques.add(new Macro(Name='risk'+i,orm_categorieRisk__c='Budget Risk',RecordTypeId=OrmRiskController.getRiskRecordTypeId()));
       } 
        insert risques;
        return risques;
    }
       /**
   * @author : David
   * @date : 15/11/2018
   * @description :generate   list of AssessmentRisk
   */
    public static List<orm_assessmentRisk__c> generateAssessmentRisk(String  idAssessment , String idRisk)
    {
        List<orm_assessmentRisk__c> assessmentRisques = new List<orm_assessmentRisk__c>();
        for(Integer i=0;i<20; i++)
        {
            assessmentRisques.add(new orm_assessmentRisk__c(orm_Risk__c = idRisk ,orm_assessment__c = idAssessment));
       } 
        insert assessmentRisques;
        return assessmentRisques;
    }
           /**
   * @author : David
   * @date : 15/11/2018
   * @description :generate   list of AssessmentRiskForTable
   */
    public static List<Pricebook2> generateAssessmentRiskForTable(String  idAssessment)
    {
        List<Pricebook2> AssessmentRiskForTable = new List<Pricebook2>();
        for(Integer i=0;i<20; i++)
        {
            AssessmentRiskForTable.add(new Pricebook2(Name = 'priceBook' ,orm_assessmentRisk__c = idAssessment));
       } 
        insert AssessmentRiskForTable;
        return AssessmentRiskForTable;
    }
}