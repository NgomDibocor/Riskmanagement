({
	refreshList : function(component, event) {
		var actionstatus = component.get("c.getSelectOptions");
        actionstatus.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'orm_measureCategorie__c'
        });
        actionstatus.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.measureCategorie', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(actionstatus);
	}
})