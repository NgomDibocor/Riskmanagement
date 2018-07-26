({
	ListAssessment : function(component, event, helper) {
		var evt = $A.get("e.c:OrmDisplayListAssessmentEvt");
		evt.fire();
	},
   ListAssessmentRisk : function(component, event, helper) {
	var evt = $A.get("e.c:OrmDisplayAssessmentRiskEvt");
		evt.fire();
	},
    test3 : function(component, event, helper) {
		alert('My Measures clicked')
	}
})