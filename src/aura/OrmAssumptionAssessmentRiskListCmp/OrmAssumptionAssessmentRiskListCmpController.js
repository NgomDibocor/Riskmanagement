({
    getAssessmentRiskId: function(component, event, helper) {
        component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
        helper.refreshList(component, event);
    },
    refresh: function(component, event, helper) {
        helper.refreshList(component, event);
    },
    openNewAssumption: function(component, event, helper) {
        var idAssessmentRisk = component.get("v.idAssessmentRisk");
        var evt = $A.get("e.c:OrmNewAssumptionAssessmentRiskClickedEvt");
        evt.setParams({
            "AssessmentRisk": idAssessmentRisk
        });
        evt.fire();
    },
    updateAssumpt: function(component, event, helper) {
        // Check required fields(Name) first in helper method which is return
        // true/false
        console.log('test');

        if (helper.requiredValidation(component, event)) {
            // call the saveAssumption apex method for update inline edit
            // fields update
            var action = component.get("c.save");
            action.setParams({
                'listAssumption': component.get("v.PaginationList")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    // set assumptionList list with return value from server.
                    console.log(JSON.stringify(storeResponse));
                    component.set("v.assumptionList", storeResponse);
                    var toast = $A.get('e.force:showToast');
                    toast.setParams({
                        'message': $A.get("$Label.c.orm_updated"),
                        'type': 'success',
                        'mode': 'dismissible'
                    });
                    toast.fire();
                    // Hide the save and cancel buttons by setting the
                    // 'showSaveCancelBtn' false
                    component.set("v.showSaveCancelBtn", false);
                }
            });
            $A.enqueueAction(action);
        }
    },
    cancel: function(component, event, helper) {
        alert("cancel");
    },
    /**
     * @author David diop
     * @version 1.0
     * @description method for show modal confirm delete assumption
     * @history 2018-09-05 : David diop - Implementation
     */
    removeAssumption: function(component, event, helper) {
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
     * @author David
     * @version 1.0
     * @description method for remove assumption selected
     * @history 2018-09-05 : David - Implementation
     */
    removeAssumptSelected: function(component, event, helper) {
        component.set("v.showConfirmRemoveAssumption", false);
        var evt = $A.get("e.c:OrmRemoveRecordAssumptAssRiskEvnt");
        evt.fire();
    },
    /**
     * @author David
     * @version 1.0
     * @description cancel action and refresh the view
     * @history 2018-09-05 : David - Implementation
     */
    closeModalRemove: function(component, event, helper) {
        // on cancel close modal
        component.set("v.showConfirmRemoveAssumption", false);
    },
    /**
     * 
     * @author David
     * @version 1.0
     * @description search filter
     * @history 2018-08-30 : David  - Implementation
     */
    filter: function(component, event, helper) {
        //var ListAssumption = component.get('v.storeAssumptionList');
         var ListAssumption = component.get('v.initialData');
        var data = ListAssumption;
        var key = component.get('v.key');
        var regex;

        if ($A.util.isEmpty(key)) {
            helper.refreshList(component, event);
        } else {
            key = "^" + key;
            try {
                regex = new RegExp(key, "i");
                // filter checks each row, constructs new array where
                // function returns true
                data = ListAssumption.filter(row => regex.test(row.Name));
            } catch (e) {
                alert(e)
            }
           // component.set("v.assumptionRiskList", data);
            component.set("v.filterPagination", data);
		   component.set("v.items", component.get("v.filterPagination"));
		   helper.paginationFilterBis(component, event);
        }
    },
})