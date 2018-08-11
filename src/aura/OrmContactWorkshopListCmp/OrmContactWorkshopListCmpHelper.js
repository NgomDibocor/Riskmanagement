({
	checkContactWorkshop : function(Idcontact,contactWorkshopList) {
<<<<<<< HEAD

	contactWorkshopList.forEach (function(contactworkshop){
                  	if(contactworkshop.orm_contact__c == Idcontact){
                 return true;
                  }
                  });
                  return false;
               
                  		
=======
	contactWorkshopList.forEach (function(contactworkshop){
	
	if(contactworkshop.orm_contact__c = Idcontact){
	console.log(contactworkshop.orm_contact__c+' / '+Idcontact);
	return true;
	}
	});
	return false;
		
>>>>>>> 7fb370c90b153aa956d440b051826e2f5f84b3b8
	}
	
})