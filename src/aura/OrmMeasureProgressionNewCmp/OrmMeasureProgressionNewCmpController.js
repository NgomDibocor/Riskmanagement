({
    openOrmMeasureProgressionNewCmp: function(component, event, helper) {
        component.set("v.isOpen", true);
        component.set('v.idMeasure', event.getParam('idMeasure'));

        var action = component.get('c.getSelectOptions');
        action.setParams({
            'objObject': component.get("v.measureProgression"),
            'fld': 'Family'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                component.set('v.allStatusMeasure', response.getReturnValue());
            } else {
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message': $A.get('$Label.c.orm_not_found'),
                    'type': 'warning',
                    'mode': 'dismissible'
                });
                toast.fire();
            }
        });
        $A.enqueueAction(action);
    },
    onChangeStatus: function(component, event, helper) {
        component.find("status").set("v.value", event.getSource().get("v.value"));
    },

    /** @author: David & Dibocor
     *  @date: Creation: 31/08/2018
     *  @description: method for creating a Measure Progression */
    createMeasureProgression: function(component, event, helper) {
        var newMeasureProgression = component.get('v.measureProgression');
        var status = component.find('status').get('v.value');
        newMeasureProgression.Family = status;
        newMeasureProgression.Name = 'xxxx';
        newMeasureProgression.orm_measures__c = component.get("v.idMeasure");

        var actionGetPercents = component.get('c.getPorgressPercentsOfMeasure');
        actionGetPercents.setParams({
            "idMeasure": component.get("v.idMeasure")
        });
        actionGetPercents.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var obj = response.getReturnValue();
                if (Object.keys(obj).length === 0) {
                    if (newMeasureProgression.orm_poucentageProgression__c <= 100) {
                        var percentProgression = newMeasureProgression.orm_poucentageProgression__c / 100;
                        newMeasureProgression.orm_poucentageProgression__c = percentProgression;
                        helper.addProgressMeasure(component, event, newMeasureProgression);
                    } else {
                        console.log("orm_poucentageProgression__c is > 100")
                        var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            'message': 'Must not exceed 100',
                            'type': 'error',
                            'mode': 'dismissible'
                        });
                        toastEvent.fire();
                    }
                } else {
                    var a = 100 * Number(Object.values(obj)[0]);
                    var result = Number(newMeasureProgression.orm_poucentageProgression__c) + a;
                    if (result > 100) {
                        console.log("result is > 100")
                        var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            'message': 'Must not exceed 100',
                            'type': 'error',
                            'mode': 'dismissible'
                        });
                        toastEvent.fire();
                    } else {
                        var percentProgression = newMeasureProgression.orm_poucentageProgression__c / 100;
                        newMeasureProgression.orm_poucentageProgression__c = percentProgression;
                        helper.addProgressMeasure(component, event, newMeasureProgression);
                    }
                }
            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(actionGetPercents);

    },
})