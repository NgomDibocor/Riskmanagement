({
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
        	newPhase.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
        	
        	
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
		            
		           var evt = $A.get("e.c:OrmEventNewPhaseAssessmentRiskCreated");
                    evt.fire();
		            
            		
                    component.set('v.phase', { 'sobjectType' : 'Macro',
											   'orm_phase__c': '',
											   'orm_assessmentRisk__c': ''
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