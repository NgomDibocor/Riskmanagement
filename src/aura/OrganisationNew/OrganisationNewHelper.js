({
	ListTestOrg : function(component, event,helper) {
        var action4= component.get("c.getTestOrganisations");
        action4.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.testsorganisation', response.getReturnValue());
               
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
            $A.enqueueAction(action4);
	},
    getSelectedItem : function(component, event) {

		var index = event.target.dataset.index;
		var items = component.get("v.testorganisation");
		var selectedItem = items[index];
		
		return selectedItem;
	}
})