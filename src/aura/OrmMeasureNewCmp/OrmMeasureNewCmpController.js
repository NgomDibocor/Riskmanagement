({
    openOrmMeasureNewCmp: function(component, event, helper) {
        component.set("v.isOpen", true);
        helper.refreshList(component, event);
    },

    createItem: function(component, event, helper) {
        var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');

        /* we test the validity of data */
        var isItemsValid = true;
        if ($A.util.isEmpty(name)) {
            isItemsValid = false;
        }

        if (isItemsValid) {
            var categoryMeasure = component.get("v.categorieMeasure");
            var newMeasure = component.get('v.measure');
            newMeasure.Name = name;
            newMeasure.orm_description__c = description;
            var measureCategorie = component.find('measureCategorie').get('v.value');
            if ($A.util.isEmpty(measureCategorie)) {
                newMeasure.orm_measureCategorie__c = categoryMeasure;
            } else {
                component.set("v.categorieMeasure", measureCategorie);
                newMeasure.orm_measureCategorie__c = component.get("v.categorieMeasure");
            }
            newMeasure.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
            var action = component.get('c.add');
            action.setParams({
                "item": newMeasure
            });
            action.setCallback(this, function(response) {
                if (response.getState() == 'SUCCESS') {

                    var newMeasure = response.getReturnValue();

                    //notify OrmAssessmentLayout that list messure is not empty
                    var evtListMeasureNotEmpty = $A.get("e.c:OrmListMeasureNotEmptyEvt");
                    evtListMeasureNotEmpty.setParams({
                        'idMeasure': newMeasure.Id
                    });
                    evtListMeasureNotEmpty.fire();

                    component.set('v.measure', {
                        'sobjectType': 'Assessment__c',
                        'Name': '',
                        'orm_description__c': '',
                    });

                    var toast = $A.get('e.force:showToast');
                    toast.setParams({
                        'message': newMeasure.Name + ' ' + $A.get('$Label.c.orm_toast_success'),
                        'type': 'success',
                        'mode': 'dismissible'
                    });
                    toast.fire();
                    var evt = $A.get("e.c:OrmMeasureCreatedEvt");
                    evt.fire();
                    component.set("v.isOpen", false);
                } else {
                    var toast = $A.get('e.force:showToast');
                    toast.setParams({
                        'message': $A.get('$Label.c.orm_error'),
                        'type': 'error',
                        'mode': 'dismissible'
                    });
                    toast.fire();
                }
            });
            $A.enqueueAction(action);
        } else {
            var toast = $A.get('e.force:showToast');
            toast.setParams({
                'message': $A.get("$Label.c.orm_error_field_empty"),
                'type': 'error',
                'mode': 'dismissible'
            });
            toast.fire();
        }

    },

    closeModal: function(component, event, helper) {
        component.set("v.isOpen", false);
    },
    measureCategorieChange: function(component, event, helper) {
        component.find("measureCategorie").set("v.value", event.getSource().get("v.value"));
    }
})