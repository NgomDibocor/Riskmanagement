({
	
	getAllActivityProofByActivity : function(component, event) {	
		
        var action = component.get("c.getAllMeasuresProgressionByMeasure");
        action.setParam('idActivity', component.get("v.idActivity"));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            	//console.log('measure '+ JSON.stringify(response.getReturnValue()));
            	component.set("v.activityProof ", response.getReturnValue());
            	component.set("v.activityProofTemp ", response.getReturnValue());
            }else{
            	alert($A.get('$Label.c.orm_not_found'));
            }
        });
        $A.enqueueAction(action);
	},
	requiredValidation : function(component,event) {
        // get all causes.. 	
        var allRecords = component.get("v.activityProof");
        
        var isValid = true;
        
        return isValid;
    },
})