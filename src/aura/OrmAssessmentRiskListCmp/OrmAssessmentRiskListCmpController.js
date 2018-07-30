({
	refreshList : function(component, event, helper) {
		helper.refreshList(component, event);
	},
    doInit : function(component, event, helper)
    {
        helper.refreshList(component, event);
        var action = component.get('c.findAll');
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                component.set('v.assessmentRisks', response.getReturnValue());
                alert(JSON.stringify(response.getReturnValue()));
                console.log(response.getReturnValue());
            }
            else
            {
                alert("l'élément n'a pas été chargé");
            }
        });
        $A.enqueueAction(action);
    },
    
})