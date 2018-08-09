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
	
	closeOpenModalErrorIfFieldEmpty : function(component, event, helper) {
		component.set('v.openModalErrorIfFieldEmpty', false);
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
	
	createItem : function(component, event, helper) {
	
		var idAssessment = component.get('v.idAssessment');
		
		if(idAssessment == null){
			
			var toast = $A.get('e.force:showToast');
			toast.setParams({
				'message' : 'Create the Assessment Before',
				'type' : 'warning',
				'mode' : 'dismissible'
			});	
			toast.fire();
			
		} else {
		
			var description = component.find('description').get('v.value');
        
			/* we test the validity of data */
			var isItemsValid = true;
			if($A.util.isEmpty(description)) {
				isItemsValid = false;           
			}
        
			if(isItemsValid){
	        	var newPhase = component.get('v.newPhase');
	        	newPhase.Name = "XXXX"; // not used but it's required for Macro
	        	newPhase.Description = description;
	        	newPhase.orm_assessment__c = component.get('v.idAssessment');        	
	        	
	        	var action = component.get('c.add');
	            action.setParams({
	                "item": newPhase
	            });
	            
	            action.setCallback(this, function(response) {
	            	if(response.getState() == 'SUCCESS'){
	            		newPhase = response.getReturnValue();
	            		helper.refresh(component, event);
	            		var toast = $A.get('e.force:showToast');
	            		toast.setParams({
				           'message' : 'New Phase Has Been Successfully Added',
				           'type' : 'success',
				           'mode' : 'dismissible'
			            });	
			            toast.fire();
			            
			            /*var evt = $A.get("e.c:OrmEventNewPhaseCreated");
	                    evt.fire();
			            
	            		helper.closeModal(component, event); */
	                    component.set('v.newPhase', { 'sobjectType' : 'Macro',
												      'orm_phase__c': '',
												      'orm_assessment__c': '',
												      'Description': ''
	                    			  });
	            	} else {
	            		var toast = $A.get('e.force:showToast');
	            		toast.setParams({
				           'message' : 'ERROR',
				           'type' : 'error',
				           'mode' : 'dismissible'
			            });	
			            toast.fire();
	            	}
               });
               $A.enqueueAction(action);  
                     	
			} else {
	        	//component.set("v.openModalErrorIfFieldEmpty", true);
	        	var toast = $A.get('e.force:showToast');
				toast.setParams({
					'message' : 'The Field Cause Should be Empty',
				    'type' : 'warning',
				    'mode' : 'dismissible'
				});	
				toast.fire();
            }
		}	 	
	},
	
	sendDescriptionFieldCause : function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": "Phase",
            "descriptionField": "Description"
        });
        evt.fire();
    },
})