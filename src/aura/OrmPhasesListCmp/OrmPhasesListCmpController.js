({
    doInit: function(component, event, helper) {
        helper.refresh(component, event);
    },

    refreshList: function(component, event, helper) {
        helper.refresh(component, event);
    },

    openPopupNewPhase: function(component, event, helper) {
        var evt = $A.get('e.c:OrmEventNewPhaseClicked');
        evt.fire();
    },

    closeOpenModalError: function(component, event, helper) {
        component.set('v.openModalError', false);
    },

    closeOpenModalErrorIfFieldEmpty: function(component, event, helper) {
        component.set('v.openModalErrorIfFieldEmpty', false);
    },

    cancel: function(component, event, helper) {
        // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        //$A.get('e.force:refreshView').fire();
    },

    filter: function(component, event, helper) {
        //var phases = component.get('v.phasesTemp');
        var phases = component.get('v.initialData');
        var key = component.get('v.key');
        var regex;

        if ($A.util.isEmpty(key)) {
            helper.refresh(component, event);
        } else {
            key = "^" + key;
            try {
                regex = new RegExp(key, "i");
                // filter checks each row, constructs new array where function returns true
                phases = phases.filter(row => regex.test(row.Description));
            } catch (e) {

            }
            //component.set("v.phases", phases);
            component.set("v.filterPagination", phases);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilter(component, event);
        }
    },
    save: function(component, event, helper) {
        // Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)) {
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
                        'message': 'Updated ...',
                        'type': 'success',
                        'mode': 'dismissible'
                    });
                    toast.fire();
                }
            });
            $A.enqueueAction(action);
        }
    },

    sendDescriptionFieldCause: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": "Phase",
            "descriptionField": "Description"
        });
        evt.fire();
    },

    // For select all Checkboxes 
    selectAll: function(component, event, helper) {
        //get the header checkbox value  
        var selectedHeaderCheck = event.getSource().get("v.value");

        var evt = $A.get('e.c:OrmEvtSelectAllPhases');
        evt.setParams({
            "selectAllCheckbox": selectedHeaderCheck
        });
        evt.fire();
    },
    /**
     * 
     * @authorDavid diop
     * @version 1.0
     * @description method for show modal confirm delete MeasureProgression
     * @history 2018-09-05 : David diop - Implementation
     */
    openModalDeletePhase: function(component, event, helper) {
        // is checked delete assumption show popup message confirmation
        // get all checkboxes 
        //if not checked show toast warning
        var getSelectedNumber = component.get("v.selectedRowsCount");
        if (getSelectedNumber == 0) {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_warning_checked_checkbox"),
                'type': 'warning',
                'mode': 'dismissible'
            });
            toast.fire();
        } else {
            component.set("v.openModalConfirmDeletion", true);
        }
    },
    confirmDeletePhases: function(component, event, helper) {
        var evt = $A.get('e.c:OrmEvtDeletePhases');
        evt.fire();
        component.set('v.openModalConfirmDeletion', false);
    },

    cancelDeletePhases: function(component, event, helper) {
        component.set('v.openModalConfirmDeletion', false);
    },

})