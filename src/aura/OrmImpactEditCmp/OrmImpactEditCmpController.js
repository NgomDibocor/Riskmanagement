({
    /** @author: David
     *  @date: Creation: 30/10/2018
     *  @description: method for opening the component and initilizing its attributes */
    openOrmImpactEditCmp: function(component, event, helper) {
        component.set("v.isOpen", true);
        component.set('v.idImpact', event.getParam('idImpact'));
        component.set('v.idAssessmentRisk', event.getParam('assessmentRiskId'));
        var idImpact = component.get("v.idImpact");
        var action = component.get('c.getSelectOptions');
        action.setParams({
            'objObject': component.get("v.objInfo"),
            'fld': 'orm_categorie_impact__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                component.set('v.allCategorieImpact', response.getReturnValue());
                var actionImpact = component.get("c.getImpact");
                actionImpact.setParams({
                    "idImpact": idImpact
                });
                actionImpact.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                        component.set('v.impactData', response.getReturnValue());
                        console.log("impactData", JSON.stringify(component.get("v.impactData")));

                    } else {
                        alert($A.get('$Label.c.orm_not_found'));
                    }
                });
                $A.enqueueAction(actionImpact);

            } else {
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message': 'the element was not found',
                    'type': 'warning',
                    'mode': 'dismissible'
                });
                toast.fire();
            }
        });
        $A.enqueueAction(action);
    },
    onChange2: function(component, event, helper) {
        component.find("categorieImpact").set("v.value", event.getSource().get("v.value"));
    },
    /** @author: David
     *  @date: Creation: 30/10/2018
     *  @description: method for update Impact */
    saveImpact: function(component, event, helper) {
        component.set("v.isOpen", false);
        var categorieImpact = component.find('categorieImpact').get('v.value');
        var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');
        var categoryImpact =  component.get('v.impactData').orm_categorie_impact__c;
        var newImpact = component.get('v.impactData');
        if ($A.util.isEmpty(categorieImpact)) {
                newImpact.orm_categorie_impact__c = categoryImpact;
            } else {
                newImpact.orm_categorie_impact__c = categorieImpact;
            }
        newImpact.Name = name;
        newImpact.Description = description;
        newImpact.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
        var actionUpdateImpact = component.get('c.updateImpact');
        actionUpdateImpact.setParams({
            "impact": newImpact
        });
        actionUpdateImpact.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set("v.impactData",response.getReturnValue());
                var evt = $A.get("e.c:OrmImpactCreatedEvt");
                evt.fire();

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
        $A.enqueueAction(actionUpdateImpact);
    },
})