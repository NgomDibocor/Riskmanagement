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
				       
				        var  listIDHS11 = [];
					    var  listIDHS12 = [];
					    var  listIDHS13 = [];
					    var  listIDHS14 = [];
					    var  listIDSEC11 = [];
					    var  listIDSEC12 = [];
					    var  listIDSEC13 = [];
					    var  listIDSEC14 = [];
					    var  listIDENV11 = [];
					    var  listIDENV12 = [];
					    var  listIDENV13 = [];
					    var  listIDENV14 = [];
					    var  listIDREP11 = [];
					    var  listIDREP12 = [];
					    var  listIDREP13 = [];
					    var  listIDREP14 = [];
					    var  listIDWE11 = [];
					    var  listIDWE12 = [];
					    var  listIDWE13 = [];
					    var  listIDWE14 = [];
					    var  listID2HS21 = [];
					    var  listID2HS22 = [];
					    var  listID2HS23 = [];
					    var  listID2HS24 = [];
					    var  listID2SEC21 = [];
					    var  listID2SEC22 = [];
					    var  listID2SEC23 = [];
					    var  listID2SEC24 = [];
					    var  listID2ENV21 = [];
					    var  listID2ENV22 = [];
					    var  listID2ENV23 = [];
					    var  listID2ENV24 = [];
					    var  listID2REP21 = [];
					    var  listID2REP22 = [];
					    var  listID2REP23 = [];
					    var  listID2REP24 = [];
					    var  listID2WE21 = [];
					    var  listID2WE22 = [];
					    var  listID2WE23 = [];
					    var  listID2WE24 = [];
					    var  listID3HS31 = [];
					    var  listID3HS32 = [];
					    var  listID3HS33 = [];
					    var  listID3HS34 = [];
					    var  listID3SEC31 = [];
					    var  listID3SEC32 = [];
					    var  listID3SEC33 = [];
					    var  listID3SEC34 = [];
					    var  listID3ENV31 = [];
					    var  listID3ENV32 = [];
					    var  listID3ENV33 = [];
					    var  listID3ENV34 = [];
					    var  listID3REP31 = [];
					    var  listID3REP32 = [];
					    var  listID3REP33 = [];
					    var  listID3REP34 = [];
					    var  listID3WE31 = [];
					    var  listID3WE32 = [];
					    var  listID3WE33 = [];
					    var  listID3WE34 = [];
					    var  listID4HS41 = [];
					    var  listID4HS42 = [];
					    var  listID4HS43 = [];
					    var  listID4HS44 = [];
					    var  listID4SEC41 = [];
					    var  listID4SEC42 = [];
					    var  listID4SEC43 = [];
					    var  listID4SEC44 = [];
					    var  listID4ENV41 = [];
					    var  listID4ENV42 = [];
					    var  listID4ENV43 = [];
					    var  listID4ENV44 = [];
					    var  listID4REP41 = [];
					    var  listID4REP42 = [];
					    var  listID4REP43 = [];
					    var  listID4REP44 = [];
					    var  listID4WE41 = [];
					    var  listID4WE42 = [];
					    var  listID4WE43 = [];
					    var  listID4WE44 = [];
				       
				       for (var i = 0; i < dataList.length; i++){
						    if(dataList[i].orm_probability__c == 'Probable'){
						       
						    // health and safety
							   if(dataList[i].orm_healthAndSafety__c == 'Low'){
							      document.getElementById('hs11').classList.add("circle-text");
							      document.getElementById('hs11').style.backgroundColor = "#414449";
							      numHS11++;
							      var n = numHS11.toString();
							      document.getElementById("hs11").innerHTML= n;  
							      listIDHS11.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_healthAndSafety__c == 'Medium'){
							      document.getElementById('hs12').classList.add("circle-text");
							      document.getElementById('hs12').style.backgroundColor = "#414449";
							      numHS12++;
							      var n = numHS12.toString();
							      document.getElementById("hs12").innerHTML= n;
							      listIDHS12.push(dataList[i].orm_assessmentRisk__c);
							      
							   }
							   if(dataList[i].orm_healthAndSafety__c == 'High'){
							      document.getElementById('hs13').classList.add("circle-text");
							      document.getElementById('hs13').style.backgroundColor = "#414449";
							      numHS13++;
							      var n = numHS13.toString();
							      document.getElementById("hs13").innerHTML= n;
							      listIDHS13.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_healthAndSafety__c == 'VeryHigh'){
							      document.getElementById('hs14').classList.add("circle-text");
							      document.getElementById('hs14').style.backgroundColor = "#414449";
							      numHS14++;
							      var n = numHS14.toString();
							      document.getElementById("hs14").innerHTML= n;
							      listIDHS14.push(dataList[i].orm_assessmentRisk__c);
							   }
							   //end health and safety
							   
							   //security
							   if(dataList[i].orm_security__c == 'Low'){
							      document.getElementById('sec11').classList.add("circle-text");
							      document.getElementById('sec11').style.backgroundColor = "#414449";
							      numSEC11++;
							      var n = numSEC11.toString();
							      document.getElementById("sec11").innerHTML= n;
							      listIDSEC11.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_security__c == 'Medium'){
							      document.getElementById('sec12').classList.add("circle-text");
							      document.getElementById('sec12').style.backgroundColor = "#414449";
							      numSEC12++;
							      var n = numSEC12.toString();
							      document.getElementById("sec12").innerHTML= n;
							      listIDSEC12.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_security__c == 'High'){
							      document.getElementById('sec13').classList.add("circle-text");
							      document.getElementById('sec13').style.backgroundColor = "#414449";
							      numSEC13++;
							      var n = numSEC13.toString();
							      document.getElementById("sec13").innerHTML= n;
							      listIDSEC13.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_security__c == 'VeryHigh'){
							      document.getElementById('sec14').classList.add("circle-text");
							      document.getElementById('sec14').style.backgroundColor = "#414449";
							      numSEC14++;
							      var n = numSEC14.toString();
							      document.getElementById("sec14").innerHTML= n;
							      listIDSEC14.push(dataList[i].orm_assessmentRisk__c);
							   }
							   //end security
							   
							   //Environment and Com
							   if(dataList[i].orm_environment__c == 'Low'){
							      document.getElementById('env11').classList.add("circle-text");
							      document.getElementById('env11').style.backgroundColor = "#414449";
							      numENV11++;
							      var n = numENV11.toString();
							      document.getElementById("env11").innerHTML= n; 
							      listIDENV11.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_environment__c == 'Medium'){
							      document.getElementById('env12').classList.add("circle-text");
							      document.getElementById('env12').style.backgroundColor = "#414449";
							      numENV12++;
							      var n = numENV12.toString();
							      document.getElementById("env12").innerHTML= n;
							      listIDENV12.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_environment__c == 'High'){
							      document.getElementById('env13').classList.add("circle-text");
							      document.getElementById('env13').style.backgroundColor = "#414449";
							      numENV13++;
							      var n = numENV13.toString();
							      document.getElementById("env13").innerHTML= n;
							      listIDENV13.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_environment__c == 'VeryHigh'){
							      document.getElementById('env14').classList.add("circle-text");
							      document.getElementById('env14').style.backgroundColor = "#414449";
							      numENV14++;
							      var n = numENV14.toString();
							      document.getElementById("env14").innerHTML= n;
							      listIDENV14.push(dataList[i].orm_assessmentRisk__c);
							   }
							   //Environment and Com
							   
							   //Reputation
							   if(dataList[i].orm_reputation__c == 'Low'){
							      document.getElementById('rep11').classList.add("circle-text");
							      document.getElementById('rep11').style.backgroundColor = "#414449";
							      numREP11++;
							      var n = numREP11.toString();
							      document.getElementById("rep11").innerHTML= n;
							      listIDREP11.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_reputation__c == 'Medium'){
							      document.getElementById('rep12').classList.add("circle-text");
							      document.getElementById('rep12').style.backgroundColor = "#414449";
							      numREP12++;
							      var n = numREP12.toString();
							      document.getElementById("rep12").innerHTML= n;
							      listIDREP12.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_reputation__c == 'High'){
							      document.getElementById('rep13').classList.add("circle-text");
							      document.getElementById('rep13').style.backgroundColor = "#414449";
							      numREP13++;
							      var n = numREP13.toString();
							      document.getElementById("rep13").innerHTML= n;
							      listIDREP13.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_reputation__c == 'VeryHigh'){
							      document.getElementById('rep14').classList.add("circle-text");
							      document.getElementById('rep14').style.backgroundColor = "#414449";
							      numREP14++;
							      var n = numREP14.toString();
							      document.getElementById("rep14").innerHTML= n;
							      listIDREP14.push(dataList[i].orm_assessmentRisk__c);
							   }
							   //end Reputation
							   
							   //working env
							   if(dataList[i].orm_workingEnvironment__c == 'One employee considers resigning'){
							      document.getElementById('we11').classList.add("circle-text");
							      document.getElementById('we11').style.backgroundColor = "#414449";
							      numWE11++;
							      var n = numWE11.toString();
							      document.getElementById("we11").innerHTML= n;
							      listIDWE11.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_workingEnvironment__c == 'Several employees consider resigning'){
							      document.getElementById('we12').classList.add("circle-text");
							      document.getElementById('we12').style.backgroundColor = "#414449";
							      numWE12++;
							      var n = numWE12.toString();
							      document.getElementById("we12").innerHTML= n;
							      listIDWE12.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_workingEnvironment__c == 'One employee resigns'){
							      document.getElementById('we13').classList.add("circle-text");
							      document.getElementById('we13').style.backgroundColor = "#414449";
							      numWE13++;
							      var n = numWE13.toString();
							      document.getElementById("we13").innerHTML= n;
							      listIDWE13.push(dataList[i].orm_assessmentRisk__c);
							   }
							   if(dataList[i].orm_workingEnvironment__c == 'Several employees resign'){
							      document.getElementById('we14').classList.add("circle-text");
							      document.getElementById('we14').style.backgroundColor = "#414449";
							      numWE14++;
							      var n = numWE14.toString();
							      document.getElementById("we14").innerHTML= n;
							      listIDWE14.push(dataList[i].orm_assessmentRisk__c);
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
							  listID2HS21.push(dataList[i].orm_assessmentRisk__c);    
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'Medium'){
						      document.getElementById('hs22').classList.add("circle-text");
							  document.getElementById('hs22').style.backgroundColor = "#414449";
						      num2HS22++;
							  var n = num2HS22.toString();
							  document.getElementById("hs22").innerHTML= n;
							  listID2HS22.push(dataList[i].orm_assessmentRisk__c);   
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'High'){
						      document.getElementById('hs23').classList.add("circle-text");
							  document.getElementById('hs23').style.backgroundColor = "#414449";
						      num2HS23++;
							  var n = num2HS23.toString();
							  document.getElementById("hs23").innerHTML= n;
							  listID2HS23.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'VeryHigh'){
						      document.getElementById('hs24').classList.add("circle-text");
							  document.getElementById('hs24').style.backgroundColor = "#414449";
						      num2HS24++;
							  var n = num2HS24.toString();
							  document.getElementById("hs24").innerHTML= n;
							  listID2HS24.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //end health and safety
						   
						   //security
						   if(dataList[i].orm_security__c == 'Low'){
						      document.getElementById('sec21').classList.add("circle-text");
							  document.getElementById('sec21').style.backgroundColor = "#414449";
						      num2SEC21++;
							  var n = num2SEC21.toString();
							  document.getElementById("sec21").innerHTML= n;
							  listID2SEC21.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'Medium'){
						      document.getElementById('sec22').classList.add("circle-text");
							  document.getElementById('sec22').style.backgroundColor = "#414449";
						      num2SEC22++;
							  var n = num2SEC22.toString();
							  document.getElementById("sec22").innerHTML= n;
							  listID2SEC22.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'High'){
						      document.getElementById('sec23').classList.add("circle-text");
							  document.getElementById('sec23').style.backgroundColor = "#414449";
						      num2SEC23++;
							  var n = num2SEC23.toString();
							  document.getElementById("sec23").innerHTML= n;
							  listID2SEC23.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'VeryHigh'){
						      document.getElementById('sec24').classList.add("circle-text");
							  document.getElementById('sec24').style.backgroundColor = "#414449";
						      num2SEC24++;
							  var n = num2SEC24.toString();
							  document.getElementById("sec24").innerHTML= n;
							  listID2SEC24.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //end security
						   
						   //Environment and Com
						   if(dataList[i].orm_environment__c == 'Low'){
						      document.getElementById('env21').classList.add("circle-text");
							  document.getElementById('env21').style.backgroundColor = "#414449";
						      num2ENV21++;
							  var n = num2ENV21.toString();
							  document.getElementById("env21").innerHTML= n;
							  listID2ENV21.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'Medium'){
						      document.getElementById('env22').classList.add("circle-text");
							  document.getElementById('env22').style.backgroundColor = "#414449";
						      num2ENV22++;
							  var n = num2ENV22.toString();
							  document.getElementById("env22").innerHTML= n;
							  listID2ENV22.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'High'){
						      document.getElementById('env23').classList.add("circle-text");
							  document.getElementById('env23').style.backgroundColor = "#414449";
						      num2ENV23++;
							  var n = num2ENV23.toString();
							  document.getElementById("env23").innerHTML= n;
							  listID2ENV23.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'VeryHigh'){
						      document.getElementById('env24').classList.add("circle-text");
							  document.getElementById('env24').style.backgroundColor = "#414449";
						      num2ENV24++;
							  var n = num2ENV24.toString();
							  document.getElementById("env24").innerHTML= n;
							  listID2ENV24.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //End Environment and Com
						   
						   //Reputation
						   if(dataList[i].orm_reputation__c == 'Low'){
						      document.getElementById('rep21').classList.add("circle-text");
							  document.getElementById('rep21').style.backgroundColor = "#414449";
						      num2REP21++;
							  var n = num2REP21.toString();
							  document.getElementById("rep21").innerHTML= n;
							  listID2REP21.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'Medium'){
						      document.getElementById('rep22').classList.add("circle-text");
							  document.getElementById('rep22').style.backgroundColor = "#414449";
						      num2REP22++;
							  var n = num2REP22.toString();
							  document.getElementById("rep22").innerHTML= n;
							  listID2REP22.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'High'){
						      document.getElementById('rep23').classList.add("circle-text");
							  document.getElementById('rep23').style.backgroundColor = "#414449";
						      num2REP23++;
							  var n = num2REP23.toString();
							  document.getElementById("rep23").innerHTML= n;
							  listID2REP23.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'VeryHigh'){
						      document.getElementById('rep24').classList.add("circle-text");
							  document.getElementById('rep24').style.backgroundColor = "#414449";
						      num2REP24++;
							  var n = num2REP24.toString();
							  document.getElementById("rep24").innerHTML= n;
							  listID2REP24.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //End Reputation
						   
						   //Working Env
						   if(dataList[i].orm_workingEnvironment__c == 'One employee considers resigning'){
						      document.getElementById('we21').classList.add("circle-text");
							  document.getElementById('we21').style.backgroundColor = "#414449";
						      num2WE21++;
							  var n = num2WE21.toString();
							  document.getElementById("we21").innerHTML= n;
							  listID2WE21.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees consider resigning'){
						      document.getElementById('we22').classList.add("circle-text");
							  document.getElementById('we22').style.backgroundColor = "#414449";
						      num2WE22++;
							  var n = num2WE22.toString();
							  document.getElementById("we22").innerHTML= n;
							  listID2WE22.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'One employee resigns'){
						      document.getElementById('we23').classList.add("circle-text");
							  document.getElementById('we23').style.backgroundColor = "#414449";
						      num2WE23++;
							  var n = num2WE23.toString();
							  document.getElementById("we23").innerHTML= n;
							  listID2WE23.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees resign'){
						      document.getElementById('we24').classList.add("circle-text");
							  document.getElementById('we24').style.backgroundColor = "#414449";
						      num2WE24++;
							  var n = num2WE24.toString();
							  document.getElementById("we24").innerHTML= n;
							  listID2WE24.push(dataList[i].orm_assessmentRisk__c);
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
							  listID3HS31.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'Medium'){
						      document.getElementById('hs32').classList.add("circle-text");
							  document.getElementById('hs32').style.backgroundColor = "#414449";
						      num3HS32++;
							  var n = num3HS32.toString();
							  document.getElementById("hs32").innerHTML= n;
							  listID3HS32.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'High'){
						      document.getElementById('hs33').classList.add("circle-text");
							  document.getElementById('hs33').style.backgroundColor = "#414449";
						      num3HS33++;
							  var n = num3HS33.toString();
							  document.getElementById("hs33").innerHTML= n;
							  listID3HS33.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'VeryHigh'){
						      document.getElementById('hs34').classList.add("circle-text");
							  document.getElementById('hs34').style.backgroundColor = "#414449";
						      num3HS34++;
							  var n = num3HS34.toString();
							  document.getElementById("hs34").innerHTML= n;
							  listID3HS34.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //end health and safety
						   
						   //security
						   if(dataList[i].orm_security__c == 'Low'){
						      document.getElementById('sec31').classList.add("circle-text");
							  document.getElementById('sec31').style.backgroundColor = "#414449";
						      num3SEC31++;
							  var n = num3SEC31.toString();
							  document.getElementById("sec31").innerHTML= n;
							  listID3SEC31.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'Medium'){
						      document.getElementById('sec32').classList.add("circle-text");
							  document.getElementById('sec32').style.backgroundColor = "#414449";
						      num3SEC32++;
							  var n = num3SEC32.toString();
							  document.getElementById("sec32").innerHTML= n;
							  listID3SEC32.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'High'){
						      document.getElementById('sec33').classList.add("circle-text");
							  document.getElementById('sec33').style.backgroundColor = "#414449";
						      num3SEC33++;
							  var n = num3SEC33.toString();
							  document.getElementById("sec33").innerHTML= n;
							  listID3SEC33.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'VeryHigh'){
						      document.getElementById('sec34').classList.add("circle-text");
							  document.getElementById('sec34').style.backgroundColor = "#414449";
						      num3SEC34++;
							  var n = num3SEC34.toString();
							  document.getElementById("sec34").innerHTML= n;
							  listID3SEC34.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //security
						   
						   //Environment and Com
						   if(dataList[i].orm_environment__c == 'Low'){
						      document.getElementById('env31').classList.add("circle-text");
							  document.getElementById('env31').style.backgroundColor = "#414449";
						      num3ENV31++;
							  var n = num3ENV31.toString();
							  document.getElementById("env31").innerHTML= n;
							  listID3ENV31.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'Medium'){
						      document.getElementById('env32').classList.add("circle-text");
							  document.getElementById('env32').style.backgroundColor = "#414449";
						      num3ENV32++;
							  var n = num3ENV32.toString();
							  document.getElementById("env32").innerHTML= n;
							  listID3ENV32.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'High'){
						      document.getElementById('env33').classList.add("circle-text");
							  document.getElementById('env33').style.backgroundColor = "#414449";
						      num3ENV33++;
							  var n = num3ENV33.toString();
							  document.getElementById("env33").innerHTML= n;
							  listID3ENV33.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'VeryHigh'){
						      document.getElementById('env34').classList.add("circle-text");
							  document.getElementById('env34').style.backgroundColor = "#414449";
						      num3ENV34++;
							  var n = num3ENV34.toString();
							  document.getElementById("env34").innerHTML= n;
							  listID3ENV34.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //End Environment and Com
						   
						   //Repuatation
						   if(dataList[i].orm_reputation__c == 'Low'){
						      document.getElementById('rep31').classList.add("circle-text");
							  document.getElementById('rep31').style.backgroundColor = "#414449";
						      num3REP31++;
							  var n = num3REP31.toString();
							  document.getElementById("rep31").innerHTML= n;
							  listID3REP31.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'Medium'){
						      document.getElementById('rep32').classList.add("circle-text");
							  document.getElementById('rep32').style.backgroundColor = "#414449";
						      num3REP32++;
							  var n = num3REP32.toString();
							  document.getElementById("rep32").innerHTML= n;
							  listID3REP32.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'High'){
						      document.getElementById('rep33').classList.add("circle-text");
							  document.getElementById('rep33').style.backgroundColor = "#414449";
						      num3REP33++;
							  var n = num3REP33.toString();
							  document.getElementById("rep33").innerHTML= n;
							  listID3REP33.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'VeryHigh'){
						      document.getElementById('rep34').classList.add("circle-text");
							  document.getElementById('rep34').style.backgroundColor = "#414449";
						      num3REP34++;
							  var n = num3REP34.toString();
							  document.getElementById("rep34").innerHTML= n;
							  listID3REP34.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //End Repuatation
						   
						   //Working Env
						   if(dataList[i].orm_workingEnvironment__c == 'One employee considers resigning'){
						      document.getElementById('we31').classList.add("circle-text");
							  document.getElementById('we31').style.backgroundColor = "#414449";
						      num3WE31++;
							  var n = num3WE31.toString();
							  document.getElementById("we31").innerHTML= n;
							  listID3WE31.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees consider resigning'){
						      document.getElementById('we32').classList.add("circle-text");
							  document.getElementById('we32').style.backgroundColor = "#414449";
						      num3WE32++;
							  var n = num3WE32.toString();
							  document.getElementById("we32").innerHTML= n;
							  listID3WE32.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'One employee resigns'){
						      document.getElementById('we33').classList.add("circle-text");
							  document.getElementById('we33').style.backgroundColor = "#414449";
						      num3WE33++;
							  var n = num3WE33.toString();
							  document.getElementById("we33").innerHTML= n;
							  listID3WE33.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees resign'){
						      document.getElementById('we34').classList.add("circle-text");
							  document.getElementById('we34').style.backgroundColor = "#414449";
						      num3WE34++;
							  var n = num3WE34.toString();
							  document.getElementById("we34").innerHTML= n;
							  listID3WE34.push(dataList[i].orm_assessmentRisk__c);
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
							  listID4HS41.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'Medium'){
						      document.getElementById('hs42').classList.add("circle-text");
							  document.getElementById('hs42').style.backgroundColor = "#414449";
						      num4HS42++;
							  var n = num4HS42.toString();
							  document.getElementById("hs42").innerHTML= n;
							  listID4HS42.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'High'){
						      document.getElementById('hs43').classList.add("circle-text");
							  document.getElementById('hs43').style.backgroundColor = "#414449";
						      num4HS43++;
							  var n = num4HS43.toString();
							  document.getElementById("hs43").innerHTML= n;
							  listID4HS43.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_healthAndSafety__c == 'VeryHigh'){
						      document.getElementById('hs44').classList.add("circle-text");
							  document.getElementById('hs44').style.backgroundColor = "#414449";
						      num4HS44++;
							  var n = num4HS44.toString();
							  document.getElementById("hs44").innerHTML= n;
							  listID4HS43.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //end health and safety
						   
						   // security
						   if(dataList[i].orm_security__c == 'Low'){
						      document.getElementById('sec41').classList.add("circle-text");
							  document.getElementById('sec41').style.backgroundColor = "#414449";
						      num4SEC41++;
							  var n = num4SEC41.toString();
							  document.getElementById("sec41").innerHTML= n;
							  listID4SEC41.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'Medium'){
						      document.getElementById('sec42').classList.add("circle-text");
							  document.getElementById('sec42').style.backgroundColor = "#414449";
						      num4SEC42++;
							  var n = num4SEC42.toString();
							  document.getElementById("sec42").innerHTML= n;
							  listID4SEC42.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'High'){
						      document.getElementById('sec43').classList.add("circle-text");
							  document.getElementById('sec43').style.backgroundColor = "#414449";
						      num4SEC43++;
							  var n = num4SEC43.toString();
							  document.getElementById("sec43").innerHTML= n;
							  listID4SEC43.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_security__c == 'VeryHigh'){
						      document.getElementById('sec44').classList.add("circle-text");
							  document.getElementById('sec44').style.backgroundColor = "#414449";
						      num4SEC44++;
							  var n = num4SEC44.toString();
							  document.getElementById("sec44").innerHTML= n;
							  listID4SEC44.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //end security
						   
						   //Environment and Com
						   if(dataList[i].orm_environment__c == 'Low'){
						      document.getElementById('env41').classList.add("circle-text");
							  document.getElementById('env41').style.backgroundColor = "#414449";
						      num4ENV41++;
							  var n = num4ENV41.toString();
							  document.getElementById("env41").innerHTML= n;
							  listID4ENV41.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'Medium'){
						      document.getElementById('env42').classList.add("circle-text");
							  document.getElementById('env42').style.backgroundColor = "#414449";
						      num4ENV42++;
							  var n = num4ENV42.toString();
							  document.getElementById("env42").innerHTML= n;
							  listID4ENV42.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'High'){
						      document.getElementById('env43').classList.add("circle-text");
							  document.getElementById('env43').style.backgroundColor = "#414449";
						      num4ENV43++;
							  var n = num4ENV43.toString();
							  document.getElementById("env43").innerHTML= n;
							  listID4ENV43.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_environment__c == 'VeryHigh'){
						      document.getElementById('env44').classList.add("circle-text");
							  document.getElementById('env44').style.backgroundColor = "#414449";
						      num4ENV44++;
							  var n = num4ENV44.toString();
							  document.getElementById("env44").innerHTML= n;
							  listID4ENV44.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //End Environment and Com
						   
						   //Reputation
						   if(dataList[i].orm_reputation__c == 'Low'){
						      document.getElementById('rep41').classList.add("circle-text");
							  document.getElementById('rep41').style.backgroundColor = "#414449";
						      num4REP41++;
							  var n = num4REP41.toString();
							  document.getElementById("rep41").innerHTML= n;
							  listID4REP41.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'Medium'){
						      document.getElementById('rep42').classList.add("circle-text");
							  document.getElementById('rep42').style.backgroundColor = "#414449";
						      num4REP42++;
							  var n = num4REP42.toString();
							  document.getElementById("rep42").innerHTML= n;
							  listID4REP42.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'High'){
						      document.getElementById('rep43').classList.add("circle-text");
							  document.getElementById('rep43').style.backgroundColor = "#414449";
						      num4REP43++;
							  var n = num4REP43.toString();
							  document.getElementById("rep43").innerHTML= n;
							  listID4REP43.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_reputation__c == 'VeryHigh'){
						      document.getElementById('rep44').classList.add("circle-text");
							  document.getElementById('rep44').style.backgroundColor = "#414449";
						      num4REP44++;
							  var n = num4REP44.toString();
							  document.getElementById("rep44").innerHTML= n;
							  listID4REP44.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //End Reputation
						   
						   //Working env
						   if(dataList[i].orm_workingEnvironment__c == 'One employee considers resigning'){
						      document.getElementById('we41').classList.add("circle-text");
							  document.getElementById('we41').style.backgroundColor = "#414449";
						      num4WE41++;
							  var n = num4WE41.toString();
							  document.getElementById("we41").innerHTML= n;
							  listID4WE41.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees consider resigning'){
						      document.getElementById('we42').classList.add("circle-text");
							  document.getElementById('we42').style.backgroundColor = "#414449";
						      num4WE42++;
							  var n = num4WE42.toString();
							  document.getElementById("we42").innerHTML= n;
							  listID4WE42.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'One employee resigns'){
						      document.getElementById('we43').classList.add("circle-text");
							  document.getElementById('we43').style.backgroundColor = "#414449";
						      num4WE43++;
							  var n = num4WE43.toString();
							  document.getElementById("we43").innerHTML= n;
							  listID4WE43.push(dataList[i].orm_assessmentRisk__c);
						   }
						   if(dataList[i].orm_workingEnvironment__c == 'Several employees resign'){
						      document.getElementById('we44').classList.add("circle-text");
							  document.getElementById('we44').style.backgroundColor = "#414449";
						      num4WE44++;
							  var n = num4WE44.toString();
							  document.getElementById("we44").innerHTML= n;
							  listID4WE44.push(dataList[i].orm_assessmentRisk__c);
						   }
						   //End Working env
						}
				   }
				  component.set("v.listIDHS11",  listIDHS11);
				  component.set("v.listIDHS12",  listIDHS12);
				  component.set("v.listIDHS13",  listIDHS13);
				  component.set("v.listIDHS14",  listIDHS14);
				  component.set("v.listIDSEC11", listIDSEC11);
				  component.set("v.listIDSEC12", listIDSEC12);
				  component.set("v.listIDSEC13", listIDSEC13);
				  component.set("v.listIDSEC14", listIDSEC14);
				  component.set("v.listIDENV11", listIDENV11);
				  component.set("v.listIDENV12", listIDENV12);
				  component.set("v.listIDENV13", listIDENV13);
				  component.set("v.listIDENV14", listIDENV14);
				  component.set("v.listIDREP11", listIDREP11);
				  component.set("v.listIDREP12", listIDREP12);
				  component.set("v.listIDREP13", listIDREP13);
				  component.set("v.listIDREP14", listIDREP14);
				  component.set("v.listIDWE11",  listIDWE11);
				  component.set("v.listIDWE12",  listIDWE12);
				  component.set("v.listIDWE13",  listIDWE13);
				  component.set("v.listIDWE14",  listIDWE14);
				  component.set("v.listID2HS21", listID2HS21);
				  component.set("v.listID2HS22", listID2HS22);
				  component.set("v.listID2HS23", listID2HS23);
				  component.set("v.listID2HS24", listID2HS24);
				  component.set("v.listID2SEC21", listID2SEC21);
				  component.set("v.listID2SEC22", listID2SEC22);
				  component.set("v.listID2SEC23", listID2SEC23);
				  component.set("v.listID2SEC24", listID2SEC24);
				  component.set("v.listID2ENV21", listID2ENV21);
				  component.set("v.listID2ENV22", listID2ENV22);
				  component.set("v.listID2ENV23", listID2ENV23);
				  component.set("v.listID2ENV24", listID2ENV24);
				  component.set("v.listID2REP21", listID2REP21);
				  component.set("v.listID2REP22", listID2REP22);
				  component.set("v.listID2REP23", listID2REP23);
				  component.set("v.listID2REP24", listID2REP24);
				  component.set("v.listID2WE21",  listID2WE21);
				  component.set("v.listID2WE22",  listID2WE22);
				  component.set("v.listID2WE23",  listID2WE23);
				  component.set("v.listID2WE24",  listID2WE24);
				  component.set("v.listID3HS31",  listID3HS31);
				  component.set("v.listID3HS32",  listID3HS32);
				  component.set("v.listID3HS33",  listID3HS33);
				  component.set("v.listID3HS34",  listID3HS34);
				  component.set("v.listID3SEC31", listID3SEC31);
				  component.set("v.listID3SEC32", listID3SEC32);
				  component.set("v.listID3SEC33", listID3SEC33);
				  component.set("v.listID3SEC34", listID3SEC34);
				  component.set("v.listID3ENV31", listID3ENV31);
				  component.set("v.listID3ENV32", listID3ENV32);
				  component.set("v.listID3ENV33", listID3ENV33);
				  component.set("v.listID3ENV34", listID3ENV34);
				  component.set("v.listID3REP31", listID3REP31);
				  component.set("v.listID3REP32", listID3REP32);
				  component.set("v.listID3REP33", listID3REP33);
				  component.set("v.listID3REP34", listID3REP34);
				  component.set("v.listID3WE31",  listID3WE31);
				  component.set("v.listID3WE32",  listID3WE32);
				  component.set("v.listID3WE33",  listID3WE33);
				  component.set("v.listID3WE34",  listID3WE34);
				  component.set("v.listID4HS41",  listID4HS41);
				  component.set("v.listID4HS42",  listID4HS42);
				  component.set("v.listID4HS43",  listID4HS43);
				  component.set("v.listID4HS44",  listID4HS44);
				  component.set("v.listID4SEC41", listID4SEC41);
				  component.set("v.listID4SEC42", listID4SEC42);
				  component.set("v.listID4SEC43", listID4SEC43);
				  component.set("v.listID4SEC44", listID4SEC44);
				  component.set("v.listID4ENV41", listID4ENV41);
				  component.set("v.listID4ENV42", listID4ENV42);
				  component.set("v.listID4ENV43", listID4ENV43);
				  component.set("v.listID4ENV44", listID4ENV44);
				  component.set("v.listID4REP41", listID4REP41);
				  component.set("v.listID4REP42", listID4REP42);
				  component.set("v.listID4REP43", listID4REP43);
				  component.set("v.listID4REP44", listID4REP44);
				  component.set("v.listID4WE41",  listID4WE41);
				  component.set("v.listID4WE42",  listID4WE42);
				  component.set("v.listID4WE43",  listID4WE43);
				  component.set("v.listID4WE44",  listID4WE44);
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
	
	showRiskHS11 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	    evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDHS11") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        //Hide the Spinner
                var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
	            evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		        console.log('****lets look*****');
		        console.log(JSON.stringify(component.get("v.assessmentRisks")))
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS12 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDHS12") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS13 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDHS13") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS14 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDHS14") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS21 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2HS21") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS22 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2HS22") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS23 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2HS23") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS24 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2HS24") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS31 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3HS31") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS32 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3HS32") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS33 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3HS33") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS34 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3HS34") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS41 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4HS41") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS42 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4HS42") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS43 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4HS43") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskHS44 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4HS44") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC11 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDSEC11") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC12 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDSEC12") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC13 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDSEC13") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC14 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDSEC14") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC21 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2SEC21") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC22 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2SEC22") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC23 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2SEC23") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC24 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2SEC24") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC31 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3SEC31") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC32 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3SEC32") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC33 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3SEC33") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC34 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3SEC34") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC41 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4SEC41") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC42 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4SEC42") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC43 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4SEC43") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskSEC44 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4SEC44") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV11 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDENV11") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV12 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDENV12") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV13 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDENV13") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV14 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDENV14") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV21 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2ENV21") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV22 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2ENV22") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV23 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2ENV23") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV24 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2ENV24") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV31 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3ENV31") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV32 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3ENV32") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV33 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3ENV33") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV34 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3ENV34") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV41 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4ENV41") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV42 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4ENV42") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV43 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4ENV43") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	showRiskENV44 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4ENV44") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP11 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDREP11") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP12 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDREP12") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP13 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDREP13") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP14 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDREP14") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP21 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2REP21") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP22 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2REP22") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP23 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2REP23") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP24 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2REP24") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP31 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3REP31") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP32 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3REP32") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP33 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3REP33") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP34 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3REP34") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP41 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4REP41") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP42 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4REP42") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP43 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4REP43") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDREP44 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4REP44") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE11 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDWE11") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE12 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDWE12") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE13 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDWE13") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE14 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listIDWE14") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE21 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2WE21") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE22 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2WE22") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE23 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2WE23") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE24 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID2WE24") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE31 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3WE31") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE32 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3WE32") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE33 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3WE33") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE34 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID3WE34") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE41 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4WE41") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE42 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4WE42") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE43 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4WE43") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	listIDWE44 : function(component, event, helper) {
	    var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
        evtShowSpinner.fire();
	    var actionGetAssessmentRisks = component.get("c.getAssessmentRisks");
		actionGetAssessmentRisks.setParams({"idAssRisk": component.get("v.listID4WE44") });
		actionGetAssessmentRisks.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
                evtHideSpinner.fire();
		        document.getElementById("infoMatrice").style.display = "block";
		        component.set('v.assessmentRisks', response.getReturnValue());
		    } else {
		        alert($A.get("$Label.c.orm_not_found"));
		    }
		});
		$A.enqueueAction(actionGetAssessmentRisks); 
	},
	closeFD : function(component, event, helper) {
	    document.getElementById("infoMatrice").style.display = "none";
	},
})