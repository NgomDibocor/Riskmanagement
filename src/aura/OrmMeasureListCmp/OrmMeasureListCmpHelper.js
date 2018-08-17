({	
	requiredValidation : function(component,event) {
        // get all causes.. 	
        var allRecords = component.get("v.measures");
        var isValid = true;
        // play a for loop on all account list and check that account name is not null,   
        for(var i = 0; i < allRecords.length; i++) {
            if(allRecords[i].orm_description__c == null || allRecords[i].orm_description__c.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' Description is null' );
                isValid = false;
            }  
        }
        return isValid;
    },
    
	getAllMeasuresByAssessmentRisk : function(component, event) {	
		
        var action = component.get("c.getAllMeasuresByAssessmentRisk");
        action.setParam('idAssRisk', component.get("v.idAssessmentRisk"));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {   
            	component.set("v.measures ", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})