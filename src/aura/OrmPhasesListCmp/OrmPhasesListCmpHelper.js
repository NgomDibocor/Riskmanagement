({
	requiredValidation : function(component, event) {
		// get all phase.. 	
        var allRecords = component.get("v.phases");
        var isValid = true;   
        for(var i = 0; i < allRecords.length; i++){
            if(allRecords[i].orm_phase__c == null || allRecords[i].orm_phase__c.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' phase is null' );
                isValid = false;
            }  
        }
        return isValid;
	},
	
	refresh : function(component, event){
		var idAssessment = component.get('v.idAssessment');
		var action = component.get("c.findAllPhasesByAssessment");
        action.setParam('idAss', idAssessment);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {                 
            	component.set("v.phases", response.getReturnValue());
            	console.log("phases " + JSON.stringify(component.get("v.phases")));
            }
        });
        $A.enqueueAction(action);
	}
})