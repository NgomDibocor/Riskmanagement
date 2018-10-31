({
	openOrmMeasureProgressionEditCmp : function(component, event, helper) {
		component.set("v.isOpen", true);
        component.set('v.idMeasure', event.getParam('idMeasure'));
        component.set('v.measureProgressionId', event.getParam('measureProgressionId'));
        console.log(component.get("v.idMeasure"));
         var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.objInfo"), 'fld' : 'Family'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allStatusMeasure', response.getReturnValue());
                var actionMeasure = component.get("c.getMeasuresProgression");
                actionMeasure.setParams({
                    "measureProgressionId":component.get("v.measureProgressionId")
                });
                actionMeasure.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                        component.set('v.measureProgressionData', response.getReturnValue());
                        console.log("measureProgressionData", JSON.stringify(component.get("v.measureProgressionData")));

                    } else {
                        alert($A.get('$Label.c.orm_not_found'));
                    }
                });
                $A.enqueueAction(actionMeasure);
                
            } else {
                  var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : $A.get('$Label.c.orm_not_found'),
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
            }
        });
        $A.enqueueAction(action);
	},
	/** @author: David
	 *  @date: Creation: 31/08/2018
	 *  @description: method for creating a Measure Progression */
	createMeasureProgression: function(component, event, helper){
		var dateProgression = component.find('dateProgression').get('v.value');
        var poucentageProgression = component.find('poucentageProgression').get('v.value');
        var Description = component.find('Description').get('v.value');
        var status = component.find('status').get('v.value');
        var dateProgress = new date();
       
        	var measureProgressionData = component.get('v.measureProgressionData');
        	measureProgressionData.orm_dateProgression__c = dateProgression ;
        	measureProgressionData.orm_poucentageProgression__c = poucentageProgression ;
        	measureProgressionData.Description = Description ;
        	measureProgressionData.Family = status ;
        	measureProgressionData.orm_measures__c = component.get("v.idMeasure");
        	measureProgressionData.Name ='xxxx';
        	
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
	},
	
	onChangeStatus : function(component, event, helper) {
	    	component.find("status").set("v.value", event.getSource().get("v.value")); 
	},
})