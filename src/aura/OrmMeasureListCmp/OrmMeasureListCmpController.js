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
            	   'measures': component.get("v.PaginationList")
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
		component.set("v.showSaveCancelBtn", false);
		helper.getAllMeasuresByAssessmentRisk(component, event);
    },
	
	filterMeasure : function (component, event, helper){
    	
    	//var measures = component.get('v.measuresTemp');
    	var measures = component.get('v.initialData');
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
		   //component.set("v.measures", measures);
		   component.set("v.filterPagination", measures);
		   component.set("v.items", component.get("v.filterPagination"));
		   helper.paginationFilterBis(component, event);
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
    },
    /**
	 * 
	 * @authorDavid diop
	 * @version 1.0
	 * @description method for show modal confirm delete MeasureProgression
	 * @history 2018-09-05 : David diop - Implementation
	 */ 
	removeMeasure:function(component,event,helper){
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
    
})