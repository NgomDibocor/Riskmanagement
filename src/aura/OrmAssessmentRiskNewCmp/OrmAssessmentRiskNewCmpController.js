({
	    saveRisk:function(component, event, helper) {
        var nomfield=component.find("assessmentRisk");
       var nom =nomfield.get("v.value");
           var isItemValid = true;
        if ($A.util.isEmpty(nom)) {
            isItemValid = false;
        } 
        if (isItemValid) {
            //var idAssessment=component.get("v.assessmentData").Id;
          	var  idAssessment="a051H00000aQvjWQAS";
            var idRisk="0JZ1H000000mgYBWAY";
            var newAssessmentRisk = component.get("v.item");
				      	newAssessmentRisk.Name=nom;
            			newAssessmentRisk.orm_assessment__c= idAssessment;
            			newAssessmentRisk.orm_Risk__c=idRisk 
            var action = component.get('c.add');
            action.setParams({
                "item": newAssessmentRisk
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                alert(state);
                if ( state == "SUCCESS") {
                   alert("ajout réussie");
                    var evt = $A.get("e.c:EventAddAssessmentRisk");
					evt.fire();
                } else {
                    alert("ajout échouée");
                }
            });
            $A.enqueueAction(action);			
        } 
    }
})