({
	doInit : function(component, event, helper) {
		
		var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.phase"), 'fld' : 'orm_phase__c'});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allPhases', response.getReturnValue());
            } else {
                alert("the element was not found");
            }
        });
        $A.enqueueAction(action); 
	},
	
	createItem : function(component, event, helper) {
	
	}
})