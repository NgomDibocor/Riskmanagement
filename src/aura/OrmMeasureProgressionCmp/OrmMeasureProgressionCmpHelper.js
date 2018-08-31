({
	getAllMeasuresProgressionByMeasure : function(component, event) {	
		
        var action = component.get("c.getAllMeasuresProgressionByMeasure");
        action.setParam('idMeasure', component.get("v.idMeasure"));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            	//console.log('measure '+ JSON.stringify(response.getReturnValue()));
            	component.set("v.measureProgression ", response.getReturnValue());
            }else{
            	alert($A.get('$Label.c.orm_not_found'));
            }
        });
        $A.enqueueAction(action);
	},
	requiredValidation : function(component,event) {
        // get all causes.. 	
        var allRecords = component.get("v.measureProgression");
        
        var isValid = true;
        
        return isValid;
    },
})