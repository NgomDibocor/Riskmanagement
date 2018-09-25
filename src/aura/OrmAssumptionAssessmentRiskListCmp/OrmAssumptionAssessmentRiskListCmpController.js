({
	getAssessmentRiskId:function(component, event, helper){
	component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		helper.refreshList(component, event);
	},
})