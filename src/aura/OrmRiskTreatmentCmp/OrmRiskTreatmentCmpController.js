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
            } else {

                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(actionOrgs);
    }
})