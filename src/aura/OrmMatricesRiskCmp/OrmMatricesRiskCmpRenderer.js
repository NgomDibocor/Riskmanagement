({
	afterRender: function (component, helper) {
      this.superAfterRender();
      
		var data = component.get("v.data");
		if(data.orm_probability__c == 'Probable'){
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("11").innerHTML= 'Moderate';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("12").innerHTML= 'Major';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("13").innerHTML= 'Severe';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("14").innerHTML= 'Severe';
		   }
		}
		if(data.orm_probability__c == 'Possible'){
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("21").innerHTML= 'Minor';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("22").innerHTML= 'Moderate';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("23").innerHTML= 'Major';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("24").innerHTML= 'Severe';
		   }
		}
		if(data.orm_probability__c == 'Unlikely'){
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("31").innerHTML= 'Minor';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("32").innerHTML= 'Moderate';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("33").innerHTML= 'Moderate';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("34").innerHTML= 'Major';
		   }
		}
		if(data.orm_probability__c == 'Rare'){
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("41").innerHTML= 'Minor';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("42").innerHTML= 'Minor';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("43").innerHTML= 'Minor';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("44").innerHTML= 'Moderate';
		   }
		}
    }
	
})
