({
	refreshRiskAnalysis : function(component, event, helper) {
		var riskAssessmentId = event.getParam('riskAssessmentId');
		component.set("v.assessmentRiskId" , event.getParam('riskAssessmentId'));
	},
	
	/*
     * CreatedBy @David Diop
     *
     */
    doInit: function(component, event, helper) {
        var idAsssessmentRisk = component.get("v.assessmentRiskId");
        var actionOrgs = component.get("c.findAssessmentRisk");
        actionOrgs.setParams({
            "item": idAsssessmentRisk
           
        });
       // component.set("v.categorieRisk", item);
        actionOrgs.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') { 
               
                component.set('v.assessmentRiskData', response.getReturnValue());
                var risk=component.get('v.allRisk');
                
            } else {

                alert("l'Element n'a pas été retrouvé");
            }
        });
        
         var actionFrequency = component.get("c.getSelectOptions");
        actionFrequency.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_frequency__c'});
        actionFrequency.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.frequency', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        
        $A.enqueueAction(actionOrgs);
        $A.enqueueAction(actionFrequency);
        
      }
})