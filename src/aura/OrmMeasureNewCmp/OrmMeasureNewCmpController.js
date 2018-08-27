({
	openOrmMeasureNewCmp : function(component, event, helper) {
		component.set("v.isOpen", true);
		
		var actionstatus = component.get("c.getSelectOptions");
        actionstatus.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'orm_measureCategorie__c'
        });
        actionstatus.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.measureCategorie', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(actionstatus);
	},
	
	createItem : function(component, event, helper) {
	   var name = component.find('name').get('v.value');
       var description = component.find('description').get('v.value');
       var measureCategorie  = component.find('measureCategorie').get('v.value');
       
       /* we test the validity of data */
        var isItemsValid = true;
        if($A.util.isEmpty(name)){
            isItemsValid = false;           
        }
        
        if(isItemsValid){
        	var newMeasure = component.get('v.measure');
        	newMeasure.Name = name;
        	newMeasure.orm_description__c = description;
        	newMeasure.orm_measureCategorie__c = measureCategorie;
        	newMeasure.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
        	
        	var action = component.get('c.add');
            action.setParams({
                "item": newMeasure
            });
            action.setCallback(this, function(response) {
            	if(response.getState() == 'SUCCESS'){
            	   component.set('v.measure', { 
            		   'sobjectType' : 'Assessment__c',
		               'Name' : '',
		               'orm_description__c' : '',
			        });
            		var newMeasure = response.getReturnValue();
            		var toast = $A.get('e.force:showToast');
            		toast.setParams({
			           'message' : newMeasure.Name +' ' + $A.get('$Label.c.orm_toast_success'),
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
			           'message' : $A.get('$Label.c.orm_error'),
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
			   'message' : $A.get("$Label.c.orm_error_field_empty"),
			   'type' : 'error',
			   'mode' : 'dismissible'
		    });	
		    toast.fire();
        }
	
	},
	
	closeModal : function(component, event, helper) {
	    component.set("v.isOpen", false);
	},
	measureCategorieChange :  function (component , event , helper)
	{
		component.find("measureCategorie").set("v.value", event.getSource().get("v.value"));
	}
})