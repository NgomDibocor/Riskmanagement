({
	openOrmMeasureProgressionNewCmp : function(component, event, helper) {
		component.set("v.isOpen", true);
        component.set('v.idMeasure', event.getParam('idMeasure'));
        
         var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.measureProgression"), 'fld' : 'Family'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allStatusMeasure', response.getReturnValue());
            } else {
                  var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'the element was not found',
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
            }
        });
        $A.enqueueAction(action);
	},
	onChangeStatus : function(component, event, helper) {
	    	component.find("status").set("v.value", event.getSource().get("v.value")); 
	},
	
	/** @author: David
	 *  @date: Creation: 31/08/2018
	 *  @description: method for creating a Measure Progression */
	createMeasureProgression: function(component, event, helper){
		var dateProgression = component.find('dateProgression').get('v.value');
        var pourcentage = component.find('pourcentage').get('v.value');
        var poucentageProgression = component.find('poucentageProgression').get('v.value');
        var Description = component.find('Description').get('v.value');
        var status = component.find('status').get('v.value');
       
        	var newMeasureProgression = component.get('v.measureProgression');
        	newMeasureProgression.orm_dateProgression__c = dateProgression ;
        	newMeasureProgression.orm_pourcentage__c = pourcentage ;
        	newMeasureProgression.orm_poucentageProgression__c = poucentageProgression ;
        	newMeasureProgression.Description = Description ;
        	newMeasureProgression.Family = status ;
        	newMeasureProgression.orm_measures__c = component.get("v.idMeasure");
        	newMeasureProgression.Name ='xxxx';
        	
        	var action = component.get('c.addMeasureProgression');
            action.setParams({
                "item": newMeasureProgression
            });
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
                component.set("v.isOpen", false);
                
            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(action);
	},
})