({
	openOrmActivityProofNew : function(component, event, helper) {
		component.set("v.idActivity", event.getParam('idActivity'));
		var idActivity = component.get('v.idActivity');
		component.set("v.isOpen", true);
	},
	/** 
	 *  @author: David
	 *  @date: Creation: 31/08/2018
	 *  @description: method for creating activity proof
	 */
	createMeasureProgression: function(component, event, helper){
		var name = component.find('name').get('v.value');
        var Description = component.find('Description').get('v.value');
       
        	var newActivityProof= component.get('v.activityProof');
        	newActivityProof.Description = Description ;
        	newActivityProof.orm_Activite__c = component.get("v.idActivity");
        	newActivityProof.Name =name;
        	console.log(JSON.stringify(newActivityProof));
        	var action = component.get('c.addActivityProof');
            action.setParams({
                "item": newActivityProof
            });
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                component.set("v.activityProof", response.getReturnValue());
                var toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({ 
                    'message': $A.get('$Label.c.orm_success_created'),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toastEvent.fire();
                component.set("v.isOpen", false);
                
            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(action);
	},
})