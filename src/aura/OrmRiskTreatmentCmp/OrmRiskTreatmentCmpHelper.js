({
	refreshMeasureShow : function(component, event, idMeasure) {
        var actionOrgs = component.get("c.getMeasure");
        actionOrgs.setParams({
            "idMeasure": idMeasure
        });
        actionOrgs.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.measureData', response.getReturnValue());
                alert(JSON.stringify(response.getReturnValue()));
                var idAssessmentRisk = component.get('v.measureData');
                component.set('v.idAssessmentRisk', idAssessmentRisk.orm_assessmentRisk__c);
                component.set("v.displaySaveCancelBtn", false);
            } else {
                alert($A.get('$Label.c.orm_not_found'));
            }
        });

        var actionstatus = component.get("c.getSelectOptions");
        actionstatus.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'orm_measure_Status__c'
        });
        actionstatus.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.status', response.getReturnValue());
            } else { 
                alert($A.get('$Label.c.orm_not_found'));
            }
        });
        
        var actionUser = component.get("c.getUsers");
        actionUser.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allUser', response.getReturnValue());
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        $A.enqueueAction(actionOrgs);
        $A.enqueueAction(actionUser);
        $A.enqueueAction(actionstatus);
	}
})