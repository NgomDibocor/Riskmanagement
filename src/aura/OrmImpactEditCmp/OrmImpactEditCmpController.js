({
    /** @author: David
     *  @date: Creation: 28/08/2018
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
     *  @date: Creation: 28/08/2018
     *  @description: method for update Impact */
    updateImpact: function(component, event, helper) {
    component.set("v.isOpen", false);
        var categorieImpact = component.find('categorieImpact').get('v.value');
        var newImpact = component.get('v.impactData');
        console.log("newImpact:", newImpact)
        newImpact.orm_categorie_impact__c = categorieImpact;
        newImpact.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
        var actionUpdateImpact = component.get('c.updateImpact');
        actionUpdateImpact.setParams({
            "impact": newImpact
        });
        actionUpdateImpact.setCallback(this, function(response) {
            if (response.getState() == 'SUCCESS') {
                console.log("response.getReturnValue()", response.getReturnValue())
                component.set("v.isOpen", false);
                /*var impactData = response.getReturnValue();
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message': $A.get('$Label.c.new_title_labels') + ' ' +
                        $A.get('$Label.c.orm_label_cause') + ' ' +
                        $A.get('$Label.c.orm_toast_success'),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toast.fire();
                var evt = $A.get("e.c:OrmImpactCreatedEvt");
                evt.fire();*/
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
    }
})