({
	refreshList : function(component, event) 
	{
	var action = component.get('c.getAllMeasure');
	 action.setParam('idAssessment',component.get("v.idAssessment"));
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
            //console.log(JSON.stringify(response.getReturnValue()));
            	//Hide the Spinner
            		component.set('v.assessmentRisks', response.getReturnValue());
            		console.log(JSON.stringify(component.get("v.assessmentRisks")));
                //end pagination
            }else
            {
                 alert($A.get("$Label.c.loaded_message"));
            }
        });
        $A.enqueueAction(action);
	}
})