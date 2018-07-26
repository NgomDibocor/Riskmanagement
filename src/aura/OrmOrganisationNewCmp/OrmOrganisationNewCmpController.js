({
	
    doInit: function(component, event, helper) {
        
        var actionRegion = component.get("c.getSelectOptions");
        actionRegion.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_region__c'});
        actionRegion.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.regions', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionPays = component.get("c.getSelectOptions");
        actionPays.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_pays__c'});
        actionPays.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.lespays', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionSector = component.get("c.getSelectOptions");
        actionSector.setParams({"objObject": component.get("v.objInfo"), "fld": 'Industry'});
        actionSector.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allIndustrySector', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionCurrency = component.get("c.getSelectOptions");
        actionCurrency.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_currency__c'});
        actionCurrency.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allCurrency', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });

        $A.enqueueAction(actionRegion);
        $A.enqueueAction(actionPays);
        $A.enqueueAction(actionSector);
        $A.enqueueAction(actionCurrency);
    },
     
    onChangeRegion : function(component, event, helper)
    {
    	component.find("region").set("v.value", event.getSource().get("v.value"));
	},
    onChangePays : function(component, event, helper)
    {
    	component.find("pays").set("v.value", event.getSource().get("v.value")); 
	},
    onChangeCurrency : function(component, event, helper)
    {
    	component.find("currency").set("v.value", event.getSource().get("v.value")); 
	},
    onChangeIndSector : function(component, event, helper)
    {
    	component.find("industrySector").set("v.value", event.getSource().get("v.value")); 
	},
    createItem: function(component, event, helper) {

        var newItem = component.get("v.item");
	    var regionField = component.find("region");
        newItem.orm_region__c  = regionField.get("v.value");
        var paysField = component.find("pays");
		newItem.orm_pays__c  = paysField.get("v.value");
        var currencyField = component.find("currency");
		newItem.orm_currency__c  = currencyField.get("v.value");
        var indSectorField = component.find("industrySector");
		newItem.Industry  = indSectorField.get("v.value");

        if ($A.util.isEmpty(newItem.Name)) {
            alert("le libellé ne peut être null, veuillez selectionner une valeur");
        } else {
            var action = component.get('c.add');
            action.setParams({
                "item": newItem
            });
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state == "SUCCESS") {
                    // publier evenement creation
                    var evt = $A.get("e.c:eventNewOrganisationCreated");
                    evt.fire();
                    component.set("v.item",{
                        'sobjectType' : 'Account',
						'Name':'',
						'orm_region__c':'',
						'orm_pays__c':'',
						'Description':''
						
					});
                    component.set("v.isOpen", false);
                }
            });
            $A.enqueueAction(action);
      }
        
    },
    
    
    
})