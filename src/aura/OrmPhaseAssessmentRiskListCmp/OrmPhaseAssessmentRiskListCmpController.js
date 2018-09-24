({
	getAssessmentRiskId : function(component, event, helper) {
		component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		alert(component.get("v.idAssessmentRisk"));
		helper.refresh(component, event);
	},
	openPopupNewPhase : function(component, event, helper) {
		var evt = $A.get('e.c:OrmEventNewPhaseAssessmentRiskClicked');
	    evt.fire();
	},
	refreshList : function(component, event, helper) {
		helper.refresh(component, event);
	},
})