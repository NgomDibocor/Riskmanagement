({
	initRecords : function(component, event, helper) {
		
		// call the apex class method and fetch activity list  
         var action = component.get("c.findAllCausesByAssessmentRisk");
         var assesmentRiskId='a001H00000kbj0vQAA';
         action.setParam('idAssRisk', assesmentRiskId);
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {                 
                  component.set("v.causes", response.getReturnValue());
              }
        });
        $A.enqueueAction(action);
	}
})