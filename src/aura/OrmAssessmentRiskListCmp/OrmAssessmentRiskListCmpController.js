({
    doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
    showAssessmentRisk : function(component, event, helper) {
    var assessmentRiskId = event.target.id;
    alert(assessmentRiskId);
     var evt = $A.get("e.c:OrmActiveRiskAnalyeCmpEvt");
        evt.setParams({
            "idAssessmentRisk": assessmentRiskId
        });
        evt.fire();
   
   
	},

})