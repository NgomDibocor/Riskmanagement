public with sharing class OrmAssessmentRiskController {
  
    public static Id getAssessmentRiskRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.orm_assessmentRisk__c.getRecordTypeInfosByName()
                  .get('orm RT asssessmentRisk').getRecordTypeId();
        return recordTypeId;
    }
    
    public static Id getCauseRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT cause').getRecordTypeId();
        return RecordTypeId;
    }
    
    public static Id getImpactRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT impact').getRecordTypeId();
        return RecordTypeId;
    }
    
    /**
	 *
	 * @author David Diop
	 * @version 1.0
	 * @description  this method returns all assessments of user connected
	 * @history 
	 * 2018-07-20 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static List<orm_assessmentRisk__c> findAll()
    {
       return  [Select Id,Name,orm_security__c,orm_date__c,orm_cost__c,orm_environmentAndCommunity__c,
                          orm_frequency__c,orm_healthAndSafety__c,orm_manageAbility__c,orm_phase__c,orm_productionLoss__c,orm_reputation__c,
                          orm_schedule__c,orm_status__c,orm_vulnerability__c,orm_assessment__c,
                          orm_Risk__r.Name,orm_assumption__r.Name,orm_assessment__r.Name, orm_assessment__r.orm_description__c From orm_assessmentRisk__c];
    }
    
     /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns all assessments of user connected
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static Map<String, Map<String, Object>> getAssessmentRisks()
    {
    	//get the number of risk for each assessment
        List<AggregateResult> agrResults =  [Select orm_assessment__r.Id, orm_assessment__r.Name,  
                                             count(orm_Risk__c) nbRisk
                                             From orm_assessmentRisk__c 
                                             GROUP BY orm_assessment__r.Name, orm_assessment__r.Id ];
                                             //Where CreatedById = :UserInfo.getUserId()

        // mapIdAssessmentNbRisk is a map that contains the id and number of Risk of each Assessment
        Map<Id, Integer> mapIdAssessmentNbRisk = new Map<Id, Integer>();
        for (AggregateResult ar: agrResults){
          mapIdAssessmentNbRisk.put(ar.get('Id').toString(), (Integer)ar.get('nbRisk'));
        }   
        //get all assessment with Id in mapIdAssessmentNbRisk
        List<Assessment__c> assessments = [Select Id, Name, orm_description__c, orm_objectif__c 
                              From Assessment__c  
                              WHERE Id IN : mapIdAssessmentNbRisk.keySet() ];                                 
         //for each assessment, we have the number of risk and the assessment informations
        Map<String, Map<String, Object>> mapObjects = new Map<String, Map<String, Object>>();  
        for (Assessment__c assess: assessments){
           mapObjects.put(assess.Id,  new Map<String, Object>{'nbreRisk' => mapIdAssessmentNbRisk.get(assess.Id), 'assessment' => assess});   
        }    
        
        return mapObjects;
        
    }
     
    /**
	 *
	 * @author David Diop
	 * @version 1.0
	 * @description  this method returns all assessmentRisks of user connected
	 * @history 
	 * 2018-07-20 : David Diop - Implementation
	 */
    @AuraEnabled 
    public static Map<String, Map<String, Object>> getRisks()
    {
        List<AggregateResult> agrResults =  [Select orm_assessmentRisk__r.Id, 
                                             count(Name) nbCause
                                             From Macro WHERE  RecordTypeId =:OrmAssessmentRiskController.getCauseRecordTypeId()
                                             GROUP BY orm_assessmentRisk__r.Id ];
        
        // mapIdAssessmentNbRisk is a map that contains the id and number of Risk of each Assessment
        Map<Id, Integer> mapIdAssessmentNbRisk = new Map<Id, Integer>();
        for (AggregateResult ar: agrResults){
          mapIdAssessmentNbRisk.put(ar.get('Id').toString(), (Integer)ar.get('nbCause'));
        }   
       
         
        //get all assessment with Id in mapIdAssessmentNbRisk
        List<orm_assessmentRisk__c> assessmentRisks = [Select Id,orm_assessment__r.Name,orm_Risk__r.Name
                              From orm_assessmentRisk__c  
                              WHERE Id IN : mapIdAssessmentNbRisk.keySet() ];                               
         
        Map<String, Map<String, Object>> mapObjects = new Map<String, Map<String, Object>>();  
        for (orm_assessmentRisk__c assess: assessmentRisks){
           mapObjects.put(assess.Id ,  new Map<String, Object>{'nbreCause' => mapIdAssessmentNbRisk.get(assess.Id), 'assessmentRisk' => assess});  
        }  
      
        return mapObjects;
        
    }
    
     /**
	 *
	 * @author David Diop
	 * @version 1.0
	 * @description  this method allows to add assessment
	 * @history 
	 * 2018-07-20 : David Diop - Implementation
	 */
    @AuraEnabled
    public static orm_assessmentRisk__c add (orm_assessmentRisk__c item){
        if(item!=null){
            upsert item;
            return item;
        }   
        return item;
        
    }
    
     /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns an assessment
	 * @history 
	 * 2018-07-24 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static Assessment__c getAssessment(String idAss){
        return OrmAssessmentController.getAssessment(idAss);
    }
}