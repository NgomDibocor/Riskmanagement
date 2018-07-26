({
    doInit : function(component, event, helper) {
		
        var action = component.get('c.getOrganisation');
    
        action.setParam('id', component.get("v.id"));
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.organisation', response.getReturnValue());
               
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(action);
	}
	/*showDetails : function(component, event, helper) {

        var action = component.get('c.getOrganisation');
        action.setParam('id', event.getParam('id'));
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.organisation', response.getReturnValue());
               
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(action);
	}*/
})