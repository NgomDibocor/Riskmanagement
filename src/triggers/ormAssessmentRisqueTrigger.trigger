trigger ormAssessmentRisqueTrigger on orm_assessmentRisk__c (before delete) {
    
     public static Id getCauseRecordTypeId()
	  {
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT cause').getRecordTypeId();
        return RecordTypeId;
      } 
       public static Id getImpactRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT impact').getRecordTypeId();
        return RecordTypeId;
    	}
	
	 public static Id getAssumptionRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Assumption').getRecordTypeId();
        return RecordTypeId;
       }
      public static Id getPhaseRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Macro.getRecordTypeInfosByName()
                  .get('RT Phase').getRecordTypeId();
        return RecordTypeId;
    	}
    	 public static Id getMeasureRecordTypeId(){
         Id recordTypeId = Schema.SObjectType.Assessment__c.getRecordTypeInfosByName()
                  .get('RT Measure').getRecordTypeId();
        return RecordTypeId;
    	}
    if(Trigger.isBefore)
     {
		if(Trigger.isDelete)
		 {
		 	List<Macro> causes = new List<Macro>();
		 	List<Macro> impacts = new List<Macro>();
		 	List<Macro> assumptions = new List<Macro>();
		 	List<Macro> phases = new List<Macro>();
		 	List<Assessment__c> measures = new List<Assessment__c>();
		 	
		 	for(orm_assessmentRisk__c assessmentRisk : Trigger.Old) {
				causes.addAll([SELECT Id FROM Macro WHERE orm_assessmentRisk__c =:assessmentRisk.Id AND RecordTypeId =: OrmCauseController.getCauseRecordTypeId() ]);
				impacts.addAll([SELECT Id FROM Macro WHERE orm_assessmentRisk__c =:assessmentRisk.Id AND RecordTypeId =: OrmImpactController.getImpactRecordTypeId() ]);		
				assumptions.addAll([SELECT Id FROM Macro WHERE orm_assessmentRisk__c =:assessmentRisk.Id AND RecordTypeId =: OrmAssumptionAssessmentRiskController.getAssumptionRecordTypeId() ]);
				phases.addAll([SELECT Id FROM Macro WHERE orm_assessmentRisk__c =:assessmentRisk.Id AND RecordTypeId =: OrmPhaseAssessmentRiskController.getPhaseRecordTypeId()]);
				measures.addAll([SELECT Id FROM Assessment__c WHERE orm_assessmentRisk__c =:assessmentRisk.Id AND RecordTypeId =: OrmMeasureController.getMeasureRecordTypeId()]);
			}	
			
			delete causes;
			delete impacts;
			delete assumptions;
			delete phases;
			delete measures;
		 }
		
	 }
}