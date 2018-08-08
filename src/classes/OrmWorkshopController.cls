/**
 * WorkshopController
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description 
 * @history 
 * 2018-07-31 : Salimata NGOM - Implementation
 */
public with sharing class OrmWorkshopController {
 /**
 * 
 *getWorkshopRecordTypeId
 * @author Salimata NGOM
 * @version 1.0
 * @description get recordTypeId for workshop 
 * @history 
 * 2018-07-31 : Salimata NGOM - Implementation
 */
  @AuraEnabled 
    public static Id getWorkshopRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Contract.getRecordTypeInfosByName()
                  .get('orm RT workShop').getRecordTypeId();
        return RecordTypeId;
    }

 /**
 * 
 * 
 * @author Salimata NGOM
 * @version 1.0
 * @description get all workshop by assessment
 * @history 
 * 2018-08-02 : Salimata NGOM - Implementation
 */
 
 
  @AuraEnabled 
    public static List<Contract> findWorkshopByAssessment(String asssessment){
        List<Contract> allworkshop = new List<Contract>();
        allworkshop = [Select Id, Name,StartDate,orm_Contract_End_Date__c, CompanySignedDate, orm_Assessment__c,Description
                    From Contract where orm_Assessment__c=:asssessment and RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId() 
                    order by Name];
        return allworkshop; 
    }
    
 /**
 * 
 * 
 * @author Salimata NGOM
 * @version 1.0
 * @description get account  by assessment
 * @history 
 * 2018-08-02 : Salimata NGOM - Implementation
 */
  @AuraEnabled 
    public static List<Contract> findAccountByAssessment(String asssessment){
        List<Contract> allworkshop = new List<Contract>();
        allworkshop = [Select Id, Name,StartDate,orm_Contract_End_Date__c, CompanySignedDate, orm_Assessment__c,Description
                    From Contract where orm_Assessment__c=:asssessment and RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId() 
                    order by Name];
        return allworkshop; 
    }
    
 /**
 * 
 * 
 * @author Salimata NGOM
 * @version 1.0
 * @description method to add workshop
 * @history 
 * 2018-08-01 : Salimata NGOM - Implementation
 */   
    @AuraEnabled
	public static Contract addWorkShop(Contract item){        
       item.RecordTypeId = OrmWorkshopController.getWorkshopRecordTypeId();
		upsert item;
		return item;
	}
	
/**
 * save List workshop
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method for update records workshop after inline editing
 * @history 
 * 2018-08-03 : Salimata NGOM - Implementation
 */ 
     
    @AuraEnabled
    public static List <Contract> saveWorkShop(List<Contract> lstWorkshop) {
        update lstWorkshop;
        return lstWorkshop;
    }
    
}