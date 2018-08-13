({
	refreshRiskAnalysis : function(component, event, helper) {
		var riskAssessmentId = event.getParam('riskAssessmentId');
		component.set("v.assessmentRiskId" , event.getParam('riskAssessmentId'))
		console.log('riskAssessmentId '+ riskAssessmentId);
	}
})