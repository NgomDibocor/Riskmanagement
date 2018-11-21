trigger ormMeasureTrigger on Assessment__c (before delete) {
    

    
     if(Trigger.isBefore)
     { 
		if(Trigger.isDelete)
		 {
		 	List<Product2> measureProgressions = new List<Product2>();
		 	for(Assessment__c measure : Trigger.Old) 
		 	{
				measureProgressions.addAll([SELECT Id FROM Product2 WHERE orm_measures__c =: measure.Id AND RecordTypeId =:OrmMeasureController.getMeasureProgressionRecordTypeId()]);
		    }
		    delete measureProgressions;
         }
     }
}