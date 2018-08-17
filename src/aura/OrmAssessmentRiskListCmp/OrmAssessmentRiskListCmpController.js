({
	refreshList : function(component, event, helper) {
		helper.refreshList(component, event);
	},
    doInit : function(component, event, helper)
    {
       // helper.refreshList(component, event);
        var action = component.get('c.getAllAssessmentRisks');
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
              component.set('v.assessmentRisks', response.getReturnValue());
            }
           /* var state = response.getState();
             if(state === 'SUCCESS'){
                var custs = [];
                var conts = response.getReturnValue();
                for(var idAss in conts){
                    custs.push({value:conts[idAss]});
                }
                component.set("v.assessmentRisks", custs);
                
            }*/
            else
            {
                 alert($A.get("$Label.c.loaded_message"));
            }
        });
        $A.enqueueAction(action);
    },
    showAssessmentRisk : function(component, event, helper) {
    alert(JSON.stringify(component.get('v.assessmentRisks')));
    
	},
    
})