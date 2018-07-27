({
	 fetchPicklist : function(component, event) {   
        var actionOrgs = component.get("c.findAll");
        actionOrgs.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allRisk', response.getReturnValue());
               // alert(JSON.stringify(response.getReturnValue()));
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(actionOrgs);
	},
})