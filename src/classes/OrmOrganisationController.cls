/**
 *
 * @author Dibocor NGOM
 * @version 1.0
 * @description  this class contains methods of Organisation
 * @history 
 */
public class OrmOrganisationController {
	
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns the recordTypeId of Organisation
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
	public static Id getOrganisationRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName()
                  .get('RT organisation').getRecordTypeId();
        return recordTypeId;
    }
    
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns all Organisations
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static List<Account> getOrganisations(){
        List<Account> accounts = new List<Account>();
        accounts = [Select Id, Name, Description, orm_region__c, orm_pays__c
                    From Account where RecordTypeId=: OrmOrganisationController.getOrganisationRecordTypeId() 
                    order by Name];
        return accounts;
    }
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns one Organisation
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static Account getOrganisation(String id){
        return [Select Id, Name, Description, orm_region__c, orm_pays__c From Account where Id=: id];
    }
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method adds and modifies an organisation
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled
    public static Account add(Account item){
    	item.RecordTypeId=OrganisationController.getOrganisationRecordTypeId();
    	upsert item;
    	return item;
    }
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns all items of PickList
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */  
    @AuraEnabled
	public static List <String> getSelectOptions(sObject objObject, string fld) {
      List <String> allOpts = new list <String> ();
      // Get the object type of the SObject.
      Schema.sObjectType objType = objObject.getSObjectType();
     
      // Describe the SObject using its object type.
      Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
     
      // Get a map of fields for the SObject
      map <String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
     
      // Get the list of picklist values for this field.
      list <Schema.PicklistEntry> values =
       fieldMap.get(fld).getDescribe().getPickListValues();
     
      // Add these values to the selectoption list.
      for (Schema.PicklistEntry a: values) {
      	allOpts.add(a.getValue());
      }
        
      system.debug('allOpts ---->' + allOpts);
      allOpts.sort();
      return allOpts;
 	}
  
}