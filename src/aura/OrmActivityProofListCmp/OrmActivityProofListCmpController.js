({
	doInit: function(component, event, helper) {
		component.set("v.idActivity", event.getParam('idActivity'));
		var idActivity = component.get('v.idActivity');
		console.log(idActivity);
		helper.getAllActivityProofByActivity(component, event);
	},
	
	openNewActivityProof : function(component, event, helper) {
		var idActivity = component.get('v.idActivity');
		var evt = $A.get("e.c:OrmNewActivityProofClickedEvt");
	        evt.setParams({
	            "idActivity": idActivity
	        });
        evt.fire();
	},
	/**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method cancel save MeasureProgression
	 * @history 
	 * 2018-08-31 : David diop - Implementation
     */
	cancel : function(component,event,helper) {
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
       component.set("v.showSaveCancelBtn",false);
    },
    save: function(component, event, helper) {
		if (helper.requiredValidation(component, event)){
              // call the saveAccount apex method for update inline edit fields update 
               var action = component.get("c.updateActiviteProof");
               action.setParams({
            	   'activityProof': component.get("v.activityProof")
               });
                  
	           action.setCallback(this, function(response) {
	               var state = response.getState();
	               if (state === "SUCCESS") {
	                    var measuresProgressions = response.getReturnValue();
	                    // set cause list with return value from server.
	                    component.set("v.activityProof", measuresProgressions);
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
        },
})