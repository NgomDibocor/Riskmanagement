({

	fetchPicklist : function(component, event, idMeasure) {
        var actionstatus = component.get("c.getSelectOptions");
        actionstatus.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'orm_measure_Status__c'
        });
        actionstatus.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.status', response.getReturnValue());
                //get Responsable measure picklist
                var actionUser = component.get("c.getUsers");
		        actionUser.setCallback(this, function(response){
		            var state = response.getState();
		            if(state === 'SUCCESS'){
		                component.set('v.allUser', response.getReturnValue());
		                
		                // get the measure object
				        var actionMeasure = component.get("c.getMeasure");
				        actionMeasure.setParams({"idMeasure": idMeasure});
				        actionMeasure.setCallback(this, function(response) {
				            var state = response.getState();
				            if (state === 'SUCCESS') {
				                component.set('v.measureData', response.getReturnValue());
				                component.set("v.displaySaveCancelBtn", false);
				                //put value in the inputSelect
				                component.find("statusMeasure").set("v.value", component.get('v.measureData').orm_measure_Status__c);
				                component.find("measureResponsable").set("v.value", component.get('v.measureData').orm_measureResponsable__c);
				                
				                var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
	                            evtSpinner.fire(); 
					          }else{
					             alert($A.get('$Label.c.orm_not_found'));
					          }
					     });
					     $A.enqueueAction(actionMeasure);
		            } else {
		                alert($A.get("$Label.c.orm_not_found"));
		            }
		        });
               $A.enqueueAction(actionUser);
            } else { 
                alert($A.get('$Label.c.orm_not_found'));
            }
        });
        $A.enqueueAction(actionstatus);
	}
	
})