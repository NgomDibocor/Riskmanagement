({
    doInit : function(component, event, helper){
        var action = component.get('c.getAssessmentRisks');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var custs = [];
                var conts = response.getReturnValue();
                for(var idAss in conts){
                    custs.push({value:conts[idAss]});
                }
                component.set("v.assessments", custs);
                
            } else {
                alert("l'élément n'a pas été chargé");
            }
        });
        $A.enqueueAction(action);
    },
	newAssessment : function(component, event, helper) {
        var evt = $A.get("e.c:OrmDisplayAssessmentEvt");
		evt.fire();
	},
	
	showAssessment : function(component, event, helper) {
        //var evt = $A.get("e.c:OrmDisplayAssessmentEvt");
		//evt.fire();
		alert('show this assessment')
	},
})