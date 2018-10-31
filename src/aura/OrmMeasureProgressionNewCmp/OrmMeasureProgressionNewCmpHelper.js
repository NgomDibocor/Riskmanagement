({
	addProgressMeasure : function(component,event, newMeasureProgression) {
		    var action = component.get('c.addMeasureProgression');
            action.setParams({ "item": newMeasureProgression });
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                component.set("v.measureProgression", response.getReturnValue());
                var toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({ 
                    'message': $A.get('$Label.c.orm_success_created'),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toastEvent.fire();
                var evt = $A.get("e.c:OrmMeasureProgressionCreatedEvt");
                   evt.fire();
                    component.set('v.measureProgression', {'sobjectType' : 'Product2',
                                                               'Description' : '',
                                                               'Family':'',
                                                               'orm_poucentageProgression__c':'',
                                                               'orm_dateProgression__c':'',
                                                               'orm_measures__c':''
                                                              
                    });
                component.set("v.isOpen", false);
                
            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(action);
	}
})