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
        }
    },
    updateAssumption: function(component, event, helper) {
        // Check required fields(Name) first in helper method which is return
        // true/false
        alert("bien");
        if (helper.requiredValidation(component, event)) {
            // call the saveAssumption apex method for update inline edit
            // fields update
            var action = component.get("c.save");
            action.setParams({
                'listAssumption': component.get("v.assumptionRiskList")
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
})