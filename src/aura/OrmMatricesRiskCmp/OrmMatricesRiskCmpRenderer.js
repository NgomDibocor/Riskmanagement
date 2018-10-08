({
	afterRender: function (component, helper) {
      this.superAfterRender();
       
		var data = component.get("v.data");
		console.log(JSON.stringify(data))
		if(data != undefined){
		    if(data.orm_probability__c == 'Probable'){
		    // health and safety
			   if(data.orm_healthAndSafety__c == 'Low'){
			      document.getElementById("hs11").innerHTML= 'X';
			   }
			   if(data.orm_healthAndSafety__c == 'Medium'){
			      document.getElementById("hs12").innerHTML= 'X';
			   }
			   if(data.orm_healthAndSafety__c == 'High'){
			      document.getElementById("hs13").innerHTML= 'X';
			   }
			   if(data.orm_healthAndSafety__c == 'VeryHigh'){
			      document.getElementById("hs14").innerHTML= 'X';
			   }
			   //end health and safety
			   
			   //security
			   if(data.orm_security__c == 'Low'){
			      document.getElementById("sec11").innerHTML= 'X';
			   }
			   if(data.orm_security__c == 'Medium'){
			      document.getElementById("sec12").innerHTML= 'X';
			   }
			   if(data.orm_security__c == 'High'){
			      document.getElementById("sec13").innerHTML= 'X';
			   }
			   if(data.orm_security__c == 'VeryHigh'){
			      document.getElementById("sec14").innerHTML= 'X';
			   }
			   //end security
			   
			   //Environment and Com
			   if(data.orm_environment__c == 'Low'){
			      document.getElementById("env11").innerHTML= 'X';
			   }
			   if(data.orm_environment__c == 'Medium'){
			      document.getElementById("env12").innerHTML= 'X';
			   }
			   if(data.orm_environment__c == 'High'){
			      document.getElementById("env13").innerHTML= 'X';
			   }
			   if(data.orm_environment__c == 'VeryHigh'){
			      document.getElementById("env14").innerHTML= 'X';
			   }
			   //Environment and Com
			   
			   //Reputation
			   if(data.orm_reputation__c == 'Low'){
			      document.getElementById("rep11").innerHTML= 'X';
			   }
			   if(data.orm_reputation__c == 'Medium'){
			      document.getElementById("rep12").innerHTML= 'X';
			   }
			   if(data.orm_reputation__c == 'High'){
			      document.getElementById("rep13").innerHTML= 'X';
			   }
			   if(data.orm_reputation__c == 'VeryHigh'){
			      document.getElementById("rep14").innerHTML= 'X';
			   }
			   //end Reputation
			   
			   //working env
			   if(data.orm_workingEnvironment__c == 'One employee considers resigning'){
			      document.getElementById("we11").innerHTML= 'X';
			   }
			   if(data.orm_workingEnvironment__c == 'Several employees consider resigning'){
			      document.getElementById("we12").innerHTML= 'X';
			   }
			   if(data.orm_workingEnvironment__c == 'One employee resigns'){
			      document.getElementById("we13").innerHTML= 'X';
			   }
			   if(data.orm_workingEnvironment__c == 'Several employees resign'){
			      document.getElementById("we14").innerHTML= 'X';
			   }
			   //end working env
			}
		if(data.orm_probability__c == 'Possible'){
		  //health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("hs21").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("hs22").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("hs23").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("hs24").innerHTML= 'X';
		   }
		   //end health and safety
		   
		   //security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById("sec21").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById("sec22").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById("sec23").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById("sec24").innerHTML= 'X';
		   }
		   //end security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById("env21").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById("env22").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById("env23").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById("env24").innerHTML= 'X';
		   }
		   //End Environment and Com
		   
		   //Reputation
		   if(data.orm_reputation__c == 'Low'){
		      document.getElementById("rep21").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'Medium'){
		      document.getElementById("rep22").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'High'){
		      document.getElementById("rep23").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'VeryHigh'){
		      document.getElementById("rep24").innerHTML= 'X';
		   }
		   //End Reputation
		   
		   //Working Env
		   if(data.orm_workingEnvironment__c == 'One employee considers resigning'){
		      document.getElementById("we21").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees consider resigning'){
		      document.getElementById("we22").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'One employee resigns'){
		      document.getElementById("we23").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees resign'){
		      document.getElementById("we24").innerHTML= 'X';
		   }
		   //Working Env
		}
		if(data.orm_probability__c == 'Unlikely'){
		//health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("hs31").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("hs32").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("hs33").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("hs34").innerHTML= 'X';
		   }
		   //end health and safety
		   
		   //security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById("sec31").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById("sec32").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById("sec33").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById("sec34").innerHTML= 'X';
		   }
		   //security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById("env31").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById("env32").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById("env33").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById("env34").innerHTML= 'X';
		   }
		   //End Environment and Com
		   
		   //Repuatation
		   if(data.orm_reputation__c == 'Low'){
		      document.getElementById("rep31").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'Medium'){
		      document.getElementById("rep32").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'High'){
		      document.getElementById("rep33").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'VeryHigh'){
		      document.getElementById("rep34").innerHTML= 'X';
		   }
		   //End Repuatation
		   
		   //Working Env
		   if(data.orm_workingEnvironment__c == 'One employee considers resigning'){
		      document.getElementById("we31").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees consider resigning'){
		      document.getElementById("we32").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'One employee resigns'){
		      document.getElementById("we33").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees resign'){
		      document.getElementById("we34").innerHTML= 'X';
		   }
		   //End Working Env
		}
		if(data.orm_probability__c == 'Rare'){
		// health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById("hs41").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById("hs42").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById("hs43").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById("hs44").innerHTML= 'X';
		   }
		   //end health and safety
		   
		   // security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById("sec41").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById("sec42").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById("sec43").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById("sec44").innerHTML= 'X';
		   }
		   //end security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById("env41").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById("env42").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById("env43").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById("env44").innerHTML= 'X';
		   }
		   //End Environment and Com
		   
		   //Reputation
		   if(data.orm_reputation__c == 'Low'){
		      document.getElementById("rep41").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'Medium'){
		      document.getElementById("rep42").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'High'){
		      document.getElementById("rep43").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'VeryHigh'){
		      document.getElementById("rep44").innerHTML= 'X';
		   }
		   //End Reputation
		   
		   //Working env
		   if(data.orm_workingEnvironment__c == 'One employee considers resigning'){
		      document.getElementById("we41").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees consider resigning'){
		      document.getElementById("we42").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'One employee resigns'){
		      document.getElementById("we43").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees resign'){
		      document.getElementById("we44").innerHTML= 'X';
		   }
		   //End Working env
		}
	  }
		
    }
	
})
