({
	refresh : function(component, idAssessmentRisk) {	
		
        var action = component.get("c.findAllImpactByAssessmentRisk");
        action.setParam('idAssRisk', idAssessmentRisk);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            	component.set("v.impacts", response.getReturnValue());
            	alert(JSON.stringify(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
	},
	requiredValidation : function(component,event) {
        // get all causes.. 	
        var allRecords = component.get("v.impacts");
        var isValid = true;
        // play a for loop on all account list and check that account name is not null,   
        for(var i = 0; i < allRecords.length; i++) {
            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' Name is null' );
                isValid = false;
            }  
        }
        return isValid;
    },
})