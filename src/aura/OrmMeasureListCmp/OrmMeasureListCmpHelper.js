({
	getAllMeasuresByAssessmentRisk : function(component, event) {	
		
        var action = component.get("c.getAllMeasuresByAssessmentRisk");
        action.setParam('idAssessmentRisk', component.get("v.assessmentRiskId"));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {   
            	component.set("v.measures ", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})