({
	refresh : function(component, event) {	
		var idAssessmentRisk = component.get("v.idAssessmentRisk");
        var action = component.get("c.findAllPhaseByAssessmentRisk");
        action.setParam('idAssRisk', idAssessmentRisk);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            	var reslt=response.getReturnValue();
            	component.set('v.phasesList',reslt);
            	component.set('v.phasesTemp',reslt);
            }else{alert("bien");}
        });
        $A.enqueueAction(action);
	},
	requiredValidation : function(component, event) {
		// get all phase.. 	
        var allRecords = component.get("v.phasesList");
        var isValid = true;   
        for(var i = 0; i < allRecords.length; i++){
            if(allRecords[i].Description == null || allRecords[i].Description.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' phase is null' );
                isValid = false;
            }  
        }
        return isValid;
	},
})