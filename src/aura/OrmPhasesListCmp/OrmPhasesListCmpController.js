({
	doInit : function(component, event, helper) {
		helper.refresh(component, event);		
	},
	
	refreshList : function(component, event, helper) {
		helper.refresh(component, event);
	},
	
	openOrmPhaseNewCmp : function(component, event, helper) {
		
		var idAssessment = component.get('v.idAssessment');
		if (idAssessment == null) {
			component.set('v.openModalError', true);
		} else {
			var evt = $A.get('e.c:OrmEventNewPhaseClicked');
			evt.fire();
		}
	},
	
	closeOpenModalError : function(component, event, helper) {
		component.set('v.openModalError', false);
	},
	
	cancel : function(component,event,helper) {
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        $A.get('e.force:refreshView').fire();
    },
	
	save: function(component, event, helper) {
		// Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)){
        	// call the saveAccount apex method for update inline edit fields update 
               var action = component.get("c.updatePhases");
               action.setParams({
            	   'phases': component.get("v.phases")
               });
                  
	           action.setCallback(this, function(response) {
	               var state = response.getState();
	               if (state === "SUCCESS") {
	                    var phases = response.getReturnValue();
	                    // set cause list with return value from server.
	                    component.set("v.phases", phases);
	                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
	                    component.set("v.showSaveCancelBtn", false);
	                    var toast = $A.get('e.force:showToast');
			            toast.setParams({
			            	'message' : 'Updated ...',
			                'type' : 'success',
			                'mode' : 'dismissible'
			            });	
			            toast.fire();
			       }
	           });
	           $A.enqueueAction(action);
        }
              
	},
	
	filter : function (component, event, helper){
    	
    	var phases = component.get('v.phase');
    	var data = phases;
    	var key = component.get('v.key');
    	var regex;
    	key = "^" + key;
    	
    	if ($A.util.isEmpty(key)) {
	        component.set("v.phases", phases);	        
         } else {
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		data = data.filter(row => regex.test(row.orm_phase__c));
		        } catch (e) {
		    	   
		        }
		   component.set("v.phases", data);
         }        	
    }	
})