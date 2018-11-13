({
    fetchPicklist: function(component, event, idAsssessmentRisk) {
        this.getHsseImpacts(component, event);
        this.getBusinessImpacts(component, event);
        console.log(component.get("v.assessmentData").Id);
        var actionWorkingEnvironment = component.get("c.getSelectOptions");
        actionWorkingEnvironment.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'orm_workingEnvironment__c'
        });
        var arrayWorkingEnvironment = [];
        actionWorkingEnvironment.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var allValuesWorkingEnvironment = response.getReturnValue();
                if (allValuesWorkingEnvironment != undefined && allValuesWorkingEnvironment.length > 0) {
                    var none="---None---";
                    arrayWorkingEnvironment = [none, ...allValuesWorkingEnvironment];
                }
                component.set('v.workingEnvironments', arrayWorkingEnvironment);
                //manageAbility
                var actionManageability = component.get("c.getSelectOptions");
                actionManageability.setParams({
                    "objObject": component.get("v.objInfo"),
                    "fld": 'orm_manageability__c'
                });
                var arrayManageability = [];
                actionManageability.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                        var allValuesManageability = response.getReturnValue();
		                if (allValuesManageability != undefined && allValuesManageability.length > 0) {
		                    var none="---None---";
		                    arrayManageability = [none, ...allValuesManageability];
		                }
                        component.set('v.manageAbility', arrayManageability);
                                        //status
                                        var actionstatus = component.get("c.getSelectOptions");
                                        actionstatus.setParams({
                                            "objObject": component.get("v.objInfo"),
                                            "fld": 'orm_status__c'
                                        });
                                        var arrayStatus = [];
                                        actionstatus.setCallback(this, function(response) {
                                            var state = response.getState();
                                            if (state === 'SUCCESS') {
                                                var allValuesStatus = response.getReturnValue();
								                if (allValuesStatus != undefined && allValuesStatus.length > 0) {
								                    var none="---None---";
								                    arrayStatus = [none, ...allValuesStatus];
								                }
                                                component.set('v.status', arrayStatus);
                                                //Uncertainty
                                                var actionUncertainty = component.get("c.getSelectOptions");
                                                actionUncertainty.setParams({
                                                    "objObject": component.get("v.objInfo"),
                                                    "fld": 'orm_uncertainty__c'
                                                });
                                                var arrayUncertainty = [];
                                                actionUncertainty.setCallback(this, function(response) {
                                                    var state = response.getState();
                                                    if (state === 'SUCCESS') {
                                                        var allValuesUncertainty = response.getReturnValue();
										                if (allValuesUncertainty != undefined && allValuesUncertainty.length > 0) {
										                    var none="---None---";
										                    arrayUncertainty = [none, ...allValuesUncertainty];
										                }
                                                        component.set('v.uncertainties', arrayUncertainty);
                                                        
                                                        var actionUser = component.get("c.getUsers");
													    actionUser.setCallback(this, function(response){
													            var state = response.getState();
													            if(state === 'SUCCESS'){
													               
													                component.set('v.allUser', response.getReturnValue());
			                                                        //get AssessmentRisk
			                                                        var actionGetAssessmentRisk = component.get("c.findAssessmentRisk");
			                                                        actionGetAssessmentRisk.setParams({
			                                                            "item": idAsssessmentRisk
			                                                        });
			                                                        actionGetAssessmentRisk.setCallback(this, function(response) {
			                                                            var state = response.getState();
			                                                            if (state === 'SUCCESS') {
			                                                                component.set("v.showBtnMatricePicture", true);
			                                                                component.set('v.assessmentRiskData', response.getReturnValue());			          
			                                                                component.find("workingEnvironment").set("v.value", component.get('v.assessmentRiskData').orm_manageability__c);
			                                                                component.find("workingEnvironment").set("v.value", component.get('v.assessmentRiskData').orm_workingEnvironment__c);
			                                                                
			                                                                component.find("slider1").set("v.value", component.get('v.assessmentRiskData').orm_probability__c);
			                                                                component.find("status").set("v.value", component.get('v.assessmentRiskData').orm_status__c);
			                                                                component.find("uncertainty").set("v.value", component.get('v.assessmentRiskData').orm_uncertainty__c);
			                                                                component.find("riskManager").set("v.value", component.get('v.assessmentRiskData').orm_riskManager__c);
			                                                                var sliderValue = component.get("v.assessmentRiskData").orm_probability__c;
			                                                               
			                                                                if(sliderValue==null){
			                                                                	
			                                                                }else{
				                                                                if (sliderValue >= component.get("v.RareData.orm_pourcentageMin__c") && sliderValue <= component.get("v.RareData.orm_pourcentageMax__c")) {
				                                                                    document.getElementById("divColor").style.backgroundColor = "green";
				                                                                    document.getElementById("divColor").innerHTML = component.get("v.RareData.orm_probability__c") + '(' + sliderValue +')';
				                                                                  
				                                                                
				                                                                } else if (sliderValue > component.get("v.unlikelyData.orm_pourcentageMin__c") && sliderValue <= component.get("v.unlikelyData.orm_pourcentageMax__c")) {
				                                                                    document.getElementById("divColor").style.backgroundColor = "yellow";
				                                                                    document.getElementById("divColor").innerHTML = component.get("v.unlikelyData.orm_probability__c")+ '(' + sliderValue +')';
				                                                                
				                                                                } else if (sliderValue > component.get("v.possibleData.orm_pourcentageMin__c") && sliderValue <= component.get("v.possibleData.orm_pourcentageMax__c")) {
				                                                                    document.getElementById("divColor").style.backgroundColor = "orange";
				                                                                    document.getElementById("divColor").innerHTML = component.get("v.possibleData.orm_probability__c")+ '(' + sliderValue +')';
				                                                                
				                                                                } else {
				                                                                    document.getElementById("divColor").style.backgroundColor = "red";
				                                                                    document.getElementById("divColor").innerHTML = component.get("v.probableData.orm_probability__c")+ '(' + sliderValue +')';
				                                                               
				                                                                }
			                                                                
			                                                             }
			
			                                                                this.getSliderDefault(component, event);
			                                                                this.getSliderBusinessDefault(component,event);
			                                                                
			                                                                var actionMT = component.get('c.getInfosAssessmentRiskForMatriceTable');
																			actionMT.setParams({"assessmentRisk": component.get("v.assessmentRiskData").Id });
																			actionMT.setCallback(this,function(response) {
																			      var state = response.getState();
																			      console.log(state)
																			      console.log(component.get("v.assessmentRiskData").Id )
																			      if (state == "SUCCESS") {
																			         if(response.getReturnValue() != null){
																			            component.set("v.data", response.getReturnValue());
																			         }
																			         var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
			                                                                         evtSpinner.fire();
																			         console.log('*****Show data Object in actionMT******');
																			         console.log(JSON.stringify(component.get("v.data")));
																			         console.log('*****After******');
																			         
																			      }
																			});
																			$A.enqueueAction(actionMT);
			                                                            } else {
			
			                                                                alert($A.get("$Label.c.orm_not_found"));
			                                                            }
			                                                        });
			                                                        $A.enqueueAction(actionGetAssessmentRisk);
			                                                        } else {
															            alert($A.get("$Label.c.orm_not_found"));
															        }
													   });
										               $A.enqueueAction(actionUser);
                                                    } else {
                                                        alert($A.get("$Label.c.orm_not_found"));
                                                    }
                                                });
                                                $A.enqueueAction(actionUncertainty);

                                            } else {
                                                alert($A.get("$Label.c.orm_not_found"));
                                            }
                                        });
                                        $A.enqueueAction(actionstatus);

                                   
                    } else {
                        alert($A.get("$Label.c.orm_not_found"));
                    }
                });
                $A.enqueueAction(actionManageability);

            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        $A.enqueueAction(actionWorkingEnvironment);
    },

    getProbality: function(component, event) {
        var action = component.get('c.findAllProbabilitiesByAssessment');
        action.setParams({
            "assessment": component.get("v.assessmentData").Id
        });
        action.setCallback(this, function(response) {
            if (response.getState() == 'SUCCESS') {

                component.set("v.probabilities", response.getReturnValue());
                if (component.get("v.probabilities").length > 0) {

                    for (var i = 0; i < component.get("v.probabilities").length; i++) {
                        if (component.get("v.probabilities")[i].orm_probability__c == 'Probable') {
                            component.set("v.probableData", component.get("v.probabilities")[i]);
                        }
                        if (component.get("v.probabilities")[i].orm_probability__c == 'Possible') {
                            component.set("v.possibleData", component.get("v.probabilities")[i]);
                        }
                        if (component.get("v.probabilities")[i].orm_probability__c == 'Unlikely') {
                            component.set("v.unlikelyData", component.get("v.probabilities")[i]);
                        }
                        if (component.get("v.probabilities")[i].orm_probability__c == 'Rare') {
                            component.set("v.RareData", component.get("v.probabilities")[i]);
                        }
                    }
                }
            } else {
                alert("ERROR")
            }
        });
        $A.enqueueAction(action);
    },
    getHsseImpacts: function(component, event, helper) {
        var action = component.get('c.findHsseImpactsByAssessment');
        action.setParams({
            "assessment": component.get("v.assessmentData").Id
        });
        action.setCallback(this, function(response) {
            if (response.getState() == 'SUCCESS') {

                component.set("v.hsseImpacts", response.getReturnValue());
                if (component.get("v.hsseImpacts").length > 0) {

                    for (var i = 0; i < component.get("v.hsseImpacts").length; i++) {
                        if (component.get("v.hsseImpacts")[i].orm_rating__c == 'VeryHigh') {
                            component.set("v.hsseVeryHighData", component.get("v.hsseImpacts")[i]);

                        }
                        if (component.get("v.hsseImpacts")[i].orm_rating__c == 'High') {
                            component.set("v.hsseHighData", component.get("v.hsseImpacts")[i]);
                        }
                        if (component.get("v.hsseImpacts")[i].orm_rating__c == 'Medium') {
                            component.set("v.hsseMediumData", component.get("v.hsseImpacts")[i]);
                        }
                        if (component.get("v.hsseImpacts")[i].orm_rating__c == 'Low') {
                            component.set("v.hsseLowData", component.get("v.hsseImpacts")[i]);
                        }
                    }
                }
            } else {
                alert("ERROR getHsseImpacts")
            }
        });
        $A.enqueueAction(action);
    },
    getBusinessImpacts: function(component, event) {
               var actionGetBusinessImpacts = component.get('c.findBusinessImpactsByAssessment');
	            actionGetBusinessImpacts.setParams({ "assessment": component.get("v.assessmentData").Id });
	            actionGetBusinessImpacts.setCallback(this, function(response) {
				        if(response.getState() == 'SUCCESS'){
				        	component.set("v.businessImpacts", response.getReturnValue());
				        	if(component.get("v.businessImpacts").length > 0){
				        	
			        	       for (var i = 0; i < component.get("v.businessImpacts").length; i++) {
			        	       
			                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'VeryHigh' ){
			                         component.set("v.businessImpVeryHighData", component.get("v.businessImpacts")[i]);
			                      }
			                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'High' ){
			                         component.set("v.businessImpHighData", component.get("v.businessImpacts")[i]);
			                      }
			                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'Medium' ){
			                         component.set("v.businessImpMediumData", component.get("v.businessImpacts")[i]);
			                      }
			                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'Low' ){
			                         component.set("v.businessImpLowData", component.get("v.businessImpacts")[i]);
			                      }
		                        }
					        }	
				        	
				        } else {
				        	alert("ERROR")	
				        }
	               });
	               $A.enqueueAction(actionGetBusinessImpacts);
	         
	         },
	         
    getSliderDefault: function(component, event, helper) {
    	if(component.get("v.hsseImpacts").length == 0){
    	}else{
	        var r0 = component.find("r0").get("v.value");
	        var r1 = component.find("r1").get("v.value");
	        var r2 = component.find("r2").get("v.value");
	        var r3 = component.find("r3").get("v.value");
	        
	        var rr0 = component.find("rr0").get("v.value");
	        var rr1 = component.find("rr1").get("v.value");
	        var rr2 = component.find("rr2").get("v.value");
	        var rr3 = component.find("rr3").get("v.value");
	        
	        var rrr0 = component.find("rrr0").get("v.value");
	        var rrr1 = component.find("rrr1").get("v.value");
	        var rrr2 = component.find("rrr2").get("v.value");
	        var rrr3 = component.find("rrr3").get("v.value");
        
        if (component.get('v.assessmentRiskData').orm_healthAndSafety__c == r0) {
            document.getElementById('healthAndSafety').style.backgroundColor = "red";
            document.getElementById('healthAndSafety').style.border = "2px solid #5B86BE";
            document.getElementById('healthAndSafety').innerHTML = 'Very High'; 
          /*var data = component.get("v.data");
		    data.orm_healthAndSafety__c = 'VeryHigh';
		    component.set("v.data", data);*/
        }
        if (component.get('v.assessmentRiskData').orm_healthAndSafety__c == r1) {
            document.getElementById('healthAndSafety').style.backgroundColor = "orange";
            document.getElementById('healthAndSafety').style.border = "2px solid #5B86BE";
            document.getElementById("healthAndSafety").innerHTML = 'High';
           /*var data = component.get("v.data");
		    data.orm_healthAndSafety__c = 'High';
		    component.set("v.data", data);*/
        }
        if (component.get('v.assessmentRiskData').orm_healthAndSafety__c == r2) {
            document.getElementById('healthAndSafety').style.backgroundColor = "yellow";
            document.getElementById('healthAndSafety').style.border = "2px solid #5B86BE";
            document.getElementById("healthAndSafety").innerHTML = 'Medium';
          /*var data = component.get("v.data");
		    data.orm_healthAndSafety__c = 'Medium';
		    component.set("v.data", data);*/
        }
        if (component.get('v.assessmentRiskData').orm_healthAndSafety__c == r3) {
            document.getElementById('healthAndSafety').style.backgroundColor = "green";
            document.getElementById('healthAndSafety').style.border = "2px solid #5B86BE";
            document.getElementById("healthAndSafety").innerHTML = 'Low';
          /*var data = component.get("v.data");
		    data.orm_healthAndSafety__c = 'Low';
		    component.set("v.data", data);*/
        }
         if(component.get('v.assessmentRiskData').orm_security__c  == rr0){
			 document.getElementById('security').style.backgroundColor = "red";
			 document.getElementById('security').style.border = "2px solid #5B86BE";
			 document.getElementById("security").innerHTML= 'Very High';
		   /*var data = component.get("v.data");
		     data.orm_security__c = 'VeryHigh'
		     component.set("v.data", data);*/
		 } 
		 
		 if (component.get('v.assessmentRiskData').orm_security__c == rr1){
			 document.getElementById('security').style.backgroundColor = "orange";
			 document.getElementById('security').style.border = "2px solid #5B86BE";
			 document.getElementById("security").innerHTML= 'High';
		   /*var data = component.get("v.data");
		     data.orm_security__c = 'High'
		     component.set("v.data", data);*/
		 }
		 
		  if (component.get('v.assessmentRiskData').orm_security__c == rr2 ){
			  document.getElementById('security').style.backgroundColor = "yellow";
			  document.getElementById('security').style.border = "2px solid #5B86BE";
			  document.getElementById("security").innerHTML= 'Medium';
			/*var data = component.get("v.data");
		      data.orm_security__c = 'Medium'
		      component.set("v.data", data);*/
		 }
		 
		 if(component.get('v.assessmentRiskData').orm_security__c == rr3 ){
			  document.getElementById('security').style.backgroundColor = "green";
			  document.getElementById('security').style.border = "2px solid #5B86BE";
			  document.getElementById("security").innerHTML= 'Low';
			 /*var data = component.get("v.data");
		      data.orm_security__c = 'Low'
		      component.set("v.data", data);*/
		 }
		 
		 if(component.get('v.assessmentRiskData').orm_environmentAndCommunity__c  == rrr0){
			 document.getElementById('environment').style.backgroundColor = "red";
			 document.getElementById('environment').style.border = "2px solid #5B86BE";
			 document.getElementById("environment").innerHTML= 'Very High';
		   /*var data = component.get("v.data");
		     data.orm_environment__c = 'VeryHigh'
		     component.set("v.data", data);*/
		 } 
		 
		 if (component.get('v.assessmentRiskData').orm_environmentAndCommunity__c == rrr1 ){
			 document.getElementById('environment').style.backgroundColor = "orange";
			 document.getElementById('environment').style.border = "2px solid #5B86BE"; 
			 document.getElementById("environment").innerHTML= 'High';
		   /*var data = component.get("v.data");
		     data.orm_environment__c = 'High'
		     component.set("v.data", data);*/
		 }
		 
		 if (component.get('v.assessmentRiskData').orm_environmentAndCommunity__c == rrr2){
			 document.getElementById('environment').style.backgroundColor = "yellow";
			 document.getElementById('environment').style.border = "2px solid #5B86BE";
			 document.getElementById("environment").innerHTML= 'Medium';
		   /*var data = component.get("v.data");
		     data.orm_environment__c = 'Medium'
		     component.set("v.data", data);*/
		 }
		 if(component.get('v.assessmentRiskData').orm_environmentAndCommunity__c == rrr3){
			  document.getElementById('environment').style.backgroundColor = "green";
			  document.getElementById('environment').style.border = "2px solid #5B86BE";
			  document.getElementById("environment").innerHTML= 'Low';
			/*var data = component.get("v.data");
		      data.orm_environment__c = 'Low'
		      component.set("v.data", data);*/
		 }
	   }
    },
    getSliderBusinessDefault : function(component, event, helper) {
    	 var sliderCost = component.get("v.assessmentRiskData").orm_cost__c;
         var sliderSchedule = component.get("v.assessmentRiskData").orm_ScheduleRisk__c;
         var sliderProduction = component.get("v.assessmentRiskData").orm_production_Loss_Risk__c;
         var reputation =component.get("v.assessmentRiskData").orm_reputation__c;
         if(sliderCost == null){
        	
         }
         else{
        	 if(sliderCost >= component.get("v.businessImpHighData.orm_costProjectBudgetMin__c") && sliderCost <= component.get("v.businessImpHighData.orm_costProjectBudgetMax__c")){
			    document.getElementById("cost").style.backgroundColor = "orange";
			    document.getElementById('cost').style.border = "2px solid #5B86BE";
			    document.getElementById("cost").innerHTML= 'High';
        	 }
        	 if (sliderCost >= component.get("v.businessImpMediumData.orm_costProjectBudgetMin__c") && sliderCost <= component.get("v.businessImpMediumData.orm_costProjectBudgetMax__c")){
			    document.getElementById("cost").style.backgroundColor = "yellow";
			    document.getElementById('cost').style.border = "2px solid #5B86BE";
			    document.getElementById("cost").innerHTML= 'Medium';
        	 }
        	 if (sliderCost >= component.get("v.businessImpLowData.orm_costProjectBudgetMin__c") && sliderCost<= component.get("v.businessImpLowData.orm_costProjectBudgetMax__c")){
			    document.getElementById("cost").style.backgroundColor = "green";
			    document.getElementById('cost').style.border = "2px solid #5B86BE";
			    document.getElementById("cost").innerHTML='Low' ;
	         } 
        	 if (sliderCost >= component.get("v.businessImpVeryHighData.orm_costProjectBudgetMin__c") && sliderCost<= component.get("v.businessImpVeryHighData.orm_costProjectBudgetMax__c")){
			    document.getElementById("cost").style.backgroundColor = "red";
			    document.getElementById('cost').style.border = "2px solid #5B86BE";
			    document.getElementById("cost").innerHTML='Very High' ;
        	 }
            }
         
         if(sliderSchedule == null){
        	
         }
         else{
		    if(sliderSchedule >= component.get("v.businessImpHighData.orm_scheduleProjectBaselineMin__c") && sliderSchedule <= component.get("v.businessImpHighData.orm_scheduleProjectBaselineMax__c")){
			    document.getElementById("schedule").style.backgroundColor = "orange";
			    document.getElementById('schedule').style.border = "2px solid #5B86BE";
			    document.getElementById("schedule").innerHTML= 'High';
		    }
		    if (sliderSchedule >= component.get("v.businessImpMediumData.orm_scheduleProjectBaselineMin__c") && sliderSchedule <= component.get("v.businessImpMediumData.orm_scheduleProjectBaselineMax__c")){
			    document.getElementById("schedule").style.backgroundColor = "yellow";
			    document.getElementById('schedule').style.border = "2px solid #5B86BE";
			    document.getElementById("schedule").innerHTML= 'Medium';
		    } if (sliderSchedule >= component.get("v.businessImpLowData.orm_scheduleProjectBaselineMin__c") && sliderSchedule<= component.get("v.businessImpLowData.orm_scheduleProjectBaselineMax__c")){
			    document.getElementById("schedule").style.backgroundColor = "green";
			    document.getElementById('schedule').style.border = "2px solid #5B86BE";
			    document.getElementById("schedule").innerHTML='Low' ;
		    } 
		    if (sliderSchedule >= component.get("v.businessImpVeryHighData.orm_scheduleProjectBaselineMin__c") && sliderSchedule<= component.get("v.businessImpVeryHighData.orm_scheduleProjectBaselineMax__c")){
			    document.getElementById("schedule").style.backgroundColor = "red";
			    document.getElementById('schedule').style.border = "2px solid #5B86BE";
			    document.getElementById("schedule").innerHTML='Very High' ;
		    } 
         }
         if(sliderProduction == null){
        	 
         }
         else{
        	if(sliderProduction >= component.get("v.businessImpLowData.orm_productionLossMin__c") && sliderProduction <= component.get("v.businessImpLowData.orm_productionLossMax__c")){
			    document.getElementById("production").style.backgroundColor = "green";
			    document.getElementById('production').style.border = "2px solid #5B86BE";
			    document.getElementById("production").innerHTML= 'Low';
		    }
		    else if (sliderProduction > component.get("v.businessImpMediumData.orm_productionLossMin__c") && sliderProduction <= component.get("v.businessImpMediumData.orm_productionLossMax__c")){
			    document.getElementById("production").style.backgroundColor = "yellow";
			    document.getElementById('production').style.border = "2px solid #5B86BE";
			    document.getElementById("production").innerHTML= 'Medium';
		    } else if (sliderProduction > component.get("v.businessImpHighData.orm_productionLossMin__c") && sliderProduction<= component.get("v.businessImpHighData.orm_productionLossMax__c")){
			    document.getElementById("production").style.backgroundColor = "orange";
			    document.getElementById('production').style.border = "2px solid #5B86BE";
			    document.getElementById("production").innerHTML= 'High';
		    }else{
			    document.getElementById("production").style.backgroundColor = "red";
			    document.getElementById('production').style.border = "2px solid #5B86BE";
			    document.getElementById("production").innerHTML= 'Very High';
		    } 
         }
         if(reputation== null){
        	 
         }
         else{
        	 var reputation1 = component.find("reputation1").get("v.value");
	         var reputation2 = component.find("reputation2").get("v.value");
	         var reputation3 = component.find("reputation3").get("v.value");
	         var reputation4 = component.find("reputation4").get("v.value");
         
	     if(component.get('v.assessmentRiskData').orm_reputation__c ==  reputation1){	 
			 document.getElementById('reputation').style.backgroundColor = "red";
			 document.getElementById('reputation').style.border = "2px solid #5B86BE";
			 document.getElementById("reputation").innerHTML= 'Very High';
		   /*var data = component.get("v.data");
	         data.orm_reputation__c = 'VeryHigh'
	         component.set("v.data", data);*/
		 } 
		 if(component.get('v.assessmentRiskData').orm_reputation__c ==reputation2){
			 document.getElementById('reputation').style.backgroundColor = "orange";
			 document.getElementById('reputation').style.border = "2px solid #5B86BE";
			 document.getElementById("reputation").innerHTML= 'High';
		    /*var data = component.get("v.data");
	         data.orm_reputation__c = 'High'
	         component.set("v.data", data);*/
		 }
		 if(component.get('v.assessmentRiskData').orm_reputation__c == reputation3){
			 document.getElementById('reputation').style.backgroundColor = "yellow";
			 document.getElementById('reputation').style.border = "2px solid #5B86BE";
			 document.getElementById("reputation").innerHTML= 'Medium';
			/*var data = component.get("v.data");
	         data.orm_reputation__c = 'Medium'
	         component.set("v.data", data);*/
		 }
		 if(component.get('v.assessmentRiskData').orm_reputation__c == reputation4){
			  document.getElementById('reputation').style.backgroundColor = "green";
			  document.getElementById('reputation').style.border = "2px solid #5B86BE";
			  document.getElementById("reputation").innerHTML= 'Low';
			/*var data = component.get("v.data");
	          data.orm_reputation__c = 'Low'
	          component.set("v.data", data);*/
		
		 }
       }
         
    }

})