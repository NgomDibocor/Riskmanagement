({
	getIdAssessmentRisk : function(component, event, helper) {
		component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		//console.log('idAssessmentRisk ', event.getParam('idAssessmentRisk'));
		helper.getAllMeasuresByAssessmentRisk(component, event);
	},
	
	refreshList : function(component, event, helper) {
		helper.getAllMeasuresByAssessmentRisk(component, event);
	},
	
	save: function(component, event, helper) {
		// Check required fields(Description) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)){
               var action = component.get("c.updateMeasures");
               action.setParams({
            	   'measures': component.get("v.measures")
               });
                  
	           action.setCallback(this, function(response) {
	               var state = response.getState();
	               if (state === "SUCCESS") {
	                    var measures = response.getReturnValue();
	                    // set cause list with return value from server.
	                    component.set("v.measures", measures);
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
	
	cancel : function(component,event,helper) {
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
       $A.get('e.force:refreshView').fire(); 
    },
	
	filterMeasure : function (component, event, helper){
    	
    	var measures = component.get('v.measuresTemp');
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.getAllMeasuresByAssessmentRisk(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		measures = measures.filter(row => regex.test(row.Name)|| regex.test(row.Description));
		        } catch (e) {
		    	   
		        }
		   component.set("v.measures", measures);
         }        	
    },
    
    openNewMeasureCmp : function (component, event, helper){
        var evt = $A.get("e.c:OrmNewMeasureClickedEvt");
		evt.fire();
    },
    
    sendDescriptionFieldMeasure : function (component, event, helper){
    
    },
    
    openModalDeleteMeasure : function (component, event, helper){
    	component.set('v.openModalConfirmDeletion', true);
    },
    
    cancelDeleteMeasure : function (component, event, helper){
    	component.set('v.openModalConfirmDeletion', false);
    },
    
    confirmDeleteMeasure : function (component, event, helper){
    	var evt = $A.get('e.c:OrmDeleteMeasuresEvt');
    	evt.setParams({'idAssessmentRisk': component.get('v.idAssessmentRisk')});
    	evt.fire();
    	component.set('v.openModalConfirmDeletion', false);
    },
    
    showButtonDelete  : function (component, event, helper) {
    	var showButtonDelete = event.getParam('showButtonDelete');
    	console.log('capture event '+ showButtonDelete);
    	if(showButtonDelete){
    		component.set('v.showButtonDelete', true);
    	} else {
			component.set('v.showButtonDelete', false);
		}
    }
    
})