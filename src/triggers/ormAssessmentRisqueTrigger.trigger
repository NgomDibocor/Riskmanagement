trigger ormAssessmentRisqueTrigger on orm_assessmentRisk__c (before delete) {
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