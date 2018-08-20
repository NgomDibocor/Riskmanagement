({
doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
showAssessmentRisk : function(component, event, helper) 
    {
         var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	     evtSpinner.fire(); 
	},
})