({
	 doInit : function(component, event, helper) {
		
        /*var action = component.get('c.getOrganisation');
    
        action.setParam('id', component.get("v.id"));
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                var item = response.getReturnValue();
                component.set('v.item', item);
                component.find("region").set("v.value", item.orm_region__c);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
       $A.enqueueAction(action);
       helper.fetchPicklist(component, event);*/
       helper.fetchPicklist(component, event);
	},
    
    editItem : function(component, event, helper) {
        var newItem = component.get("v.item");
		var nomField = component.find("nom");
		newItem.Name = nomField.get("v.value");
		var descriptionField = component.find("description");
		newItem.Description = descriptionField.get('v.value');
        var regionField = component.find("region");
        alert(regionField.get("v.value"));
		newItem.orm_region__c  = regionField.get("v.value");
        var paysField = component.find("pays");
		newItem.orm_pays__c  = paysField.get("v.value");
        var action = component.get('c.editOrganisation');
        alert(JSON.stringify(newItem));
        action.setParam("item", newItem);
        
        action.setCallback(this, function(response)
        {
				var state = response.getState();
				if (state === "ERROR") 
                {
					alert("ERROR");
                    
				} else
                {
                  alert("VALIDE"); 
                }
        });
        $A.enqueueAction(action);
    },
    
    onChange : function(component, event, helper)
    {
    	component.find("region").set("v.value", event.getSource().get("v.value"));
	},
     onChange2 : function(component, event, helper)
    {
    	component.find("pays").set("v.value", event.getSource().get("v.value")); 
	}
    
})