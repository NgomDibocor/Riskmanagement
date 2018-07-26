public class OrmOrganisationController {
	public static Id getOrganisationRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName()
                  .get('RT organisation').getRecordTypeId();
        return recordTypeId;
    }
    
    @AuraEnabled 
    public static List<Account> getOrganisations(){
        List<Account> accounts = new List<Account>();
        accounts = [Select Id, Name, Description, orm_region__c, orm_pays__c
                    From Account where RecordTypeId=: OrmOrganisationController.getOrganisationRecordTypeId() 
                    order by Name desc LIMIT 8 ];
        return accounts;
    }
    
    @AuraEnabled 
    public static Account getOrganisation(String id){
        return [Select Id, Name, Description, orm_region__c, orm_pays__c From Account where Id=: id];
    }
    
    @AuraEnabled 
    public static Account editOrganisation(Account item)
    {
      item.RecordTypeId=OrganisationController.getOrganisationRecordTypeId();
      upsert item;
      return item; 
    }
    
    @AuraEnabled
    public static Account add(Account item){
    	item.RecordTypeId=OrganisationController.getOrganisationRecordTypeId();
    	upsert item;
    	return item;
    }
    
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
    
    @AuraEnabled
    public static Account deleteOrg(Account item){
        delete item;
        return item;
    }    
}