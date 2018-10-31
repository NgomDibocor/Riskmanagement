/**
 * @author: Dibocor NGOM
 * @date: 15/10/2018
 * @description: generer les données de test
 */
public with sharing class Orm_TestFactory {
    /**
   * @author : David
   * @date : 17/10/2018
   * @description :generer une liste d'assessment
   */
    public static List<Assessment__c> generateAssessment()
    {
        List<Assessment__c> assessment = new List<Assessment__c>();
        for(Integer i=0;i<20; i++)
        {
            assessment.add(new Assessment__c(Name='assessment'+ i));
        } 
        insert assessment;
        return assessment;
    }
  /**
   * @author : Salimata NGOM
   * @date : 30/10/2018
   * @description :generate list of workshop
   */
    public static List<Contract> generateWorkshop(){
    	List<Contract> listWorkshop=new List<Contract> ();
    	 for(Integer i=0;i<20; i++)
        {
        	listWorkshop.add (new Contract(Name='workshop'+i,RecordTypeId=OrmWorkshopController.getWorkshopRecordTypeId()));
        }
        insert listWorkshop;
        return listWorkshop;
        }
    
}