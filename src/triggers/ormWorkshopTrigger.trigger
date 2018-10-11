trigger ormWorkshopTrigger on Contract (before delete) {
	   
         if(Trigger.isBefore)
     {
		if(Trigger.isDelete)
		 {
		 	List<orm_ContactWorkshop__c> contactWorkshopList = new List<orm_ContactWorkshop__c>();
		 	 for(Contract workshop : Trigger.Old) {
				contactWorkshopList.addAll([SELECT Id FROM orm_ContactWorkshop__c WHERE orm_workshop__c =:workshop.Id AND RecordTypeId =: OrmContactController.getContactWorkshopRecordTypeId()]);
			}	
			
			delete contactWorkshopList;
		 }
    }
    
}