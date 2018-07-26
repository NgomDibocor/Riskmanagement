({
	afterRender: function (component, helper) {
	    this.superAfterRender();
        /*var item = component.get('v.item');
        alert(item);
        component.find("region").set("v.value", item.orm_region__c);*/
         var action = component.get('c.getOrganisation');
    
        action.setParam('id', component.get("v.id"));
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                var item = response.getReturnValue();
                component.set('v.item', item);
                component.find("region").set("v.value", item.orm_region__c);
                component.find("pays").set("v.value", item.orm_pays__c);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
       $A.enqueueAction(action);       
	}
})