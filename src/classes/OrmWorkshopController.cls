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
    
 /**
 * 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get method findAllContact from ContactController
 * @history 
 * 2018-08-16 : Salimata NGOM - Implementation
 */ 
     
    @AuraEnabled
     public static List<Contact> findAllContact(){
     	return OrmContactController.findAllContact();
     }
     
/**
 * 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get method findAllContactWorkshop from ContactController
 * @history 
 * 2018-08-16 : Salimata NGOM - Implementation
 */ 
     
    @AuraEnabled
     public static List<orm_ContactWorkshop__c> findAllContactWorkshop(String item){
     	return OrmContactController.findAllContactWorkshop(item);
     }
     /**
 * remove activities selected
 
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description  method for remove all workshop checked
 * @history 
 * 2018-09-05 : Salimata NGOM - Implementation
 */
 
   @AuraEnabled
 public static List < String > deleteRecordWorkshop(List < String > lstRecordId) {
  // for store Error Messages  
  List < String > oErrorMsg = new List < String > ();
  // Query Records for delete where id in lstRecordId [which is pass from client side controller] 
  List <Contract> lstDeleteRec = [select Id from Contract where id IN: lstRecordId and RecordTypeId=:OrmWorkshopController.getWorkshopRecordTypeId()];
  
  // delte contact list with Database.DeleteResult[] database class.
  // with a false second parameter to allow partial processing of records on failure.
  // Next, it iterates through the results to determine whether the operation was successful or not
  // for each record. and check if delete contact successful so print msg on debug, 
  // else add error message to oErrorMsg List and return the list  
  delete lstDeleteRec;
  return oErrorMsg;
 
 }
    
    
}