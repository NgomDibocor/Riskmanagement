({
	openOrmMeasureNewCmp : function(component, event, helper) {
		component.set("v.isOpen", true);
	},
	
	createItem : function(component, event, helper) {
	   var name = component.find('name').get('v.value');
       var description = component.find('description').get('v.value');
       
       /* we test the validity of data */
        var isItemsValid = true;
        if($A.util.isEmpty(name) || $A.util.isEmpty(description)){
            isItemsValid = false;           
        }
        
        if(isItemsValid){
        	var newMeasure = component.get('v.measure');
        	newMeasure.Name = name;
        	newMeasure.orm_description__c = description;
        	newMeasure.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
        	
        	var action = component.get('c.add');
            action.setParams({
                "item": newMeasure
            });
            action.setCallback(this, function(response) {
            	if(response.getState() == 'SUCCESS'){
            	   component.set('v.measure', 
		             { 'sobjectType' : 'Assessment__c',
		               'Name' : '',
		               'orm_description__c' : '',
			        });
            		var newMeasure = response.getReturnValue();
            		var toast = $A.get('e.force:showToast');
            		toast.setParams({
			           'message' : newMeasure.Name +' has been added',
			           'type' : 'success',
			           'mode' : 'dismissible'
		            });	
		            toast.fire();
                   var evt = $A.get("e.c:OrmMeasureCreatedEvt");
                   evt.fire();
                   component.set("v.isOpen", false);
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
        }else {
        	var toast = $A.get('e.force:showToast');
        	toast.setParams({
			   'message' : 'No Field should be Empty',
			   'type' : 'error',
			   'mode' : 'dismissible'
		    });	
		    toast.fire();
        }
	
	},
	
	closeModal : function(component, event, helper) {
	    component.set("v.isOpen", false);
	},
})