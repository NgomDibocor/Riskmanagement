({
	 fetchPicklist : function(component, event) {        
        var action = component.get('c.getSelectOptions');
         var action2 = component.get('c.getSelectOptions');
        action.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_region__c'});
         
        action2.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_pays__c'});
       
         action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allRegions', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
         action2.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allPays', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(action);
        $A.enqueueAction(action2);
		
	}
})