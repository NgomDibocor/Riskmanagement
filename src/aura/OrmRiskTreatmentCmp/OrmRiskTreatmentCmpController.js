({
    doInit: function(component, event, helper) {
        var measureId = event.getParam('MeasureId');
        component.set("v.idMeasure", measureId);
        var idMeasure = component.get("v.idMeasure");
        var actionOrgs = component.get("c.getMeasure");
        actionOrgs.setParams({
            "idMeasure": idMeasure
        });
        // component.set("v.categorieRisk", item);
        actionOrgs.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.measureData', response.getReturnValue());
                var idAssessmentRisk = component.get('v.measureData');
                component.set('v.idAssessmentRisk', idAssessmentRisk.orm_assessmentRisk__c);
                component.set("v.displaySaveCancelBtn", false);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });

        var actionstatus = component.get("c.getSelectOptions");
        actionstatus.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'orm_measureStatus__c'
        });
        actionstatus.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.status', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(actionstatus);
        $A.enqueueAction(actionOrgs);
    },
    updateMeasure: function(component, event, helper) {
        var idAssessmentRisk = component.get("v.idAssessmentRisk");

        var measureData = component.get("v.measureData");
        measureData.orm_assessmentRisk__c = idAssessmentRisk;

        var dateMeasure = component.find("dateMeasure");
        measureData.orm_startDate__c = dateMeasure.get("v.value");

        var endDateMeasure = component.find("endDateMeasure");
        measureData.orm_endDate__c = endDateMeasure.get("v.value");

        var status = component.find("status");
        measureData.orm_measureStatus__c = status.get("v.value");

        var cost = component.find("cost");
        measureData.orm_measure_Cost__c = cost.get("v.value");

        var description = component.find("description");
        measureData.orm_description__c = description.get("v.value");

        var action = component.get('c.add');
        action.setParams({
            "item": measureData
        });
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (state == "SUCCESS") {
                        //component.set("v.displaySaveCancelBtn", false);
                        component.set("v.measureData", response.getReturnValue());
                        var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            'message': 'crée avec success',
                            'type': 'success',
                            'mode': 'dismissible'
                        });

                        toastEvent.fire();

                    } else {
                        alert("default");
                    }
                });
        $A.enqueueAction(action);
    },
    onStartDate: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
    onEndDate: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
    onStatus: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
        component.find("status").set("v.value", event.getSource().get("v.value"));
    },
    onCost: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
    onDescription: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
    cancel: function(component, event, helper) {
        component.set("v.displaySaveCancelBtn", false);
    },
})