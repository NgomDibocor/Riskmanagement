({
    /** @author: David
     *  @date: Creation: 28/08/2018
     *  @description: method for opening the component and initilizing its attributes */
    openOrmImpactEditCmp: function(component, event, helper) {
        
        component.set('v.idImpact', event.getParam('idImpact'));
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
                        console.log("impactData",JSON.stringify(component.get("v.impactData")));
                        component.set("v.isOpen", true);
                        
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
})