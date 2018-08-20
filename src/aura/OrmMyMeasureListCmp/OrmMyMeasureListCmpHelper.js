({
	refreshList : function(component, event) {
		var action = component.get('c.getAllMeasures');
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
              component.set('v.myMeasure', response.getReturnValue());
                   alert(JSON.stringify(response.getReturnValue()));
            }else
            {
                 alert($A.get("$Label.c.loaded_message"));
            }
        });
        $A.enqueueAction(action);
	}
})