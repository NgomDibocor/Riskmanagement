({
    fetchPicklist: function(component, event) {
     
        var categoryRisk = component.get("v.categorieRisk");
        var nameCategorieRisk= component.find("categorieRisk");
        var item = nameCategorieRisk.get("v.value");
        var actionOrgs = component.get("c.findAll");
        actionOrgs.setParams({
            "item": categoryRisk
        });
        component.set("v.categorieRisk", item);
        actionOrgs.setCallback(this, function(response) {
       
            var state = response.getState();
            if (state === 'SUCCESS') {
           
                var rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                }
                component.set('v.allRisk', rows);
                component.find("categorieRisk").set("v.value", event.getSource().get("v.value"));
                var action = component.get('c.getSelectOptions');
                action.setParams({
                    'objObject': component.get("v.risk"),
                    'fld': 'orm_categorieRisk__c'
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS' && component.isValid()) {
                        component.set('v.allCategorieRisk', response.getReturnValue());
                    } else {
                        alert("the element was not found");
                    }
                });
                $A.enqueueAction(action);
            } else {

                alert("l'Element n'a pas été retrouvé");
            }
        });

        $A.enqueueAction(actionOrgs);
    },
    sendValuesToFieldDescription: function(component, event, helper, field, description) {
        component.set("v.closeFieldDescription", false);
        var closeFieldDescription = component.get("v.closeFieldDescription");
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "closeFieldDescription": closeFieldDescription,
            "nomField": field,
            "descriptionField": description
        });
        evt.fire();
    }
})