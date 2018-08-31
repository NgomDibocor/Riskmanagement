({
	fetchPicklist : function(component, event, idAsssessmentRisk) {
		  var actionFrequency = component.get("c.getSelectOptions");
        actionFrequency.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_frequency__c'});
        actionFrequency.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS')
            {
                component.set('v.frequency', response.getReturnValue());
                //manageAbility
                var actionmanageAbility = component.get("c.getSelectOptions");
		        actionmanageAbility.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_manageAbility__c'});
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
																					                component.set("v.displaySaveCancelBtn",false);
																					                component.find("manageAbility").set("v.value", event.getSource().get("v.value"));
																					                component.find("productionLoss").set("v.value", event.getSource().get("v.value"));
																					                component.find("schedule").set("v.value", event.getSource().get("v.value"));
																					                component.find("status").set("v.value", event.getSource().get("v.value"));
																					                component.find("vulnerability").set("v.value", event.getSource().get("v.value"));
																					                component.find("frequency").set("v.value", event.getSource().get("v.value"));
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
	}
})