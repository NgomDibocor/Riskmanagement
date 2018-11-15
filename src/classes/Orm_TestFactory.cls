/**
 * @author: Dibocor NGOM
 * @date: 15/10/2018
 * @description: generer les données de test
 */
public with sharing class Orm_TestFactory {
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
   * @author : Salimata NGOM
   * @date : 15/11/2018
   * @description :generate list of workshop
   */
    public static List<Contract> generateWorkshop(String idAssessment,String idOrganisation){
    	
    	List<Contract> listWorkshop=new List<Contract> ();
    	 for(Integer i=0;i<20; i++)
        {
        	listWorkshop.add (new Contract(Name='workshop'+i,orm_assessment__c=idAssessment,AccountId=idOrganisation,
        	RecordTypeId=OrmWorkshopController.getWorkshopRecordTypeId()));
        }
        insert listWorkshop;
        return listWorkshop;
        }
    
}