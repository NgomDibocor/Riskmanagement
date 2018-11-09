({
	addProgressMeasure : function(component,event, measureProgressionData) {
			var action = component.get('c.updateMeasureProgression');
            action.setParams({
                "measureProgression": measureProgressionData
            });
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                component.set("v.measureProgressionData", response.getReturnValue());
                var toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({ 
                    'message': $A.get('$Label.c.orm_success_created'),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toastEvent.fire();
                var evt = $A.get("e.c:OrmMeasureProgressionCreatedEvt");
                   evt.fire();
                component.set("v.isOpen", false);
                
            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(action);
	}
})