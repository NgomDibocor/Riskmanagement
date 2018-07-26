({
    doInit : function(component, event, helper){
        var action = component.get('c.findAll');
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log(state);
            if(state === 'SUCCESS'){
                component.set('v.assessments', response.getReturnValue());
                //alert(JSON.stringify(component.get('v.assessments')));
            } else {
                alert("l'élément n'a pas été chargé");
            }
        });
        $A.enqueueAction(action);
    },
	newAssessment : function(component, event, helper) {
        var evt = $A.get("e.c:OrmDisplayAssessmentEvt");
		evt.fire();
	}
})