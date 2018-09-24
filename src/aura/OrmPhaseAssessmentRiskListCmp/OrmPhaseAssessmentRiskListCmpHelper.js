({
	refresh : function(component, event) {	
		var idAssessmentRisk = component.get("v.idAssessmentRisk");
		alert(idAssessmentRisk);
        var action = component.get("c.findAllPhaseByAssessmentRisk");
        action.setParam('idAssRisk', idAssessmentRisk);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            	component.set("v.phases", response.getReturnValue());
            	component.set("v.phasesTemp", response.getReturnValue());
            	alert(JSON.stringify(response.getReturnValue()));
            	
            }
        });
        $A.enqueueAction(action);
	}
})