({
    doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
    showAssessmentRisk : function(component, event, helper) {
    var assessmentRiskId = event.target.id;
     var action = component.get('c.getAssessmentByIdAssRisk');
     action.setParams({
            "idAssRisk": assessmentRiskId
        });
     action.setCallback(this, function(response) 
     {
      if(response.getState() == 'SUCCESS')
      {
    	  alert(JSON.stringify(response.getReturnValue()));
      }
     });
     $A.enqueueAction(action);
	},

})