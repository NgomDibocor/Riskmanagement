({
	doInit : function(component, event, helper) {
	    
		var actionInfosImpactsRisks = component.get('c.allInfosAssessmentRiskForMatriceTable');
		actionInfosImpactsRisks.setParams({"idAssessment": component.get("v.idAssessment") });
		actionInfosImpactsRisks.setCallback(this,function(response) {
		      var state = response.getState();
		      if (state == "SUCCESS") {
		         component.set("v.dataList", response.getReturnValue());
		         var dataList = component.get("v.dataList");
				 if(dataList.length != 0){
				       var numHS11 = 0;var numHS12 = 0;var numHS13 = 0;var numHS14 = 0;  
				       var numSEC11 = 0;var numSEC12 = 0;var numSEC13 = 0;var numSEC14 = 0;  
				       var numENV11 = 0;var numENV12 = 0;var numENV13 = 0;var numENV14 = 0;
				       var numREP11 = 0;var numREP12 = 0;var numREP13 = 0;var numREP14 = 0; 
				       var numWE11 = 0;var numWE12 = 0;var numWE13 = 0;var numWE14 = 0;  
				       var num2HS21 = 0;var num2HS22 = 0;var num2HS23 = 0;var num2HS24 = 0;  
				       var num2SEC21 = 0;var num2SEC22 = 0;var num2SEC23 = 0;var num2SEC24 = 0;  
				       var num2ENV21 = 0;var num2ENV22 = 0;var num2ENV23 = 0;var num2ENV24 = 0; 
				       var num2REP21 = 0;var num2REP22 = 0;var num2REP23 = 0;var num2REP24 = 0;  
				       var num2WE21 = 0;var num2WE22 = 0;var num2WE23 = 0;var num2WE24 = 0;  
				       var num3HS31 = 0;var num3HS32 = 0;var num3HS33 = 0;var num3HS34 = 0; 
				       var num3SEC31 = 0;var num3SEC32 = 0;var num3SEC33 = 0;var num3SEC34 = 0;   
				       var num3ENV31 = 0;var num3ENV32 = 0;var num3ENV33 = 0;var num3ENV34 = 0;  
				       var num3REP31 = 0;var num3REP32 = 0;var num3REP33 = 0;var num3REP34 = 0; 
				       var num3WE31 = 0;var num3WE32 = 0;var num3WE33 = 0;var num3WE34 = 0; 
				       var num4HS41 = 0;var num4HS42 = 0;var num4HS43 = 0;var num4HS44 = 0;  
				       var num4SEC41 = 0;var num4SEC42 = 0;var num4SEC43 = 0;var num4SEC44 = 0; 
				       var num4ENV41 = 0;var num4ENV42 = 0;var num4ENV43 = 0;var num4ENV44 = 0;  
				       var num4REP41 = 0;var num4REP42 = 0;var num4REP43 = 0;var num4REP44 = 0;   
				       var num4WE41 = 0;var num4WE42 = 0;var num4WE43 = 0;num4WE44 = 0;
				       
				       for (var i = 0; i < dataList.length; i++){
						    if(dataList[i].orm_probability__c == 'Probable'){
						       
						    // health and safety
							   if(dataList[i].orm_healthAndSafety__c == 'Low'){
							      document.getElementById('hs11').classList.add("circle-text");
							      document.getElementById('hs11').style.backgroundColor = "#414449";
							      numHS11++;
							      var n = numHS11.toString();
							      document.getElementById("hs11").innerHTML= n;  
							   }
							   if(dataList[i].orm_healthAndSafety__c == 'Medium'){
							      document.getElementById('hs12').classList.add("circle-text");
							      document.getElementById('hs12').style.backgroundColor = "#414449";
							      numHS12++;
							      var n = numHS12.toString();
							      document.getElementById("hs12").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_healthAndSafety__c == 'High'){
							      document.getElementById('hs13').classList.add("circle-text");
							      document.getElementById('hs13').style.backgroundColor = "#414449";
							      numHS13++;
							      var n = numHS13.toString();
							      document.getElementById("hs13").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_healthAndSafety__c == 'VeryHigh'){
							      document.getElementById('hs14').classList.add("circle-text");
							      document.getElementById('hs14').style.backgroundColor = "#414449";
							      numHS14++;
							      var n = numHS14.toString();
							      document.getElementById("hs14").innerHTML= n;
							      
							   }
							   //end health and safety
							   
							   //security
							   if(dataList[i].orm_security__c == 'Low'){
							      document.getElementById('sec11').classList.add("circle-text");
							      document.getElementById('sec11').style.backgroundColor = "#414449";
							      numSEC11++;
							      var n = numSEC11.toString();
							      document.getElementById("sec11").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_security__c == 'Medium'){
							      document.getElementById('sec12').classList.add("circle-text");
							      document.getElementById('sec12').style.backgroundColor = "#414449";
							      numSEC12++;
							      var n = numSEC12.toString();
							      document.getElementById("sec12").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_security__c == 'High'){
							      document.getElementById('sec13').classList.add("circle-text");
							      document.getElementById('sec13').style.backgroundColor = "#414449";
							      numSEC13++;
							      var n = numSEC13.toString();
							      document.getElementById("sec13").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_security__c == 'VeryHigh'){
							      document.getElementById('sec14').classList.add("circle-text");
							      document.getElementById('sec14').style.backgroundColor = "#414449";
							      numSEC14++;
							      var n = numSEC14.toString();
							      document.getElementById("sec14").innerHTML= n;
							      
							   }
							   //end security
							   
							   //Environment and Com
							   if(dataList[i].orm_environment__c == 'Low'){
							      document.getElementById('env11').classList.add("circle-text");
							      document.getElementById('env11').style.backgroundColor = "#414449";
							      numENV11++;
							      var n = numENV11.toString();
							      document.getElementById("env11").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_environment__c == 'Medium'){
							      document.getElementById('env12').classList.add("circle-text");
							      document.getElementById('env12').style.backgroundColor = "#414449";
							      numENV12++;
							      var n = numENV12.toString();
							      document.getElementById("env12").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_environment__c == 'High'){
							      document.getElementById('env13').classList.add("circle-text");
							      document.getElementById('env13').style.backgroundColor = "#414449";
							      numENV13++;
							      var n = numENV13.toString();
							      document.getElementById("env13").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_environment__c == 'VeryHigh'){
							      document.getElementById('env14').classList.add("circle-text");
							      document.getElementById('env14').style.backgroundColor = "#414449";
							      numENV14++;
							      var n = numENV14.toString();
							      document.getElementById("env14").innerHTML= n;
							      
							   }
							   //Environment and Com
							   
							   //Reputation
							   if(dataList[i].orm_reputation__c == 'Low'){
							      document.getElementById('rep11').classList.add("circle-text");
							      document.getElementById('rep11').style.backgroundColor = "#414449";
							      numREP11++;
							      var n = numREP11.toString();
							      document.getElementById("rep11").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_reputation__c == 'Medium'){
							      document.getElementById('rep12').classList.add("circle-text");
							      document.getElementById('rep12').style.backgroundColor = "#414449";
							      numREP12++;
							      var n = numREP12.toString();
							      document.getElementById("rep12").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_reputation__c == 'High'){
							      document.getElementById('rep13').classList.add("circle-text");
							      document.getElementById('rep13').style.backgroundColor = "#414449";
							      numREP13++;
							      var n = numREP13.toString();
							      document.getElementById("rep13").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_reputation__c == 'VeryHigh'){
							      document.getElementById('rep14').classList.add("circle-text");
							      document.getElementById('rep14').style.backgroundColor = "#414449";
							      numREP14++;
							      var n = numREP14.toString();
							      document.getElementById("rep14").innerHTML= n;
							      
							   }
							   //end Reputation
							   
							   //working env
							   if(dataList[i].orm_workingEnvironment__c == 'One employee considers resigning'){
							      document.getElementById('we11').classList.add("circle-text");
							      document.getElementById('we11').style.backgroundColor = "#414449";
							      numWE11++;
							      var n = numWE11.toString();
							      document.getElementById("we11").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_workingEnvironment__c == 'Several employees consider resigning'){
							      document.getElementById('we12').classList.add("circle-text");
							      document.getElementById('we12').style.backgroundColor = "#414449";
							      numWE12++;
							      var n = numWE12.toString();
							      document.getElementById("we12").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_workingEnvironment__c == 'One employee resigns'){
							      document.getElementById('we13').classList.add("circle-text");
							      document.getElementById('we13').style.backgroundColor = "#414449";
							      numWE13++;
							      var n = numWE13.toString();
							      document.getElementById("we13").innerHTML= n;
							      
							   }
							   if(dataList[i].orm_workingEnvironment__c == 'Several employees resign'){
							      document.getElementById('we14').classList.add("circle-text");
							      document.getElementById('we14').style.backgroundColor = "#414449";
							      numWE14++;
							      var n = numWE14.toString();
							      document.getElementById("we14").innerHTML= n;
							      
							   }
							   //end working env
						}
						if(dataList[i].orm_probability__c == 'Possible'){
						  //health and safety
						   if(dataList[i].orm_healthAndSafety__c == 'Low'){
						      document.getElementById('hs21').classList.add("circle-text");
							  document.getElementById('hs21').style.backgroundColor = "#414449";
						      num2HS21++;
							  var n = num2HS21.toString();
							  document.getElementById("hs21").innerHTML= n;
							      
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'Medium'){
						      document.getElementById('hs22').classList.add("circle-text");
							  document.getElementById('hs22').style.backgroundColor = "#414449";
						      num2HS22++;
							  var n = num2HS22.toString();
							  document.getElementById("hs22").innerHTML= n;
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'High'){
						      document.getElementById('hs23').classList.add("circle-text");
							  document.getElementById('hs23').style.backgroundColor = "#414449";
						      num2HS23++;
							  var n = num2HS23.toString();
							  document.getElementById("hs23").innerHTML= n;
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'VeryHigh'){
						      document.getElementById('hs24').classList.add("circle-text");
							  document.getElementById('hs24').style.backgroundColor = "#414449";
						      num2HS24++;
							  var n = num2HS24.toString();
							  document.getElementById("hs24").innerHTML= n;
						   }
						   //end health and safety
						   
						   //security
						   if(dataList[i].orm_security__c == 'Low'){
						      document.getElementById('sec21').classList.add("circle-text");
							  document.getElementById('sec21').style.backgroundColor = "#414449";
						      num2SEC21++;
							  var n = num2SEC21.toString();
							  document.getElementById("sec21").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'Medium'){
						      document.getElementById('sec22').classList.add("circle-text");
							  document.getElementById('sec22').style.backgroundColor = "#414449";
						      num2SEC22++;
							  var n = num2SEC22.toString();
							  document.getElementById("sec22").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'High'){
						      document.getElementById('sec23').classList.add("circle-text");
							  document.getElementById('sec23').style.backgroundColor = "#414449";
						      num2SEC23++;
							  var n = num2SEC23.toString();
							  document.getElementById("sec23").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'VeryHigh'){
						      document.getElementById('sec24').classList.add("circle-text");
							  document.getElementById('sec24').style.backgroundColor = "#414449";
						      num2SEC24++;
							  var n = num2SEC24.toString();
							  document.getElementById("sec24").innerHTML= n;
						   }
						   //end security
						   
						   //Environment and Com
						   if(dataList[i].orm_environment__c == 'Low'){
						      document.getElementById('env21').classList.add("circle-text");
							  document.getElementById('env21').style.backgroundColor = "#414449";
						      num2ENV21++;
							  var n = num2ENV21.toString();
							  document.getElementById("env21").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'Medium'){
						      document.getElementById('env22').classList.add("circle-text");
							  document.getElementById('env22').style.backgroundColor = "#414449";
						      num2ENV22++;
							  var n = num2ENV22.toString();
							  document.getElementById("env22").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'High'){
						      document.getElementById('env23').classList.add("circle-text");
							  document.getElementById('env23').style.backgroundColor = "#414449";
						      num2ENV23++;
							  var n = num2ENV23.toString();
							  document.getElementById("env23").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'VeryHigh'){
						      document.getElementById('env24').classList.add("circle-text");
							  document.getElementById('env24').style.backgroundColor = "#414449";
						      num2ENV24++;
							  var n = num2ENV24.toString();
							  document.getElementById("env24").innerHTML= n;
						   }
						   //End Environment and Com
						   
						   //Reputation
						   if(dataList[i].orm_reputation__c == 'Low'){
						      document.getElementById('rep21').classList.add("circle-text");
							  document.getElementById('rep21').style.backgroundColor = "#414449";
						      num2REP21++;
							  var n = num2REP21.toString();
							  document.getElementById("rep21").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'Medium'){
						      document.getElementById('rep22').classList.add("circle-text");
							  document.getElementById('rep22').style.backgroundColor = "#414449";
						      num2REP22++;
							  var n = num2REP22.toString();
							  document.getElementById("rep22").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'High'){
						      document.getElementById('rep23').classList.add("circle-text");
							  document.getElementById('rep23').style.backgroundColor = "#414449";
						      num2REP23++;
							  var n = num2REP23.toString();
							  document.getElementById("rep23").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'VeryHigh'){
						      document.getElementById('rep24').classList.add("circle-text");
							  document.getElementById('rep24').style.backgroundColor = "#414449";
						      num2REP24++;
							  var n = num2REP24.toString();
							  document.getElementById("rep24").innerHTML= n;
						   }
						   //End Reputation
						   
						   //Working Env
						   if(dataList[i].orm_workingEnvironment__c == 'One employee considers resigning'){
						      document.getElementById('we21').classList.add("circle-text");
							  document.getElementById('we21').style.backgroundColor = "#414449";
						      num2WE21++;
							  var n = num2WE21.toString();
							  document.getElementById("we21").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees consider resigning'){
						      document.getElementById('we22').classList.add("circle-text");
							  document.getElementById('we22').style.backgroundColor = "#414449";
						      num2WE22++;
							  var n = num2WE22.toString();
							  document.getElementById("we22").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'One employee resigns'){
						      document.getElementById('we23').classList.add("circle-text");
							  document.getElementById('we23').style.backgroundColor = "#414449";
						      num2WE23++;
							  var n = num2WE23.toString();
							  document.getElementById("we23").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees resign'){
						      document.getElementById('we24').classList.add("circle-text");
							  document.getElementById('we24').style.backgroundColor = "#414449";
						      num2WE24++;
							  var n = num2WE24.toString();
							  document.getElementById("we24").innerHTML= n;
						   }
						   //Working Env
						}
						if(dataList[i].orm_probability__c == 'Unlikely'){
						//health and safety
						   if(dataList[i].orm_healthAndSafety__c == 'Low'){
						      document.getElementById('hs31').classList.add("circle-text");
							  document.getElementById('hs31').style.backgroundColor = "#414449";  
						      num3HS31++;
							  var n = num3HS31.toString();
							  document.getElementById("hs31").innerHTML= n;
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'Medium'){
						      document.getElementById('hs32').classList.add("circle-text");
							  document.getElementById('hs32').style.backgroundColor = "#414449";
						      num3HS32++;
							  var n = num3HS32.toString();
							  document.getElementById("hs32").innerHTML= n;
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'High'){
						      document.getElementById('hs33').classList.add("circle-text");
							  document.getElementById('hs33').style.backgroundColor = "#414449";
						      num3HS33++;
							  var n = num3HS33.toString();
							  document.getElementById("hs33").innerHTML= n;
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'VeryHigh'){
						      document.getElementById('hs34').classList.add("circle-text");
							  document.getElementById('hs34').style.backgroundColor = "#414449";
						      num3HS34++;
							  var n = num3HS34.toString();
							  document.getElementById("hs34").innerHTML= n;
						   }
						   //end health and safety
						   
						   //security
						   if(dataList[i].orm_security__c == 'Low'){
						      document.getElementById('sec31').classList.add("circle-text");
							  document.getElementById('sec31').style.backgroundColor = "#414449";
						      num3SEC31++;
							  var n = num3SEC31.toString();
							  document.getElementById("sec31").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'Medium'){
						      document.getElementById('sec32').classList.add("circle-text");
							  document.getElementById('sec32').style.backgroundColor = "#414449";
						      num3SEC32++;
							  var n = num3SEC32.toString();
							  document.getElementById("sec32").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'High'){
						      document.getElementById('sec33').classList.add("circle-text");
							  document.getElementById('sec33').style.backgroundColor = "#414449";
						      num3SEC33++;
							  var n = num3SEC33.toString();
							  document.getElementById("sec33").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'VeryHigh'){
						      document.getElementById('sec34').classList.add("circle-text");
							  document.getElementById('sec34').style.backgroundColor = "#414449";
						      num3SEC34++;
							  var n = num3SEC34.toString();
							  document.getElementById("sec34").innerHTML= n;
						   }
						   //security
						   
						   //Environment and Com
						   if(dataList[i].orm_environment__c == 'Low'){
						      document.getElementById('env31').classList.add("circle-text");
							  document.getElementById('env31').style.backgroundColor = "#414449";
						      num3ENV31++;
							  var n = num3ENV31.toString();
							  document.getElementById("env31").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'Medium'){
						      document.getElementById('env32').classList.add("circle-text");
							  document.getElementById('env32').style.backgroundColor = "#414449";
						      num3ENV32++;
							  var n = num3ENV32.toString();
							  document.getElementById("env32").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'High'){
						      document.getElementById('env33').classList.add("circle-text");
							  document.getElementById('env33').style.backgroundColor = "#414449";
						      num3ENV33++;
							  var n = num3ENV33.toString();
							  document.getElementById("env33").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'VeryHigh'){
						      document.getElementById('env34').classList.add("circle-text");
							  document.getElementById('env34').style.backgroundColor = "#414449";
						      num3ENV34++;
							  var n = num3ENV34.toString();
							  document.getElementById("env34").innerHTML= n;
						   }
						   //End Environment and Com
						   
						   //Repuatation
						   if(dataList[i].orm_reputation__c == 'Low'){
						      document.getElementById('rep31').classList.add("circle-text");
							  document.getElementById('rep31').style.backgroundColor = "#414449";
						      num3REP31++;
							  var n = num3REP31.toString();
							  document.getElementById("rep31").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'Medium'){
						      document.getElementById('rep32').classList.add("circle-text");
							  document.getElementById('rep32').style.backgroundColor = "#414449";
						      num3REP32++;
							  var n = num3REP32.toString();
							  document.getElementById("rep32").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'High'){
						      document.getElementById('rep33').classList.add("circle-text");
							  document.getElementById('rep33').style.backgroundColor = "#414449";
						      num3REP33++;
							  var n = num3REP33.toString();
							  document.getElementById("rep33").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'VeryHigh'){
						      document.getElementById('rep34').classList.add("circle-text");
							  document.getElementById('rep34').style.backgroundColor = "#414449";
						      num3REP34++;
							  var n = num3REP34.toString();
							  document.getElementById("rep34").innerHTML= n;
						   }
						   //End Repuatation
						   
						   //Working Env
						   if(dataList[i].orm_workingEnvironment__c == 'One employee considers resigning'){
						      document.getElementById('we31').classList.add("circle-text");
							  document.getElementById('we31').style.backgroundColor = "#414449";
						      num3WE31++;
							  var n = num3WE31.toString();
							  document.getElementById("we31").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees consider resigning'){
						      document.getElementById('we32').classList.add("circle-text");
							  document.getElementById('we32').style.backgroundColor = "#414449";
						      num3WE32++;
							  var n = num3WE32.toString();
							  document.getElementById("we32").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'One employee resigns'){
						      document.getElementById('we33').classList.add("circle-text");
							  document.getElementById('we33').style.backgroundColor = "#414449";
						      num3WE33++;
							  var n = num3WE33.toString();
							  document.getElementById("we33").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees resign'){
						      document.getElementById('we34').classList.add("circle-text");
							  document.getElementById('we34').style.backgroundColor = "#414449";
						      num3WE34++;
							  var n = num3WE34.toString();
							  document.getElementById("we34").innerHTML= n;
						   }
						   //End Working Env
						}
						if(dataList[i].orm_probability__c == 'Rare'){
						// health and safety
						   if(dataList[i].orm_healthAndSafety__c == 'Low'){
						      document.getElementById('hs41').classList.add("circle-text");
							  document.getElementById('hs41').style.backgroundColor = "#414449";
						      num4HS41++;
							  var n = num4HS41.toString();
							  document.getElementById("hs41").innerHTML= n;
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'Medium'){
						      document.getElementById('hs42').classList.add("circle-text");
							  document.getElementById('hs42').style.backgroundColor = "#414449";
						      num4HS42++;
							  var n = num4HS42.toString();
							  document.getElementById("hs42").innerHTML= n;
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'High'){
						      document.getElementById('hs43').classList.add("circle-text");
							  document.getElementById('hs43').style.backgroundColor = "#414449";
						      num4HS43++;
							  var n = num4HS43.toString();
							  document.getElementById("hs43").innerHTML= n;
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'VeryHigh'){
						      document.getElementById('hs44').classList.add("circle-text");
							  document.getElementById('hs44').style.backgroundColor = "#414449";
						      num4HS44++;
							  var n = num4HS44.toString();
							  document.getElementById("hs44").innerHTML= n;
						   }
						   //end health and safety
						   
						   // security
						   if(dataList[i].orm_security__c == 'Low'){
						      document.getElementById('sec41').classList.add("circle-text");
							  document.getElementById('sec41').style.backgroundColor = "#414449";
						      num4SEC41++;
							  var n = num4SEC41.toString();
							  document.getElementById("sec41").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'Medium'){
						      document.getElementById('sec42').classList.add("circle-text");
							  document.getElementById('sec42').style.backgroundColor = "#414449";
						      num4SEC42++;
							  var n = num4SEC42.toString();
							  document.getElementById("sec42").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'High'){
						      document.getElementById('sec43').classList.add("circle-text");
							  document.getElementById('sec43').style.backgroundColor = "#414449";
						      num4SEC43++;
							  var n = num4SEC43.toString();
							  document.getElementById("sec43").innerHTML= n;
						   }
						   if(dataList[i].orm_security__c == 'VeryHigh'){
						      document.getElementById('sec44').classList.add("circle-text");
							  document.getElementById('sec44').style.backgroundColor = "#414449";
						      num4SEC44++;
							  var n = num4SEC44.toString();
							  document.getElementById("sec44").innerHTML= n;
						   }
						   //end security
						   
						   //Environment and Com
						   if(dataList[i].orm_environment__c == 'Low'){
						      document.getElementById('env41').classList.add("circle-text");
							  document.getElementById('env41').style.backgroundColor = "#414449";
						      num4ENV41++;
							  var n = num4ENV41.toString();
							  document.getElementById("env41").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'Medium'){
						      document.getElementById('env42').classList.add("circle-text");
							  document.getElementById('env42').style.backgroundColor = "#414449";
						      num4ENV42++;
							  var n = num4ENV42.toString();
							  document.getElementById("env42").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'High'){
						      document.getElementById('env43').classList.add("circle-text");
							  document.getElementById('env43').style.backgroundColor = "#414449";
						      num4ENV43++;
							  var n = num4ENV43.toString();
							  document.getElementById("env43").innerHTML= n;
						   }
						   if(dataList[i].orm_environment__c == 'VeryHigh'){
						      document.getElementById('env44').classList.add("circle-text");
							  document.getElementById('env44').style.backgroundColor = "#414449";
						      num4ENV44++;
							  var n = num4ENV44.toString();
							  document.getElementById("env44").innerHTML= n;
						   }
						   //End Environment and Com
						   
						   //Reputation
						   if(dataList[i].orm_reputation__c == 'Low'){
						      document.getElementById('rep41').classList.add("circle-text");
							  document.getElementById('rep41').style.backgroundColor = "#414449";
						      num4REP41++;
							  var n = num4REP41.toString();
							  document.getElementById("rep41").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'Medium'){
						      document.getElementById('rep42').classList.add("circle-text");
							  document.getElementById('rep42').style.backgroundColor = "#414449";
						      num4REP42++;
							  var n = num4REP42.toString();
							  document.getElementById("rep42").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'High'){
						      document.getElementById('rep43').classList.add("circle-text");
							  document.getElementById('rep43').style.backgroundColor = "#414449";
						      num4REP43++;
							  var n = num4REP43.toString();
							  document.getElementById("rep43").innerHTML= n;
						   }
						   if(dataList[i].orm_reputation__c == 'VeryHigh'){
						      document.getElementById('rep44').classList.add("circle-text");
							  document.getElementById('rep44').style.backgroundColor = "#414449";
						      num4REP44++;
							  var n = num4REP44.toString();
							  document.getElementById("rep44").innerHTML= n;
						   }
						   //End Reputation
						   
						   //Working env
						   if(dataList[i].orm_workingEnvironment__c == 'One employee considers resigning'){
						      document.getElementById('we41').classList.add("circle-text");
							  document.getElementById('we41').style.backgroundColor = "#414449";
						      num4WE41++;
							  var n = num4WE41.toString();
							  document.getElementById("we41").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees consider resigning'){
						      document.getElementById('we42').classList.add("circle-text");
							  document.getElementById('we42').style.backgroundColor = "#414449";
						      num4WE42++;
							  var n = num4WE42.toString();
							  document.getElementById("we42").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'One employee resigns'){
						      document.getElementById('we43').classList.add("circle-text");
							  document.getElementById('we43').style.backgroundColor = "#414449";
						      num4WE43++;
							  var n = num4WE43.toString();
							  document.getElementById("we43").innerHTML= n;
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees resign'){
						      document.getElementById('we44').classList.add("circle-text");
							  document.getElementById('we44').style.backgroundColor = "#414449";
						      num4WE44++;
							  var n = num4WE44.toString();
							  document.getElementById("we44").innerHTML= n;
						   }
						   //End Working env
						}
				   }
			    }
		     }
		});
		$A.enqueueAction(actionInfosImpactsRisks);
	},
	
	openMODERATE : function(component, event, helper) {
	  document.getElementById("MODERATE").style.display = "block";
	},
	
	closeMODERATE : function(component, event, helper) {
	  document.getElementById("MODERATE").style.display = "none";
	},
	
	openSEVERE : function(component, event, helper) {
	  document.getElementById("SEVERE").style.display = "block";
	},
	
	closeSEVERE : function(component, event, helper) {
	  document.getElementById("SEVERE").style.display = "none";
	},
	
	openMINOR : function(component, event, helper) {
	  document.getElementById("MINOR").style.display = "block";
	},
	
	closeMINOR : function(component, event, helper) {
	  document.getElementById("MINOR").style.display = "none";
	},
	
	openMAJOR : function(component, event, helper) {
	  document.getElementById("MAJOR").style.display = "block";
	},
	
	closeMAJOR : function(component, event, helper) {
	  document.getElementById("MAJOR").style.display = "none";
	},
})