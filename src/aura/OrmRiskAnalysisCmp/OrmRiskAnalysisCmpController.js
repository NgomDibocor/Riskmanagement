({
	refreshRiskAnalysis : function(component, event, helper) {
		component.set("v.assessmentRiskId" , event.getParam('riskAssessmentId'));
		component.set("v.showDetailsAssessmentRisk", true);
	}
})