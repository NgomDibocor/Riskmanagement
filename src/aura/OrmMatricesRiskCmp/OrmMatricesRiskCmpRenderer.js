({
	afterRender: function (component, helper) {
      this.superAfterRender();
       
		var data = component.get("v.data");
		console.log(JSON.stringify(data))
		if(data != undefined){
		    if(data.orm_probability__c == 'Probable'){
		    // health and safety
			   if(data.orm_healthAndSafety__c == 'Low'){
			      document.getElementById("hs11").innerHTML= '1';
			   }
			   if(data.orm_healthAndSafety__c == 'Medium'){
			      document.getElementById("hs12").innerHTML= '1';
			   }
			   if(data.orm_healthAndSafety__c == 'High'){
			      document.getElementById("hs13").innerHTML= '1';
			   }
			   if(data.orm_healthAndSafety__c == 'VeryHigh'){
			      document.getElementById("hs14").innerHTML= '1';
			   }
			   //end health and safety
			   
			   //security
			   if(data.orm_security__c == 'Low'){
			      document.getElementById("sec11").innerHTML= '1';
			   }
			   if(data.orm_security__c == 'Medium'){
			      document.getElementById("sec12").innerHTML= '1';
			   }
			   if(data.orm_security__c == 'High'){
			      document.getElementById("sec13").innerHTML= '1';
			   }
			   if(data.orm_security__c == 'VeryHigh'){
			      document.getElementById("sec14").innerHTML= '1';
			   }
			   //end security
			   
			   //Environment and Com
			   if(data.orm_environment__c == 'Low'){
			      document.getElementById("env11").innerHTML= '1';
			   }
			   if(data.orm_environment__c == 'Medium'){
			      document.getElementById("env12").innerHTML= '1';
			   }
			   if(data.orm_environment__c == 'High'){
			      document.getElementById("env13").innerHTML= '1';
			   }
			   if(data.orm_environment__c == 'VeryHigh'){
			      document.getElementById("env14").innerHTML= '1';
			   }
			   //Environment and Com
			}
		if(data.orm_probability__c == 'Possible'){
		  //health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("hs21").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("hs22").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("hs23").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("hs24").innerHTML= '1';
		   }
		   //end health and safety
		   
		   //security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById("sec21").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById("sec22").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById("sec23").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById("sec24").innerHTML= '1';
		   }
		   //end security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById("env21").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById("env22").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById("env23").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById("env24").innerHTML= '1';
		   }
		   //End Environment and Com
		}
		if(data.orm_probability__c == 'Unlikely'){
		//health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("hs31").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("hs32").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("hs33").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("hs34").innerHTML= '1';
		   }
		   //end health and safety
		   
		   //security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById("sec31").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById("sec32").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById("sec33").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById("sec34").innerHTML= '1';
		   }
		   //security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById("env31").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById("env32").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById("env33").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById("env34").innerHTML= '1';
		   }
		   //End Environment and Com
		}
		if(data.orm_probability__c == 'Rare'){
		// health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("hs41").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("hs42").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("hs43").innerHTML= '1';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("hs44").innerHTML= '1';
		   }
		   //end health and safety
		   
		   // security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById("sec41").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById("sec42").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById("sec43").innerHTML= '1';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById("sec44").innerHTML= '1';
		   }
		   //end security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById("env41").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById("env42").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById("env43").innerHTML= '1';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById("env44").innerHTML= '1';
		   }
		   //End Environment and Com
		}
	  }
		
    }
	
})
