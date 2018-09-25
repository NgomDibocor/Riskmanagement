({
    /**
     * @author: david
     * @date: Creation: 30/08/2018
     * @description: method for opening the modal form
     *               
     */
    openModalAssumption: function(component, event, helper) {
        component.set("v.isOpen", true);

        component.set('v.idAssessmentRisk', event.getParam('AssessmentRisk'));

    },
    /** @author:david 
     *  @date: Creation: 30/08/2018
     *  @description: method for creating new assumption
     */
    createItem: function(component, event, helper) {
        var name = component.find('name').get('v.value');
        /* we test the validity of data */
        var isItemsValid = true;


        if (isItemsValid) {
            var idAssessmentRisk = component.get("v.idAssessmentRisk");
            var newAssumption = component.get('v.assumption');
            newAssumption.Name = name;

            newAssumption.orm_assessmentRisk__c = idAssessmentRisk;

            var action = component.get('c.add');
            action.setParams({
                "item": newAssumption
            });
            action.setCallback(this, function(response) {
                if (response.getState() == 'SUCCESS') {
                    var newCause = response.getReturnValue();
                    var toast = $A.get('e.force:showToast');
                    toast.setParams({
                        'message': $A.get('$Label.c.new_title_labels') +
                            ' ' +
                            $A.get('$Label.c.orm_name_assumption') +
                            ' ' +
                            $A.get('$Label.c.orm_toast_success'),
                        'type': 'success',
                        'mode': 'dismissible'
                    });
                    toast.fire();
                    component.set('v.assumption', {
                        'sobjectType': 'Macro',
                        'Name': '',
                        'orm_assessmentRisk__c': ''
                    });
                    var evt = $A.get("e.c:OrmAssumptionAssessmentRiskCreatedEvt");
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
    }
})