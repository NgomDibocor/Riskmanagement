({
	ListAssessment : function(component, event, helper) {
	    var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	    evtSpinner.fire();
		var evt = $A.get("e.c:OrmDisplayListAssessmentEvt");
		evt.fire();
	},
   ListAssessmentRisk : function(component, event, helper) {
	var evt = $A.get("e.c:OrmDisplayAssessmentRiskEvt");
		evt.fire();
	},
    test3 : function(component, event, helper) {
		var evt = $A.get("e.c:OrmShowMyMeasureListEvt");
		evt.fire();
	}
})