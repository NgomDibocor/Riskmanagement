public with sharing class OrmWorkShopFactory {
    
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