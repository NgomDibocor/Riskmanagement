({
    doInit: function(component, event, helper) {
        component.set("v.idActivity", event.getParam('idActivity'));
        var idActivity = component.get('v.idActivity');
        console.log(idActivity);
        helper.getAllActivityProofByActivity(component, event);
    },

    openNewActivityProof: function(component, event, helper) {
        var idActivity = component.get('v.idActivity');
        var evt = $A.get("e.c:OrmNewActivityProofClickedEvt");
        evt.setParams({
            "idActivity": idActivity
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

    refreshList: function(component, event, helper) {
        helper.getAllActivityProofByActivity(component, event);
    },
    /**
     * CreatedBy @David Diop
     * @version 1.0
     * @description method cancel save MeasureProgression
     * @history 
     * 2018-08-31 : David diop - Implementation
     */
    cancel: function(component, event, helper) {
        // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        component.set("v.showSaveCancelBtn", false);
    },
    save: function(component, event, helper) {
        if (helper.requiredValidation(component, event)) {
            // call the saveAccount apex method for update inline edit fields update 
            var action = component.get("c.updateActiviteProof");
            action.setParams({
                'activityProof': component.get("v.activityProof")
            });

            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var measuresProgressions = response.getReturnValue();
                    // set cause list with return value from server.
                    component.set("v.activityProof", measuresProgressions);
                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
                    component.set("v.showSaveCancelBtn", false);
                    var toast = $A.get('e.force:showToast');
                    toast.setParams({
                        'message': $A.get('$Label.c.orm_updated'),
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
     * CreatedBy @David Diop
     * @version 1.0
     * @description method Filter
     * @history 
     * 2018-08-31 : David diop - Implementation
     */
    filterActivityProof: function(component, event, helper) {
        // var dataActivityProof = component.get('v.activityProofTemp');
        var dataActivityProof = component.get('v.initialData');
        var term = component.get('v.filter');
        var regex;
        if ($A.util.isEmpty(term)) {
            helper.getAllActivityProofByActivity(component, event);
        } else {
            term = "^" + term;
            try {
                regex = new RegExp(term, "i");

                dataActivityProof = dataActivityProof.filter(row => regex.test(row.Name) || regex.test(row.Description));

            } catch (e) {
                alert(e);
            }
            //component.set("v.activityProof",dataActivityProof);
            component.set("v.filterPagination", dataActivityProof);
            component.set("v.items", component.get("v.filterPagination"));
            helper.paginationFilterBis(component, event);
        }
    },

    /**
     * 
     * @authorDavid diop
     * @version 1.0
     * @description method for show modal confirm delete Activity Proof
     * @history 2018-09-05 : Salimata NGOM - Implementation
     */
    removeActivityProof: function(component, event, helper) {
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
            component.set("v.showConfirmRemoveAssumption", true);
        }


    },
    /**
     * 
     * @author Dvaid diop
     * @version 1.0
     * @description method for remove Activity Proofselected
     * @history 2018-09-05 : David diop- Implementation
     */
    removeActivityProofSelected: function(component, event, helper) {
        component.set("v.showConfirmRemoveAssumption", false);
        //fire event to childActivityList for delete activity selected
        var evt = $A.get("e.c:OrmRemoveRecordActivityProofEvnt");
        evt.fire();
    },
    /**
     * 
     * @author David Diop
     * @version 1.0
     * @description cancel action and refresh the view
     * @history 2018-09-05 : David Diop- Implementation
     */
    closeModalRemove: function(component, event, helper) {
        // on cancel close modal
        component.set("v.showConfirmRemoveAssumption", false);
    },
})