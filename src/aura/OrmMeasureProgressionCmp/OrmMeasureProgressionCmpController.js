({
	/**
	 * @author David diop
	 * @version 1.0
	 * @description method doInit
	 * @history 
	 * 2018-08-31 : David diop - Implementation
	 */
    measureProgression: function(component, event, helper) {
       // helper.fetchPicklist(component, event, event.getParam('MeasureId'));
        component.set("v.idMeasure", event.getParam('MeasureId'));
		helper.getAllMeasuresProgressionByMeasure(component, event);
    },
    /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description methodopen Modal new MeasurePogression
	 * @history 
	 * 2018-08-31 : David diop - Implementation
     */
    openMeasureProgressionNew : function(component, event, helper){
        var IdMeasure = component.get("v.idMeasure");
        var evt = $A.get("e.c:OrmNewMeasureProgressionClickedEvt");
        evt.setParams({
            "idMeasure": IdMeasure
        });
		evt.fire();
    },
    /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method refreshList after add new measureProgression
	 * @history 
	 * 2018-08-31 : David diop - Implementation
     */
    
    refreshList : function(component, event, helper) {
		helper.getAllMeasuresProgressionByMeasure(component,event);
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
    
    /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method updateMeasureProgression
	 * @history 
	 * 2018-08-31 : David diop - Implementation
     */
    
    save: function(component, event, helper) {
		if (helper.requiredValidation(component, event)){
              // call the saveAccount apex method for update inline edit fields update 
               var action = component.get("c.updateMeasureProgressions");
               action.setParams({
            	   'measureProgression': component.get("v.measureProgression")
               });
                  
	           action.setCallback(this, function(response) {
	               var state = response.getState();
	               if (state === "SUCCESS") {
	                    var measuresProgressions = response.getReturnValue();
	                    // set cause list with return value from server.
	                    component.set("v.measureProgression", measuresProgressions);
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
     /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method Filter
	 * @history 
	 * 2018-08-31 : David diop - Implementation
     */
    filter: function(component, event, helper) {
        var dataMeasureProgress = component.get('v.measureProgressionTemp');
        var term = component.get('v.filter');
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.getAllMeasuresProgressionByMeasure(component, event);
        } else {
            term = "^" + term;
        try {
            regex = new RegExp(term, "i");
        
            dataMeasureProgress = dataMeasureProgress.filter(row => regex.test(row.orm_dateProgression__c) || regex.test(row.Description));
            	
        } catch (e) {
            alert(e);
        }
        component.set("v.measureProgression",dataMeasureProgress);
        }
    },
    /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method Filter
	 * @history 
	 * 2018-08-31 : David diop - Implementation
     */
    
    selectAll : function (component, event, helper) {
    	//get the header checkbox value  
    	var selectedHeaderCheck = event.getSource().get("v.value");
	    	var evt = $A.get('e.c:OrmEvtSelectAllMeasureProgress');
	    	  evt.setParams({"selectAllCheckbox": selectedHeaderCheck});
	    	evt.fire();
    },
    
    /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method Filter
	 * @history 
	 * 2018-09-03 : David diop - openModalDeleteMeasureProgress
     */
     openModalDeleteMeasureProgress : function (component, event, helper) {
     
    	component.set('v.openModalConfirmDeletion', true);
    },
    
    /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method cancelDeleteMeasureProgress
	 * @history 
	 * 22018-09-03 : David diop - Implementation
     */
     cancelDeleteMeasureProgress : function (component, event, helper) {
    	component.set('v.openModalConfirmDeletion', false);
    },
    
    /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method confirmDeleteMeasureProgress
	 * @history 
	 * 2018-09-03 : David diop - Implementation
     */
    confirmDeleteMeasureProgress: function (component, event, helper) {
    	var evt = $A.get('e.c:OrmEvtDeleteMeasureProgress');
    	evt.fire();
    	component.set('v.openModalConfirmDeletion', false);
    },
    
    /**
     * CreatedBy @David Diop
     * @version 1.0
	 * @description method showButtonDelete
	 * @history 
	 * 2018-09-03 : David diop - Implementation
     */
    showButtonDelete  : function (component, event, helper) {
    	var showButtonDelete = event.getParam('showButtonDelete');
    	console.log('capture event '+ showButtonDelete);
    	if(showButtonDelete){
    		component.set('v.showButtonDelete', showButtonDelete);
    	} else {
			component.set('v.showButtonDelete', showButtonDelete);
		}
    },
    
    /**
	 * 
	 * @authorDavid diop
	 * @version 1.0
	 * @description method for show modal confirm delete MeasureProgression
	 * @history 2018-09-05 : David diop - Implementation
	 */ 
	removeMeasureProgression:function(component,event,helper){
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
	/**
	 * 
	 * @author Dvaid diop
	 * @version 1.0
	 * @description method for remove Activity Proofselected
	 * @history 2018-09-05 : David diop- Implementation
	 */ 
    removeMeasureProgressionSelected: function(component,event,helper){
       component.set("v.openModalConfirmDeletion",false);
        //fire event to childActivityList for delete activity selected
		var evt = $A.get("e.c:OrmEvtDeleteMeasureProgress");
		evt.fire();
    },
})