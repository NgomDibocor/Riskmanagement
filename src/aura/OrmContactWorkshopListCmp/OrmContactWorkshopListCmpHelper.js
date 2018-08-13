({
	checkContactWorkshop : function(Idcontact,contactWorkshopList) {

	contactWorkshopList.forEach (function(contactworkshop){
                  	if(contactworkshop.orm_contact__c == Idcontact){
                 return true;
                  }
                  });
                  return false;
               
                  		
	}
	
})