({
	requiredValidation : function(component,event) {
        // get all causes.. 	
        var allRecords = component.get("v.causes");
        var isValid = true;
        // play a for loop on all account list and check that account name is not null,   
        for(var i = 0; i < allRecords.length; i++) {
            if(allRecords[i].Description == null || allRecords[i].Description.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' Name is null' );
                isValid = false;
            }  
        }
        return isValid;
    },
    
    refresh : function(component, idAssessmentRisk) {	
		
        var action = component.get("c.findAllCausesByAssessmentRisk");
        action.setParam('idAssRisk', idAssessmentRisk);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {   
            	console.log('causes '+ response.getReturnValue());
            	component.set("v.causes ", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})