({
	
	getAssessmentRiskId : function(component, event, helper) {
		component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		helper.refresh(component, component.get("v.idAssessmentRisk"));
	},
	
	refreshList : function(component, event, helper) {
		helper.refresh(component, component.get("v.idAssessmentRisk"));
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
		evt.fire();
    },
    
    sendDescriptionFieldCause : function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get('$Label.c.orm_label_cause'),
            "descriptionField": $A.get('$Label.c.orm_describe_cause')
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
    
    filter : function (component, event, helper){
    	
    	//var causesTemp = component.get('v.causesTemp');
    	var causesTemp = component.get('v.initialData');
    	//var data = causes;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refresh(component, component.get("v.idAssessmentRisk"));    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		causesTemp = causesTemp.filter(cause => regex.test(cause.Description));
		        } catch (e) {
		    	   
		        }
		   //component.set("v.causes", causesTemp);
		    component.set("v.filterPagination", causesTemp);
		   component.set("v.items", component.get("v.filterPagination"));
		   helper.paginationFilter(component, event);
         }        	
    },
    /**
	 * 
	 * @authorDavid diop
	 * @version 1.0
	 * @description method for show modal confirm delete MeasureProgression
	 * @history 2018-09-05 : David diop - Implementation
	 */ 
	openModalDeleteCause:function(component,event,helper){
		// is checked delete assumption show popup message confirmation
		// get all checkboxes 
		//if not checked show toast warning
		var getSelectedNumber = component.get("v.selectedRowsCount");
		if(getSelectedNumber==0){
		var toast = $A.get('e.force:showToast');
					toast.setParams({
						'message' : $A.get("$Label.c.orm_warning_checked_checkbox"),
						'type' : 'warning',
						'mode' : 'dismissible'
					});      
					toast.fire(); 
		}else{
	component.set("v.openModalConfirmDeletion",true);
		}},
    cancelDeleteCause : function (component, event, helper) {
    	component.set('v.openModalConfirmDeletion', false);
    },
    
    confirmDeleteCause : function (component, event, helper) {
    	var evt = $A.get('e.c:OrmEvtDeleteCauses');
    	evt.setParams({'idAssessmentRisk': component.get('v.idAssessmentRisk')});
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