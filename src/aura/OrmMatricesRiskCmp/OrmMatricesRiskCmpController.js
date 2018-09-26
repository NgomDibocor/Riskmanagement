({
	doInit : function(component, event, helper) {
		console.log('******in matrice component******************');
		console.log(JSON.stringify(component.get("v.assessmentRiskData")));
		console.log('******Choice******************');
		console.log(component.get("v.choiceProbability"));
		console.log(component.get("v.choiceHsseImpact"));
	}
})