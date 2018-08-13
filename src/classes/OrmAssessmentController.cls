/**
 *
 * @author Dibocor NGOM
 * @version 1.0
 * @description  this class contains methods of assessment
 * @history 
 */
public class OrmAssessmentController {
	
  /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns the recordTypeId of Organisation
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    public static Id getOrganisationRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Organisation').getRecordTypeId();
        return recordTypeId;
    }
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns the recordTypeId of Projet
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    public static Id getProjetRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Projet').getRecordTypeId();
        return recordTypeId;
    }
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns the recordTypeId of Processus
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    public static Id getProcessusRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Processus').getRecordTypeId();
        return recordTypeId;
    }
    
	/**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method adds and modifies an assessment
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled
	public static Assessment__c add(Assessment__c item){
        if( item.orm_typeAssessment__c == 'Organisation'){
            item.RecordTypeId=OrmAssessmentController.getOrganisationRecordTypeId();
        }
        if( item.orm_typeAssessment__c == 'Projet'){
            item.RecordTypeId=OrmAssessmentController.getProjetRecordTypeId();
        }
        if( item.orm_typeAssessment__c == 'Processus'){
            item.RecordTypeId=OrmAssessmentController.getProcessusRecordTypeId();
        }
		upsert item;
		return item;
	}
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns all assessments
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static List<Assessment__c> findAll(){
        List<Assessment__c> assessments = new List<Assessment__c>();
        assessments = [Select Id, Name, orm_description__c 
                       From Assessment__c 
                       order by Name desc LIMIT 6 ];
        return assessments;
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
    
	/**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns the Organisations
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static List<Account> getOrganisations(){
        return OrmOrganisationController.getOrganisations();
    }
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns a single assessment
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled
    public static List<Assessment__c> findAllActiviteByAssessment(string idAssessment){
        return OrmActivityController.findAllActivity();
    }
    
    /**
	 *
	 * @author Abdoulaye Diop
	 * @version 1.0
	 * @description  this method returns all causes of Assessment
	 * @history 
	 * 2018-07-24 : Abdoulaye Diop - Implementation
	 */
    @AuraEnabled
    public static List<Macro> findAllCauseByAssessment(string idAssessment){
    	return OrmCauseController.findAll();
    }
    
    public static Assessment__c getSingleAssessment(){
        return [SELECT Id FROM Assessment__c LIMIT 1];
    } 
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns all assessments
	 * @history 
	 * 2018-08-02 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static Assessment__c getAssessment(String idAss){
        return [Select Id, Name, orm_description__c, orm_typeAssessment__c, orm_objectif__c, 
                       orm_typeProjet__c, orm_clientIndustrySector__c, orm_statusAssessment__c, orm_currency__c,
                       orm_schedule__c, orm_riskManager__c,orm_riskManager__r.Name, orm_projetManager__c, orm_projetManager__r.Name, 
                       orm_pilote__c, orm_copilote__c, orm_startDate__c, orm_endDate__c, orm_commercialBudget__c,
                       orm_maxCostExposture__c, orm_max_schedule_exposture__c, orm_finaliteProcessus__c,
                       orm_referenceProcessus__c, orm_applicationDateProcessus__c, orm_organisation__c, 
                       orm_organisation__r.Name, orm_client_name__c, orm_size__c, orm_organisationIndustrySector__c,
                       orm_budgetOrganisation__c,orm_organisationManager__c, orm_organisationManager__r.Name,
                       orm_pays__c, orm_region__c
                From Assessment__c 
                Where Id = : idAss ];
         
    }
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns all Users
	 * @history 
	 * 2018-08-07 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static List<User> getUsers(){
        return [Select Id, Name From User ];
         
    }
}