({
    getAssessmentRiskId: function(component, event, helper) {
        component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
        helper.refresh(component, event);
    },
    openPopupNewPhase: function(component, event, helper) {
        var evt = $A.get('e.c:OrmEventNewPhaseAssessmentRiskClicked');
        evt.fire();
    },
    refreshList: function(component, event, helper) {
        helper.refresh(component, event);
    },
    
    sendDescriptionFieldCause: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get('$Label.c.orm_phase'),
            "descriptionField": $A.get('$Label.c.orm_phase_description')
        });
        evt.fire();
    },
    save: function(component, event, helper) {
        // Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)) {
            // call the saveAccount apex method for update inline edit fields update 
            var action = component.get("c.updatePhases");
            action.setParams({
                'phases': component.get("v.PaginationList")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var phases = response.getReturnValue();
                    // set cause list with return value from server.
                    component.set("v.phasesList", phases);
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
    /**
     * @authorDavid diop
     * @version 1.0
     * @description method for show modal confirm delete phase
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
       cancel: function(component, event, helper) {
       component.set("v.showSaveCancelBtn", false);
       helper.refresh(component, event);
    },
    cancelDeletePhases: function(component, event, helper) {
        component.set('v.openModalConfirmDeletion', false);
    },
    confirmDeletePhases: function(component, event, helper) {
        var evt = $A.get('e.c:OrmEvtDeletePhasesAssRisk');
        evt.fire();
        component.set('v.openModalConfirmDeletion', false);
    },
    filter: function(component, event, helper) {
        // var phases = component.get('v.phasesTemp');
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
            } catch (e) {}
            //component.set("v.phasesList", phases);
            component.set("v.filterPagination", phases);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilterBis(component, event);
        }
    },
})