({
    openOrmMeasureProgressionEditCmp: function(component, event, helper) {
        component.set("v.isOpen", true);
        component.set('v.idMeasure', event.getParam('idMeasure'));
        component.set('v.measureProgressionId', event.getParam('measureProgressionId'));
        console.log(component.get("v.idMeasure"));
        var action = component.get('c.getSelectOptions');
        action.setParams({
            'objObject': component.get("v.objInfo"),
            'fld': 'Family'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                component.set('v.allStatusMeasure', response.getReturnValue());
                var actionMeasure = component.get("c.getMeasuresProgression");
                actionMeasure.setParams({
                    "measureProgressionId": component.get("v.measureProgressionId")
                });
                actionMeasure.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                    var percentMeasure = response.getReturnValue().orm_poucentageProgression__c * 100;
                        component.set('v.measureProgressionData', response.getReturnValue());
                        component.set('v.measureProgressionData.orm_poucentageProgression__c',percentMeasure);
                        console.log("measureProgressionData", JSON.stringify(component.get("v.measureProgressionData")));

                    } else {
                        alert($A.get('$Label.c.orm_not_found'));
                    }
                });
                $A.enqueueAction(actionMeasure);

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
    /** @author: David
     *  @date: Creation: 31/08/2018
     *  @description: method for creating a Measure Progression */
    createMeasureProgression: function(component, event, helper) {
        var dateProgression = component.find('dateProgression').get('v.value');
        var poucentageProgression = component.find('poucentageProgression').get('v.value');
        var Description = component.find('Description').get('v.value');
        var status = component.find('status').get('v.value');
        var measureProgressStatus = component.get('v.measureProgressionData').Family;

        var measureProgressionData = component.get('v.measureProgressionData');

        if ($A.util.isEmpty(status)) {
            measureProgressionData.Family = measureProgressStatus;
        } else {
            measureProgressionData.Family = status;
        }
        measureProgressionData.orm_dateProgression__c = dateProgression;
        measureProgressionData.orm_poucentageProgression__c = poucentageProgression / 100;
        measureProgressionData.Description = Description;
        measureProgressionData.orm_measures__c = component.get("v.idMeasure");
        measureProgressionData.Name = 'xxxx';

        var actionGetPercents = component.get('c.getPorgressPercentsOfMeasure');
        actionGetPercents.setParams({
            "idMeasure": component.get("v.idMeasure")
        });

        actionGetPercents.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var obj = response.getReturnValue();
                if (Object.keys(obj).length === 0) {
                    if (poucentageProgression <= 100) {
                        var percentProgression = poucentageProgression / 100;
                        measureProgressionData.orm_poucentageProgression__c = percentProgression;
                        helper.addProgressMeasure(component, event, measureProgressionData);
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
                    var result = Number(poucentageProgression) + a;
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
                        var percentProgression = poucentageProgression / 100;
                        measureProgressionData.orm_poucentageProgression__c = percentProgression;
                        helper.addProgressMeasure(component, event, measureProgressionData);
                    }
                }
            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(actionGetPercents);
    },

    onChangeStatus: function(component, event, helper) {
        component.find("status").set("v.value", event.getSource().get("v.value"));
    },
})