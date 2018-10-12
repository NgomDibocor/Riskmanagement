({
	afterRender: function (component, helper) {
      this.superAfterRender();
        document.getElementById("MODERATE").style.display = "none";
        document.getElementById("SEVERE").style.display = "none";
        document.getElementById("MINOR").style.display = "none";
        document.getElementById("MAJOR").style.display = "none";
        
		var data = component.get("v.data");
		if(data != null){
		    if(data.orm_probability__c == 'Probable'){
		    // health and safety
			   if(data.orm_healthAndSafety__c == 'Low'){
			      document.getElementById('hs11').classList.add("circle-text");
			      document.getElementById('hs11').style.backgroundColor = "#414449";
			      document.getElementById("hs11").innerHTML= 'X';
			   }
			   if(data.orm_healthAndSafety__c == 'Medium'){
			      document.getElementById('hs12').classList.add("circle-text");
			      document.getElementById('hs12').style.backgroundColor = "#414449";
			      document.getElementById("hs12").innerHTML= 'X';
			   }
			   if(data.orm_healthAndSafety__c == 'High'){
			      document.getElementById('hs13').classList.add("circle-text");
			      document.getElementById('hs13').style.backgroundColor = "#414449";
			      document.getElementById("hs13").innerHTML= 'X';
			   }
			   if(data.orm_healthAndSafety__c == 'VeryHigh'){
			      document.getElementById('hs14').classList.add("circle-text");
			      document.getElementById('hs14').style.backgroundColor = "#414449";
			      document.getElementById("hs14").innerHTML= 'X';
			   }
			   //end health and safety
			   
			   //security
			   if(data.orm_security__c == 'Low'){
			      document.getElementById('sec11').classList.add("circle-text");
			      document.getElementById('sec11').style.backgroundColor = "#414449";
			      document.getElementById("sec11").innerHTML= 'X';
			   }
			   if(data.orm_security__c == 'Medium'){
			      document.getElementById('sec12').classList.add("circle-text");
			      document.getElementById('sec12').style.backgroundColor = "#414449";
			      document.getElementById("sec12").innerHTML= 'X';
			   }
			   if(data.orm_security__c == 'High'){
			      document.getElementById('sec13').classList.add("circle-text");
			      document.getElementById('sec13').style.backgroundColor = "#414449";
			      document.getElementById("sec13").innerHTML= 'X';
			   }
			   if(data.orm_security__c == 'VeryHigh'){
			      document.getElementById('sec14').classList.add("circle-text");
			      document.getElementById('sec14').style.backgroundColor = "#414449";
			      document.getElementById("sec14").innerHTML= 'X';
			   }
			   //end security
			   
			   //Environment and Com
			   if(data.orm_environment__c == 'Low'){
			      document.getElementById('env11').classList.add("circle-text");
			      document.getElementById('env11').style.backgroundColor = "#414449";
			      document.getElementById("env11").innerHTML= 'X';
			   }
			   if(data.orm_environment__c == 'Medium'){
			      document.getElementById('env12').classList.add("circle-text");
			      document.getElementById('env12').style.backgroundColor = "#414449";
			      document.getElementById("env12").innerHTML= 'X';
			   }
			   if(data.orm_environment__c == 'High'){
			      document.getElementById('env13').classList.add("circle-text");
			      document.getElementById('env13').style.backgroundColor = "#414449";
			      document.getElementById("env13").innerHTML= 'X';
			   }
			   if(data.orm_environment__c == 'VeryHigh'){
			      document.getElementById('env14').classList.add("circle-text");
			      document.getElementById('env14').style.backgroundColor = "#414449";
			      document.getElementById("env14").innerHTML= 'X';
			   }
			   //Environment and Com
			   
			   //Reputation
			   if(data.orm_reputation__c == 'Low'){
			      document.getElementById('rep11').classList.add("circle-text");
			      document.getElementById('rep11').style.backgroundColor = "#414449";
			      document.getElementById("rep11").innerHTML= 'X';
			   }
			   if(data.orm_reputation__c == 'Medium'){
			      document.getElementById('rep12').classList.add("circle-text");
			      document.getElementById('rep12').style.backgroundColor = "#414449";
			      document.getElementById("rep12").innerHTML= 'X';
			   }
			   if(data.orm_reputation__c == 'High'){
			      document.getElementById('rep13').classList.add("circle-text");
			      document.getElementById('rep13').style.backgroundColor = "#414449";
			      document.getElementById("rep13").innerHTML= 'X';
			   }
			   if(data.orm_reputation__c == 'VeryHigh'){
			      document.getElementById('rep14').classList.add("circle-text");
			      document.getElementById('rep14').style.backgroundColor = "#414449";
			      document.getElementById("rep14").innerHTML= 'X';
			   }
			   //end Reputation
			   
			   //working env
			   if(data.orm_workingEnvironment__c == 'One employee considers resigning'){
			      document.getElementById('we11').classList.add("circle-text");
			      document.getElementById('we11').style.backgroundColor = "#414449";
			      document.getElementById("we11").innerHTML= 'X';
			   }
			   if(data.orm_workingEnvironment__c == 'Several employees consider resigning'){
			      document.getElementById('we12').classList.add("circle-text");
			      document.getElementById('we12').style.backgroundColor = "#414449";
			      document.getElementById("we12").innerHTML= 'X';
			   }
			   if(data.orm_workingEnvironment__c == 'One employee resigns'){
			      document.getElementById('we13').classList.add("circle-text");
			      document.getElementById('we13').style.backgroundColor = "#414449";
			      document.getElementById("we13").innerHTML= 'X';
			   }
			   if(data.orm_workingEnvironment__c == 'Several employees resign'){
			      document.getElementById('we14').classList.add("circle-text");
			      document.getElementById('we14').style.backgroundColor = "#414449";
			      document.getElementById("we14").innerHTML= 'X';
			   }
			   //end working env
			}
		if(data.orm_probability__c == 'Possible'){
		  //health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById('hs21').classList.add("circle-text");
			  document.getElementById('hs21').style.backgroundColor = "#414449";
		      document.getElementById("hs21").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById('hs22').classList.add("circle-text");
			  document.getElementById('hs22').style.backgroundColor = "#414449";
		      document.getElementById("hs22").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById('hs23').classList.add("circle-text");
			  document.getElementById('hs23').style.backgroundColor = "#414449";
		      document.getElementById("hs23").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById('hs24').classList.add("circle-text");
			  document.getElementById('hs24').style.backgroundColor = "#414449";
		      document.getElementById("hs24").innerHTML= 'X';
		   }
		   //end health and safety
		   
		   //security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById('sec21').classList.add("circle-text");
			  document.getElementById('sec21').style.backgroundColor = "#414449";
		      document.getElementById("sec21").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById('sec22').classList.add("circle-text");
			  document.getElementById('sec22').style.backgroundColor = "#414449";
		      document.getElementById("sec22").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById('sec23').classList.add("circle-text");
			  document.getElementById('sec23').style.backgroundColor = "#414449";
		      document.getElementById("sec23").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById('sec24').classList.add("circle-text");
			  document.getElementById('sec24').style.backgroundColor = "#414449";
		      document.getElementById("sec24").innerHTML= 'X';
		   }
		   //end security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById('env21').classList.add("circle-text");
			  document.getElementById('env21').style.backgroundColor = "#414449";
		      document.getElementById("env21").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById('env22').classList.add("circle-text");
			  document.getElementById('env22').style.backgroundColor = "#414449";
		      document.getElementById("env22").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById('env23').classList.add("circle-text");
			  document.getElementById('env23').style.backgroundColor = "#414449";
		      document.getElementById("env23").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById('env24').classList.add("circle-text");
			  document.getElementById('env24').style.backgroundColor = "#414449";
		      document.getElementById("env24").innerHTML= 'X';
		   }
		   //End Environment and Com
		   
		   //Reputation
		   if(data.orm_reputation__c == 'Low'){
		      document.getElementById('rep21').classList.add("circle-text");
			  document.getElementById('rep21').style.backgroundColor = "#414449";
		      document.getElementById("rep21").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'Medium'){
		      document.getElementById('rep22').classList.add("circle-text");
			  document.getElementById('rep22').style.backgroundColor = "#414449";
		      document.getElementById("rep22").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'High'){
		      document.getElementById('rep23').classList.add("circle-text");
			  document.getElementById('rep23').style.backgroundColor = "#414449";
		      document.getElementById("rep23").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'VeryHigh'){
		      document.getElementById('rep24').classList.add("circle-text");
			  document.getElementById('rep24').style.backgroundColor = "#414449";
		      document.getElementById("rep24").innerHTML= 'X';
		   }
		   //End Reputation
		   
		   //Working Env
		   if(data.orm_workingEnvironment__c == 'One employee considers resigning'){
		      document.getElementById('we21').classList.add("circle-text");
			  document.getElementById('we21').style.backgroundColor = "#414449";
		      document.getElementById("we21").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees consider resigning'){
		      document.getElementById('we22').classList.add("circle-text");
			  document.getElementById('we22').style.backgroundColor = "#414449";
		      document.getElementById("we22").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'One employee resigns'){
		      document.getElementById('we23').classList.add("circle-text");
			  document.getElementById('we23').style.backgroundColor = "#414449";
		      document.getElementById("we23").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees resign'){
		      document.getElementById('we24').classList.add("circle-text");
			  document.getElementById('we24').style.backgroundColor = "#414449";
		      document.getElementById("we24").innerHTML= 'X';
		   }
		   //Working Env
		}
		if(data.orm_probability__c == 'Unlikely'){
		//health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById('hs31').classList.add("circle-text");
			  document.getElementById('hs31').style.backgroundColor = "#414449";
		      document.getElementById("hs31").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById('hs32').classList.add("circle-text");
			  document.getElementById('hs32').style.backgroundColor = "#414449";
		      document.getElementById("hs32").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById('hs33').classList.add("circle-text");
			  document.getElementById('hs33').style.backgroundColor = "#414449";
		      document.getElementById("hs33").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById('hs34').classList.add("circle-text");
			  document.getElementById('hs34').style.backgroundColor = "#414449";
		      document.getElementById("hs34").innerHTML= 'X';
		   }
		   //end health and safety
		   
		   //security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById('sec31').classList.add("circle-text");
			  document.getElementById('sec31').style.backgroundColor = "#414449";
		      document.getElementById("sec31").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById('sec32').classList.add("circle-text");
			  document.getElementById('sec32').style.backgroundColor = "#414449";
		      document.getElementById("sec32").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById('sec33').classList.add("circle-text");
			  document.getElementById('sec33').style.backgroundColor = "#414449";
		      document.getElementById("sec33").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById('sec34').classList.add("circle-text");
			  document.getElementById('sec34').style.backgroundColor = "#414449";
		      document.getElementById("sec34").innerHTML= 'X';
		   }
		   //security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById('env31').classList.add("circle-text");
			  document.getElementById('env31').style.backgroundColor = "#414449";
		      document.getElementById("env31").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById('env32').classList.add("circle-text");
			  document.getElementById('env32').style.backgroundColor = "#414449";
		      document.getElementById("env32").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById('env33').classList.add("circle-text");
			  document.getElementById('env33').style.backgroundColor = "#414449";
		      document.getElementById("env33").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById('env34').classList.add("circle-text");
			  document.getElementById('env34').style.backgroundColor = "#414449";
		      document.getElementById("env34").innerHTML= 'X';
		   }
		   //End Environment and Com
		   
		   //Repuatation
		   if(data.orm_reputation__c == 'Low'){
		      document.getElementById('rep31').classList.add("circle-text");
			  document.getElementById('rep31').style.backgroundColor = "#414449";
		      document.getElementById("rep31").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'Medium'){
		      document.getElementById('rep32').classList.add("circle-text");
			  document.getElementById('rep32').style.backgroundColor = "#414449";
		      document.getElementById("rep32").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'High'){
		      document.getElementById('rep33').classList.add("circle-text");
			  document.getElementById('rep33').style.backgroundColor = "#414449";
		      document.getElementById("rep33").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'VeryHigh'){
		      document.getElementById('rep34').classList.add("circle-text");
			  document.getElementById('rep34').style.backgroundColor = "#414449";
		      document.getElementById("rep34").innerHTML= 'X';
		   }
		   //End Repuatation
		   
		   //Working Env
		   if(data.orm_workingEnvironment__c == 'One employee considers resigning'){
		      document.getElementById('we31').classList.add("circle-text");
			  document.getElementById('we31').style.backgroundColor = "#414449";
		      document.getElementById("we31").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees consider resigning'){
		      document.getElementById('we32').classList.add("circle-text");
			  document.getElementById('we32').style.backgroundColor = "#414449";
		      document.getElementById("we32").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'One employee resigns'){
		      document.getElementById('we33').classList.add("circle-text");
			  document.getElementById('we33').style.backgroundColor = "#414449";
		      document.getElementById("we33").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees resign'){
		      document.getElementById('we34').classList.add("circle-text");
			  document.getElementById('we34').style.backgroundColor = "#414449";
		      document.getElementById("we34").innerHTML= 'X';
		   }
		   //End Working Env
		}
		if(data.orm_probability__c == 'Rare'){
		// health and safety
		   if(data.orm_healthAndSafety__c == 'Low'){
		      document.getElementById('hs41').classList.add("circle-text");
			  document.getElementById('hs41').style.backgroundColor = "#414449";
		      document.getElementById("hs41").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'Medium'){
		      document.getElementById('hs42').classList.add("circle-text");
			  document.getElementById('hs42').style.backgroundColor = "#414449";
		      document.getElementById("hs42").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'High'){
		      document.getElementById('hs43').classList.add("circle-text");
			  document.getElementById('hs43').style.backgroundColor = "#414449";
		      document.getElementById("hs43").innerHTML= 'X';
		   }
		   if(data.orm_healthAndSafety__c == 'VeryHigh'){
		      document.getElementById('hs44').classList.add("circle-text");
			  document.getElementById('hs44').style.backgroundColor = "#414449";
		      document.getElementById("hs44").innerHTML= 'X';
		   }
		   //end health and safety
		   
		   // security
		   if(data.orm_security__c == 'Low'){
		      document.getElementById('sec41').classList.add("circle-text");
			  document.getElementById('sec41').style.backgroundColor = "#414449";
		      document.getElementById("sec41").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'Medium'){
		      document.getElementById('sec42').classList.add("circle-text");
			  document.getElementById('sec42').style.backgroundColor = "#414449";
		      document.getElementById("sec42").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'High'){
		      document.getElementById('sec43').classList.add("circle-text");
			  document.getElementById('sec43').style.backgroundColor = "#414449";
		      document.getElementById("sec43").innerHTML= 'X';
		   }
		   if(data.orm_security__c == 'VeryHigh'){
		      document.getElementById('sec44').classList.add("circle-text");
			  document.getElementById('sec44').style.backgroundColor = "#414449";
		      document.getElementById("sec44").innerHTML= 'X';
		   }
		   //end security
		   
		   //Environment and Com
		   if(data.orm_environment__c == 'Low'){
		      document.getElementById('env41').classList.add("circle-text");
			  document.getElementById('env41').style.backgroundColor = "#414449";
		      document.getElementById("env41").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'Medium'){
		      document.getElementById('env42').classList.add("circle-text");
			  document.getElementById('env42').style.backgroundColor = "#414449";
		      document.getElementById("env42").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'High'){
		      document.getElementById('env43').classList.add("circle-text");
			  document.getElementById('env43').style.backgroundColor = "#414449";
		      document.getElementById("env43").innerHTML= 'X';
		   }
		   if(data.orm_environment__c == 'VeryHigh'){
		      document.getElementById('env44').classList.add("circle-text");
			  document.getElementById('env44').style.backgroundColor = "#414449";
		      document.getElementById("env44").innerHTML= 'X';
		   }
		   //End Environment and Com
		   
		   //Reputation
		   if(data.orm_reputation__c == 'Low'){
		      document.getElementById('rep41').classList.add("circle-text");
			  document.getElementById('rep41').style.backgroundColor = "#414449";
		      document.getElementById("rep41").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'Medium'){
		      document.getElementById('rep42').classList.add("circle-text");
			  document.getElementById('rep42').style.backgroundColor = "#414449";
		      document.getElementById("rep42").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'High'){
		      document.getElementById('rep43').classList.add("circle-text");
			  document.getElementById('rep43').style.backgroundColor = "#414449";
		      document.getElementById("rep43").innerHTML= 'X';
		   }
		   if(data.orm_reputation__c == 'VeryHigh'){
		      document.getElementById('rep44').classList.add("circle-text");
			  document.getElementById('rep44').style.backgroundColor = "#414449";
		      document.getElementById("rep44").innerHTML= 'X';
		   }
		   //End Reputation
		   
		   //Working env
		   if(data.orm_workingEnvironment__c == 'One employee considers resigning'){
		      document.getElementById('we41').classList.add("circle-text");
			  document.getElementById('we41').style.backgroundColor = "#414449";
		      document.getElementById("we41").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees consider resigning'){
		      document.getElementById('we42').classList.add("circle-text");
			  document.getElementById('we42').style.backgroundColor = "#414449";
		      document.getElementById("we42").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'One employee resigns'){
		      document.getElementById('we43').classList.add("circle-text");
			  document.getElementById('we43').style.backgroundColor = "#414449";
		      document.getElementById("we43").innerHTML= 'X';
		   }
		   if(data.orm_workingEnvironment__c == 'Several employees resign'){
		      document.getElementById('we44').classList.add("circle-text");
			  document.getElementById('we44').style.backgroundColor = "#414449";
		      document.getElementById("we44").innerHTML= 'X';
		   }
		   //End Working env
		}
	  }
		
    }
	
})
