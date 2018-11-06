({
    openOrmMeasureNewCmp: function(component, event, helper) {
        component.set("v.isOpen", true);
        component.set('v.idMeasure', event.getParam('idMeasure'));
        var actionstatus = component.get("c.getSelectOptions");
        actionstatus.setParams({
            'objObject': component.get("v.objInfo"),
            'fld': 'orm_measureCategorie__c'
        });
        actionstatus.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.find("measureCategorie").set("v.value", event.getSource().get("v.value"));
                component.set('v.measureCategorie', response.getReturnValue());
                var actionMeasure = component.get("c.getMeasuresByAssessmentRisk");
                actionMeasure.setParams({
                    "idMeasure":component.get("v.idMeasure")
                });
                actionMeasure.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                        component.set('v.measureData', response.getReturnValue());

                    } else {
                        alert($A.get('$Label.c.orm_not_found'));
                    }
                });
                $A.enqueueAction(actionMeasure);
            } else {
                alert($A.get('$Label.c.orm_not_found'));
            }
        });
        $A.enqueueAction(actionstatus);
    },
     measureCategorieChange: function(component, event, helper) {
        component.find("measureCategorie").set("v.value", event.getSource().get("v.value"));
    },
     createItem: function(component, event, helper) {
        var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');
        var categoryMeasure = component.find('measureCategorie').get('v.value');
        var measureCategory = component.get("v.measureData").orm_measureCategorie__c;
        var measure = component.get("v.measureData");
        if ($A.util.isEmpty(categoryMeasure)) {
                measure.orm_measureCategorie__c = measureCategory;
            } else {
                measure.orm_measureCategorie__c = categoryMeasure;
            }
            measure.Name= name;
            measure.Description = description;
            measure.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
            var actionMeasure = component.get('c.updateMeasure');
            actionMeasure.setParams({
                "measure": measure
            });
            actionMeasure.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                component.set("v.measureData", response.getReturnValue());
                var toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({ 
                    'message': $A.get('$Label.c.orm_success_created'),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toastEvent.fire();
                 var evt = $A.get("e.c:OrmMeasureCreatedEvt");
                    evt.fire();
                component.set("v.isOpen", false);
                
            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(actionMeasure);
        }
})