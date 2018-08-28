({
	getAssessmentRiskId : function(component, event, helper) {
		component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		alert(component.get("v.idAssessmentRisk"));
		helper.refresh(component, component.get("v.idAssessmentRisk"));
	},
	/* @cretedBy: David
	   @createdDate: 28/08/2018
     */
    openImpactNewCmp : function(component, event, helper){
        var assessmentRiskId = component.get("v.idAssessmentRisk");
        var evt = $A.get("e.c:OrmNewImpactClickedEvt");
        evt.setParams({
            "idAssessmentRisk": assessmentRiskId
        });
		evt.fire();
    },
    cancel : function(component,event,helper) {
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
       $A.get('e.force:refreshView').fire(); 
    },
	save: function(component, event, helper) {
		if (helper.requiredValidation(component, event)){
              // call the saveAccount apex method for update inline edit fields update 
               var action = component.get("c.updateImpacts");
               action.setParams({
            	   'impacts': component.get("v.impacts")
               });
                  
	           action.setCallback(this, function(response) {
	               var state = response.getState();
	               if (state === "SUCCESS") {
	                    var impacts = response.getReturnValue();
	                    // set cause list with return value from server.
	                    component.set("v.impacts", impacts);
	                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
	                    component.set("v.showSaveCancelBtn", false);
	                    var toast = $A.get('e.force:showToast');
			            toast.setParams({
			            	'message' : $A.get('$Label.c.orm_updated'),
			                'type' : 'success',
			                'mode' : 'dismissible'
			            });	
			            toast.fire();
			       }
	           });
	           $A.enqueueAction(action);
        } 
        } 
		
	},
})