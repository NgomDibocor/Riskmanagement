trigger ormActivityTrigger on Assessment__c (before delete) {
         if(Trigger.isBefore)
     {
		if(Trigger.isDelete)
		 {
		 	List<Product2> activityProofs = new List<Product2>();
		 	 for(Assessment__c activity : Trigger.Old) {
				activityProofs.addAll([SELECT Id FROM Product2 WHERE orm_Activite__c =:activity.Id AND RecordTypeId =: OrmActivityController.getActivityProofRecordTypeId()]);
			}	
			
			delete activityProofs;
		 }
    }
}