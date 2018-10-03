({
	getAssessmentRiskId : function(component, event, helper) {
		component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		helper.refresh(component, component.get("v.idAssessmentRisk"));
	},
	refreshList : function(component, event, helper) {
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
     component.set("v.showSaveCancelBtn",false); 
    },
	save: function(component, event, helper) {
		if (helper.requiredValidation(component, event)){
              // call the saveAccount apex method for update inline edit fields update 
               var action = component.get("c.updateImpacts");
               action.setParams({
            	   'impacts': component.get("v.PaginationList")
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
        }, 
		
	
	/*
     * CreatedBy @David Diop
     *
     */
    filter: function(component, event, helper) {
       // var dataRisk = component.get('v.impactsTemp');
        var dataRisk = component.get('v.initialData');
        var term = component.get('v.filter');
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.refresh(component, component.get("v.idAssessmentRisk"));
        } else {
            term = "^" + term;
        try {
            regex = new RegExp(term, "i");
        
            dataRisk = dataRisk.filter(row => regex.test(row.Name) || regex.test(row.Description));
            	
        } catch (e) {
            alert(e);
        }
        //component.set("v.impacts",dataRisk);
           component.set("v.filterPagination", dataRisk);
		   component.set("v.items", component.get("v.filterPagination"));
		   helper.paginationFilterBis(component, event);
        }
    },
     selectAll : function (component, event, helper) {
    	//get the header checkbox value  
    	var selectedHeaderCheck = event.getSource().get("v.value");
    	
    	var evt = $A.get('e.c:OrmEvtSelectAllImpact');
    	evt.setParams({"selectAllCheckbox": selectedHeaderCheck});
    	evt.fire();
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
		}


	},
     cancelDeleteCause : function (component, event, helper) {
    	component.set('v.openModalConfirmDeletion', false);
    },
    /**
	 * 
	 * @author Dvaid diop
	 * @version 1.0
	 * @description method for remove Activity Proofselected
	 * @history 2018-09-05 : David diop- Implementation
	 */
    confirmDeleteCause : function (component, event, helper) {
    	var evt = $A.get('e.c:OrmEvtDeleteImpact');
    	evt.setParams({'idAssessmentRisk': component.get('v.idAssessmentRisk')});
    	evt.fire();
    	component.set('v.openModalConfirmDeletion', false);
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