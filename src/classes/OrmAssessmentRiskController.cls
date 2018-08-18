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
    public static Id getMeasureRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Measure').getRecordTypeId();
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
	 * @description  this method returns all assessments that user connected has created or the user connected is responsible
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
                                             Where orm_assessment__r.orm_projetManager__c = :UserInfo.getUserId() 
                                                or CreatedById = :UserInfo.getUserId()
                                                or orm_assessment__r.orm_riskManager__c = :UserInfo.getUserId() 
                                                or orm_assessment__r.orm_organisationManager__c = :UserInfo.getUserId()
                                             GROUP BY orm_assessment__r.Name, orm_assessment__r.Id ];
                                             //Where CreatedById = :UserInfo.getUserId()

        // mapIdAssessmentNbRisk is a map that contains the id and number of Risk of each Assessment
        Map<Id, Integer> mapIdAssessmentNbRisk = new Map<Id, Integer>();
        for (AggregateResult ar: agrResults){
          mapIdAssessmentNbRisk.put(ar.get('Id').toString(), (Integer)ar.get('nbRisk'));
        } 
        
        // This list contains the assessments that don't have risk
        List<Assessment__c> AssessmentDontHaveRisk = [Select Id 
                                                      From Assessment__c 
                                                      Where (RecordTypeId =: OrmAssessmentController.getOrganisationRecordTypeId()
                                                          or RecordTypeId =: OrmAssessmentController.getProjetRecordTypeId()
                                                          or RecordTypeId =: OrmAssessmentController.getProcessusRecordTypeId()
                                                            ) 
                                                      And   (orm_assessment__r.orm_projetManager__c = :UserInfo.getUserId() 
		                                                  or CreatedById = :UserInfo.getUserId()
		                                                  or orm_assessment__r.orm_riskManager__c = :UserInfo.getUserId() 
		                                                  or orm_assessment__r.orm_organisationManager__c = :UserInfo.getUserId()
		                                                    )
                                                      And Id NOT IN :mapIdAssessmentNbRisk.keySet()];
        
        //mapAssessmentDontHaveRisk is a map that contains id of assessments that don't have risk 
        Map<Id, Integer> mapAssessmentDontHaveRisk = new Map<Id, Integer>();
        
        for (Assessment__c assessment: AssessmentDontHaveRisk){
          mapAssessmentDontHaveRisk.put(assessment.get('Id').toString(), 0);
        }
        
        // add mapAssessmentDontHaveRisk entries to mapIdAssessmentNbRisk
        mapIdAssessmentNbRisk.putAll(mapAssessmentDontHaveRisk);
        
        //get all assessment with Id in mapIdAssessmentNbRisk
        List<Assessment__c> assessments = [Select Id, Name, orm_description__c, orm_objectif__c 
                              From Assessment__c  
                              WHERE Id IN : mapIdAssessmentNbRisk.keySet() ]; // And                                 
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
    public static List<List<String>> getAllAssessmentRisks()
    {
        List<orm_assessmentRisk__c> assRiskList = [Select id, orm_Risk__r.Name, orm_Risk__r.Description,orm_assessment__r.Id,
                       (SELECT id 
                        FROM Macros__r 
                        WHERE RecordTypeId =: OrmAssessmentRiskController.getCauseRecordTypeId()),
                       (SELECT id FROM Assessments__r 
                        WHERE RecordTypeId =: OrmAssessmentRiskController.getMeasureRecordTypeId())
                        FROM orm_assessmentRisk__c  ];
        
         //Map<Id, Map<String, Map<String, Object>>> mapIdAssessmentNbRisk = new Map<Id, Map<String, Map<String, Object>>>;
         List<List<String>> listAssRisk = new List<List<String>>();
         for (orm_assessmentRisk__c assRisk: assRiskList){
            List<String> info = new List<String>();
               info.add(assRisk.id);
               info.add(assRisk.orm_Risk__r.Name);
               info.add(assRisk.orm_Risk__r.Description);
               if (assRisk.getsobjects('Assessments__r') != null){
               	   info.add(String.valueOf(assRisk.getsobjects('Assessments__r').size()));
               }else{ 
	           	   info.add('0');
	              
               }
               if (assRisk.getsobjects('Macros__r') != null){
               	   info.add(String.valueOf(assRisk.getsobjects('Macros__r').size()));
               }else{ 
	           	   info.add('0');
	               
               }
               info.add(assRisk.orm_assessment__r.Id);
               listAssRisk.add(info);
               //info.add(assRisk.Id);
            }
          return listAssRisk;
          
        
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
    
    /**
	 *
	 * @author Dibocor NGOM
	 * @version 1.0
	 * @description  this method returns all assessment informations for the show
	 * @history 
	 * 2018-08-02 : Dibocor NGOM - Implementation
	 */
    @AuraEnabled 
    public static orm_assessmentRisk__c getAssessmentByIdAssRisk(String idAssRisk){
        return [Select Id, orm_assessment__r.Id, orm_assessment__r.Name, orm_assessment__r.orm_description__c, orm_assessment__r.orm_typeAssessment__c, 
         			   orm_assessment__r.orm_objectif__c, 
                       orm_assessment__r.orm_typeProjet__c, orm_assessment__r.orm_clientIndustrySector__c, 
                       orm_assessment__r.orm_statusAssessment__c, orm_assessment__r.orm_currency__c,
                       orm_assessment__r.orm_schedule__c, orm_assessment__r.orm_riskManager__c,
                       orm_assessment__r.orm_riskManager__r.Name, orm_assessment__r.orm_projetManager__c, 
                       orm_assessment__r.orm_projetManager__r.Name, orm_assessment__r.orm_pilote__c, 
                       orm_assessment__r.orm_copilote__c, orm_assessment__r.orm_startDate__c, 
                       orm_assessment__r.orm_endDate__c, orm_assessment__r.orm_commercialBudget__c,
                       orm_assessment__r.orm_maxCostExposture__c, orm_assessment__r.orm_max_schedule_exposture__c,
                       orm_assessment__r.orm_finaliteProcessus__c, orm_assessment__r.orm_referenceProcessus__c, 
                       orm_assessment__r.orm_applicationDateProcessus__c, orm_assessment__r.orm_organisation__c, 
                       orm_assessment__r.orm_organisation__r.Name, orm_assessment__r.orm_client_name__c, 
                       orm_assessment__r.orm_size__c, orm_assessment__r.orm_organisationIndustrySector__c,
                       orm_assessment__r.orm_budgetOrganisation__c,orm_assessment__r.orm_organisationManager__c, 
                       orm_assessment__r.orm_organisationManager__r.Name, orm_assessment__r.orm_pays__c, 
                       orm_assessment__r.orm_region__c
                From orm_assessmentRisk__c
                Where Id = : idAssRisk ];
         
    }
}