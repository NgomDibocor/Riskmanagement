({
	fetchPicklist : function(component, event, idAsssessmentRisk) {
		console.log( component.get("v.assessmentData").Id);
		var actionFrequency = component.get("c.getSelectOptions");
        actionFrequency.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_frequency__c'});
        actionFrequency.setCallback(this, function(response){
        var state = response.getState();
        if(state === 'SUCCESS'){
                component.set('v.frequency', response.getReturnValue());
                //manageAbility
                var actionmanageAbility = component.get("c.getSelectOptions");
		        actionmanageAbility.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_manageability__c'});
		        actionmanageAbility.setCallback(this, function(response){
		            var state = response.getState();
		            if(state === 'SUCCESS'){
		                component.set('v.manageAbility', response.getReturnValue());
		                //productionLoss
		                	var actionproductionLoss = component.get("c.getSelectOptions");
					        actionproductionLoss.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_productionLoss__c'});
					        actionproductionLoss.setCallback(this, function(response){
					            var state = response.getState();
					            if(state === 'SUCCESS'){
					                component.set('v.productionLoss', response.getReturnValue());
					                
					                	 //schedule
					                	 var actionschedule = component.get("c.getSelectOptions");
									        actionschedule.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_schedule__c'});
									        actionschedule.setCallback(this, function(response){
									            var state = response.getState();
									            if(state === 'SUCCESS'){
									                component.set('v.schedule', response.getReturnValue());
									                	
									                	//status
									                	 var actionstatus = component.get("c.getSelectOptions");
													        actionstatus.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_status__c'});
													        actionstatus.setCallback(this, function(response){
													            var state = response.getState();
													            if(state === 'SUCCESS'){
													                component.set('v.status', response.getReturnValue());
													                
													                	//vulnerability
													                	 var actionvulnerability = component.get("c.getSelectOptions");
																	        actionvulnerability.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_vulnerability__c'});
																	        actionvulnerability.setCallback(this, function(response){
																	            var state = response.getState();
																	            if(state === 'SUCCESS'){
																	                component.set('v.vulnerability', response.getReturnValue());
																	                	
																	                	//
																	                	var actionOrgs = component.get("c.findAssessmentRisk");
																					        actionOrgs.setParams({
																					            "item": idAsssessmentRisk
																					           
																					        });
																					       // component.set("v.categorieRisk", item);
																					        actionOrgs.setCallback(this, function(response) {
																					            var state = response.getState();
																					            if (state === 'SUCCESS') { 
																					                component.set('v.assessmentRiskData', response.getReturnValue());
																					                component.find("manageAbility").set("v.value", component.get('v.assessmentRiskData').orm_manageability__c);
																					                component.set("v.displaySaveCancelBtn",false);
																					                
																					                var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
	                                                                                                evtSpinner.fire(); 
																					            } else {
																					
																					                alert($A.get("$Label.c.orm_not_found"));
																					            }
																					        });
																					        $A.enqueueAction(actionOrgs);
																	                
																	            } else {
																	                alert($A.get("$Label.c.orm_not_found"));
																	            }
																	        });
																	        $A.enqueueAction(actionvulnerability);
													                	
													            } else {
													                alert($A.get("$Label.c.orm_not_found"));
													            }
													        });
													        $A.enqueueAction(actionstatus);
									                
									            } else {
									                alert($A.get("$Label.c.orm_not_found"));
									            }
									        });
									        $A.enqueueAction(actionschedule);
					            } else {
					                alert($A.get("$Label.c.orm_not_found"));
					            }
					        });
					         $A.enqueueAction(actionproductionLoss);
		                	
		            } else {
		                alert($A.get("$Label.c.orm_not_found"));
		            }
		           });
		           $A.enqueueAction(actionmanageAbility);
                
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        $A.enqueueAction(actionFrequency);
      
        
        
	},
	
	getProbality : function(component, event) {
	   var action = component.get('c.findAllProbabilitiesByAssessment');
	      action.setParams({ "assessment":component.get("v.assessmentData").Id});
	      action.setCallback(this, function(response) {
		        if(response.getState() == 'SUCCESS'){
		        
		        	component.set("v.probabilities", response.getReturnValue());
		        	console.log(JSON.stringify(response.getReturnValue()));
		        	if(component.get("v.probabilities").length > 0){
	        	   
	                   for (var i = 0; i < component.get("v.probabilities").length; i++) {
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Probable' ){
		                         component.set("v.probableData", component.get("v.probabilities")[i]);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Possible' ){
		                         component.set("v.possibleData", component.get("v.probabilities")[i]);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Unlikely' ){
		                         component.set("v.unlikelyData", component.get("v.probabilities")[i]);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Rare' ){
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
	getHsseImpacts : function(component, event, helper) {
    	  var action = component.get('c.findHsseImpactsByAssessment');
	      action.setParams({ "assessment":component.get("v.assessmentData").Id});
	      action.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	            
	        	component.set("v.hsseImpacts", response.getReturnValue());
	        	if(component.get("v.hsseImpacts").length > 0){
	        	   
	                   for (var i = 0; i < component.get("v.hsseImpacts").length; i++) {
		                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'VeryHigh' ){
		                         component.set("v.hsseVeryHighData", component.get("v.hsseImpacts")[i]);
		                      }
		                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'High' ){
		                         component.set("v.hsseHighData", component.get("v.hsseImpacts")[i]);
		                      }
		                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'Medium' ){
		                         component.set("v.hsseMediumData", component.get("v.hsseImpacts")[i]);
		                      }
		                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'Low' ){
		                         component.set("v.hsseLowData", component.get("v.hsseImpacts")[i]);
		                      }
	                    }
	                    
	        	  }
	        	
	        } else {
	        	alert("ERROR getHsseImpacts")	
	        }
	     });
	     $A.enqueueAction(action);
    }
    
})