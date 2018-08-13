({
	doInit : function(component, event, helper) {
		//console.log('assessmentRiskId '+ component.get("v.assessmentRiskId"));
		var assessmentRiskId = event.getParam('idAssessmentRisk');
		console.log('assessmentRiskId '+ assessmentRiskId);
		helper.refresh(component, "a001H00000kcsVDQAY");
	},
	
	getAssessmentRiskId : function(component, event, helper) {
		var assessmentRiskId = event.getParam('idAssessmentRisk');
		console.log('assessmentRiskId '+ assessmentRiskId);
		component.set("v.assessmentRiskId", assessmentRiskId);
		helper.refresh(component, idAssessmentRisk);
	},
	
	refreshList : function(component, event, helper) {
		var idAssessmentRisk = event.getParam('idAssessmentRisk');
		helper.refresh(component, idAssessmentRisk);
	},
	
	/* @cretedBy: laye
	   @createdDate: 28/07/2018
     */
    openCauseNewCmp : function(component, event, helper){
    	/* after created the assessment we must get the assessment id
			var assessment = component.get('v.assessmentData');
         */
        var assessmentRiskId = "";
        var evt = $A.get("e.c:OrmNewCauseClickedEvt");
        evt.setParams({
        	"idAssessmentRisk" : assessmentRiskId
		});
		evt.fire();
    },
    
    sendDescriptionFieldCause : function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": "Cause",
            "descriptionField": "Description"
        });
        evt.fire();
    },
		
	save: function(component, event, helper) {
		// Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)){
              // call the saveAccount apex method for update inline edit fields update 
               var action = component.get("c.updateCauses");
               action.setParams({
            	   'causes': component.get("v.causes")
               });
                  
	           action.setCallback(this, function(response) {
	               var state = response.getState();
	               if (state === "SUCCESS") {
	                    var causes = response.getReturnValue();
	                    // set cause list with return value from server.
	                    component.set("v.causes", causes);
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
    
    cancel : function(component,event,helper) {
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        $A.get('e.force:refreshView').fire(); 
    },
    
    filter : function (component, event, helper){
    	
    	var causes = component.get('v.causes');
    	var data = causes;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refresh(component, component.get("v.assessmentRiskId"));    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		data = data.filter(row => regex.test(row.Name)|| regex.test(row.Description));
		        } catch (e) {
		    	   
		        }
		   component.set("v.causes", data);
         }        	
    },
    
    openModalDeleteCause : function (component, event, helper) {
    	component.set('v.openModalConfirmDeletion', true);
    },
    
    cancelDeleteCause : function (component, event, helper) {
    	component.set('v.openModalConfirmDeletion', false);
    },
    
    confirmDeleteCause : function (component, event, helper) {
    	var evt = $A.get('e.c:OrmEvtDeleteCauses');
    	evt.fire();
    	component.set('v.openModalConfirmDeletion', false);
    },
    
    selectAll : function (component, event, helper) {
    	//get the header checkbox value  
    	var selectedHeaderCheck = event.getSource().get("v.value");
    	
    	var evt = $A.get('e.c:OrmEvtSelectAllCauses');
    	evt.setParams({"selectAllCheckbox": selectedHeaderCheck});
    	evt.fire();
    }
})