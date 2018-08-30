({
		refreshList:function(component, event){
		    // call the apex class method and fetch assumption list  
         var action = component.get("c.findAllAssumptionByAssessmentRisk");
       var assmntDataId=component.get('v.assessmentData').Id;
        action.setParam('asssessment',assmntDataId);
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
               // set assumptionList list with return value from server.
                  component.set("v.assumptionList", storeResponse);
                   component.set("v.storeAssumptionList", storeResponse);
                  
              }
        });
        $A.enqueueAction(action);
		}
})