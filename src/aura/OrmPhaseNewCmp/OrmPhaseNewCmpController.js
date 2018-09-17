({
	/*doInit : function(component, event, helper) {
	
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
	},*/
	
	openPhaseNewCmp : function (component, event, helper) {
		component.set("v.isOpen", true); 
	},
	
	createItem : function(component, event, helper) {
		var phase = component.find('phase').get('v.value');
        
        /* we test the validity of data */
        var isItemsValid = true;
        if($A.util.isEmpty(phase)) {
            isItemsValid = false;           
        }
        
        if(isItemsValid){
        	var newPhase = component.get('v.phaseData');
        	newPhase.Name = "XXXX"; // not used but it's required for Macro
        	newPhase.orm_assessment__c = component.get('v.assessmentId');
        	
        	
        	var action = component.get('c.add');
            action.setParams({
                "item": newPhase
            });
            action.setCallback(this, function(response) {
            	if(response.getState() == 'SUCCESS'){
            	
            	    component.set("v.isOpen", false);
            	    
            		newPhase = response.getReturnValue();
            		var toast = $A.get('e.force:showToast');
            		toast.setParams({
			           'message' : 'Phase has been added',
			           'type' : 'success',
			           'mode' : 'dismissible'
		            });	
		            toast.fire();
		            
		            var evt = $A.get("e.c:OrmEventNewPhaseCreated");
                    evt.fire();
		            
            		
                    component.set('v.phase', { 'sobjectType' : 'Macro',
											   'orm_phase__c': '',
											   'orm_assessment__c': ''
											 }
                    );
                    
            	} else {
            		var toast = $A.get('e.force:showToast');
            		toast.setParams({
			           'message' : 'ERROR',
			           'type' : 'error',
			           'mode' : 'dismissible'
		            });	
		            toast.fire();
            	}
            });
            $A.enqueueAction(action);
        	
        }
	}
})