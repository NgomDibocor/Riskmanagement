({
	doInit : function(component, event, helper) {
		helper.refresh(component, event);		
	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method for get activity list by assessment
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */
	/*doInit: function(component, event, helper) {

		// call the apex class method and fetch activity list
		var action = component.get("c.findActivityByAssessment");
		action.setParam("assessment",component.get("v.assessmentData").Id);
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				var storeResponse = response.getReturnValue();
				// set ActivityList list with return value from server.
				component.set("v.ActivityList", storeResponse);
				component.set("v.storeListActivity", storeResponse);

			}
		});
		$A.enqueueAction(action);
		// set deafult count and select all checkbox value to false on load
		component.set("v.selectedCount", 0);
		component.find("box3").set("v.value", false);
	}, */ 
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method for fire and open new component activity
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */
	openActivityNewCmp : function(component, event, helper){
		var idAssessment = component.get("v.assessmentData").Id;
		if(idAssessment == null){
			// alert("check if you have created the assessment");
			var toast = $A.get('e.force:showToast');
			toast.setParams({
				'message' : $A.get("$Label.c.orm_toast_warning_assessment"),
				'type' : 'warning',
				'mode' : 'dismissible'
			});
			toast.fire();
		} else {
			var evt = $A.get("e.c:OrmOpenNewActivityCmpEvt");
			evt.setParams({
				"idAssessment" : idAssessment
			});
			evt.fire();
		}
	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description save activity
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */
	Save: function(component, event, helper) {
		// Check required fields(Name) first in helper method which is return
		// true/false
		if (helper.requiredValidation(component, event)){
			// call the saveActivity apex method for update inline edit fields
			// update
			var action = component.get("c.saveActivity");
			action.setParams({
				'lstActivity': component.get("v.ActivityList")
			});
			action.setCallback(this, function(response) {
				var state = response.getState();
				if (state === "SUCCESS") {
					var storeResponse = response.getReturnValue();
					// set ActivityList list with return value from server.
					component.set("v.ActivityList", storeResponse);
					// Hide the save and cancel buttons by setting the
					// 'showSaveCancelBtn' false
					component.set("v.showSaveCancelBtn",false);
					var toast = $A.get('e.force:showToast');
					toast.setParams({
						'message' :  $A.get("$Label.c.orm_success_updated"),
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
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description cancel action and refresh the view
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */  
	cancel : function(component,event,helper){
		// on cancel refresh the view
		$A.get('e.force:refreshView').fire(); 
	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method for show modal confirm delete activity
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */ 
	removeActivity:function(component,event,helper){
		// is checked delete activity show popup message confirmation
		// get all checkboxes
		// if not checked show toast warning
		var getSelectedNumber = component.get("v.selectedCount");
		if(getSelectedNumber==0){
			var toast = $A.get('e.force:showToast');
			toast.setParams({
				'message' : $A.get("$Label.c.orm_warning_checked_checkbox"),
				'type' : 'warning',
				'mode' : 'dismissible'
			});      
			toast.fire(); 
		}else{
			component.set("v.showConfirmRemoveActivity",true);
		}


	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method for close modal activity
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */ 
	closeModalRemove:function(component,event,helper){
		component.set("v.showConfirmRemoveActivity",false);
	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method for remove activity selected
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */ 
	removeActSelected: function(component,event,helper){
		component.set("v.showConfirmRemoveActivity",false);
		// fire event to childActivityList for delete activity selected
		var evt = $A.get("e.c:OrmRemoveRecordActivityEvnt");
		evt.fire();
	},

	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description search filter
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */
	filter : function (component, event, helper){
		var ListActivity = component.get('v.storeListActivity');
		var data = ListActivity;
		var key = component.get('v.key');
		var regex;    	
		if ($A.util.isEmpty(key)) {    	
			helper.refreshList(component, event);    		      
		} else {
			key = "^" + key;
			try {
				regex = new RegExp(key, "i");

				// filter checks each row, constructs new array where function
				// returns true
				data=ListActivity.filter(row => regex.test(row.Name) || 
						regex.test(row.orm_activityStatus__c) || 
						regex.test(row.orm_description__c) ||  
						regex.test(row.orm_startDate__c) || regex.test(row.orm_endDate__c));
			} catch (e) {
				alert(e)
			}

			component.set("v.ActivityList", data);
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