({
	listAssessment : function(component, event, helper) {
	    var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	    evtSpinner.fire();
		var evt = $A.get("e.c:OrmDisplayListAssessmentEvt");
		evt.fire();
	},
    
    listAssessmentRisk : function(component, event, helper) {
    var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	evtSpinner.fire();
	var evt = $A.get("e.c:OrmDisplayAssessmentRiskEvt");
		evt.fire();
	},
    
    listMeasure : function(component, event, helper) {
        var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	    evtSpinner.fire();
		var evt = $A.get("e.c:OrmShowMyMeasureListEvt");
		evt.fire();
	}
})