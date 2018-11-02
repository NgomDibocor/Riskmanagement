({
    doInit: function(component, event, helper) {
        component.set('v.columns', [{
            label: $A.get("$Label.c.orm_name_activity"),
            fieldName: 'Name',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_start_date"),
            fieldName: 'orm_startDate__c',
            type: 'date',
             typeAttributes: {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }
        }, {
            label: $A.get("$Label.c.orm_end_date"),
            fieldName: 'orm_endDate__c',
            type: 'date',
             typeAttributes: {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }
        }, {
            label: $A.get("$Label.c.orm_activity_status"),
            fieldName: 'orm_activityStatus__c',
            type: 'text'
        }, {
            label: $A.get("$Label.c.orm_description"),
            fieldName: 'orm_description__c',
            type: 'text'
        }, {
            type: 'button',
            typeAttributes: {
                label: $A.get("$Label.c.orm_show_button_title"),
                name: $A.get("$Label.c.orm_show_button_title"),
                title: $A.get("$Label.c.orm_show_button_title")
            }
        }, {
            label: 'Action',
            type: 'button',
            cellAttributes: {
                alignment: 'center'
            },
            typeAttributes: {
                label: $A.get("$Label.c.orm_edit_button_title"),
                name: $A.get("$Label.c.orm_edit_button_title"),
                title: $A.get("$Label.c.orm_edit_button_title")
            }
        }]);
        helper.refresh(component, event);
    },

    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for fire and open new component activity
     * @history 2018-08-20 : Salimata NGOM - Implementation
     */
    openActivityNewCmp: function(component, event, helper) {
        var idAssessment = component.get("v.assessmentData").Id;
        if (idAssessment == null) {
            // alert("check if you have created the assessment");
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_toast_warning_assessment"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire();
        } else {
            var evt = $A.get("e.c:OrmOpenNewActivityCmpEvt");
            evt.setParams({
                "idAssessment": idAssessment
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
 
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description cancel action and refresh the view
     * @history 2018-08-20 : Salimata NGOM - Implementation
     */
    cancel: function(component, event, helper) {
        component.set("v.showSaveCancelBtn", false);
        helper.refresh(component, event);
    },

    //	removeActivity:function(component,event,helper){
    //		// is checked delete activity show popup message confirmation
    //		// get all checkboxes
    //		// if not checked show toast warning
    //		var getSelectedNumber = component.get("v.selectedCount");
    //		if(getSelectedNumber==0){
    //			var toast = $A.get('e.force:showToast');
    //			toast.setParams({
    //				'message' : $A.get("$Label.c.orm_warning_checked_checkbox"),
    //				'type' : 'warning',
    //				'mode' : 'dismissible'
    //			});      
    //			toast.fire(); 
    //		}else{
    //			component.set("v.showConfirmRemoveActivity",true);
    //		}
    //
    //
    //	},
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for close modal activity
     * @history 2018-08-20 : Salimata NGOM - Implementation
     */
    closeModalRemove: function(component, event, helper) {
        component.set("v.isEmptyMap", true);
        component.set("v.showConfirmRemoveActivity", false);
    },


    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description search filter
     * @history 2018-08-20 : Salimata NGOM - Implementation
     */
    filter: function(component, event, helper) {
        //		var ListActivity = component.get('v.storeListActivity');
        var ListActivity = component.get('v.initialData');
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
                data = ListActivity.filter(row => regex.test(row.Name) ||
                    regex.test(row.orm_activityStatus__c) ||
                    regex.test(row.orm_description__c) ||
                    regex.test(row.orm_startDate__c) || regex.test(row.orm_endDate__c));
            } catch (e) {
                alert(e)
            }

            //			component.set("v.ActivityList", data);
            component.set("v.filterPagination", data);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilterBis(component, event);
        }
    },
    sendDescriptionFieldCause: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": "Activity",
            "descriptionField": "This field describes the main activity relevant to the subject for te assessment. This could for example be a project or a specific operation such as a lifting operation."
        });
        evt.fire();
    },
    selectCauses: function(component, event, helper) {

    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for show modal confirm delete activity
     * @history 2018-08-20 : Salimata NGOM - Implementation
     */
    removeActivity: function(component, event, helper) {
        var current = component.get("v.currentPage");
        var dTable = component.find("datatableList");
        var selectedRows = dTable.getSelectedRows();
        console.log("selected", selectedRows.length);
        if (selectedRows.length != 0) {
            var pgName = "page" + current;
            component.get("v.SelectedItem")[pgName] = selectedRows;
        } else {
            var pgName = "page" + current;
            component.get("v.SelectedItem")[pgName] = selectedRows;
            console.log("***View else lenght =0*** ", Object(component.get("v.SelectedItem")));
        }
        var myMap = component.get("v.SelectedItem");
        console.log("selectedRows in delete", Object.keys(myMap).length);
        helper.checkIfMapContentIsEmpty(component, event, myMap);
        if (Object.keys(myMap).length == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        } else if (component.get("v.isEmptyMap")) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire()
        } else {
            component.set("v.showConfirmRemoveActivity", true);
        }
    },
    /**
     * 
     * @author Salimata NGOM
     * @version 1.0
     * @description method for remove activity selected
     * @history 2018-08-20 : Salimata NGOM - Implementation
     */
    removeActSelected: function(component, event, helper) {
        var myMap = component.get("v.SelectedItem");
        var idActivity = [];
        var lengthMap = Object.keys(myMap).length;

        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            for (var j = 0; j < myMap[page].length; j++) {
                idActivity.push(myMap[page][j].Id);
            }
        }

        //		call apex class method
        var action = component.get('c.deleteRecordActivities');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "lstRecordId": idActivity
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                myMap = {};
                component.set("v.SelectedItem", myMap);
                component.set("v.isEmptyMap", true);
                component.set('v.showConfirmRemoveActivity', false);
                helper.refresh(component, event);
            }
        });
        $A.enqueueAction(action);
    },
    selectActivity: function(component, event, helper) {
        var row = event.getParam('row');
        var idAssessment = component.get("v.assessmentData").Id;
       var actionName = event.getParam('action').name;
        if (actionName == $A.get("$Label.c.orm_edit_button_title")) {
        	var evt = $A.get("e.c:OrmOpenEditActivityCmpEvt");
            evt.setParams({
                "idAssessment": idAssessment,
                "idActivity":row.Id
            });
            evt.fire();
        }
        if (actionName == $A.get("$Label.c.orm_show_button_title")) {
        var evt = $A.get("e.c:OrmShowActivityEvt");
	        evt.setParams({
	            "idActivity": row.Id
	        });
        evt.fire();
        }
    }
})