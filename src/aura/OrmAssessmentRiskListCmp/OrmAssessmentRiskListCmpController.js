({
	
    doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
    
    showAssessmentRisk : function(component, event, helper) {
       alert(JSON.stringify(component.get('v.assessmentRisks')));
 	},
    
})