({
	
    doInit: function(component, event, helper) {
        
        var action2 = component.get("c.getSelectOptions");
        action2.setParams({"objObject": component.get("v.item"), "fld": 'orm_region__c'});
         
        action2.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.regions', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var action3 = component.get("c.getSelectOptions");
        action3.setParams({"objObject": component.get("v.item"), "fld": 'orm_pays__c'});
         
        action3.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.lespays', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
         var action4= component.get("c.getTestOrganisations");
         
        action4.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.testsorganisation', response.getReturnValue());
                var testorgresp=response.getReturnValue();
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
         $A.enqueueAction(action2);
          $A.enqueueAction(action3);
         $A.enqueueAction(action4);
    },
    openModal : function(component, event, helper) {
		// for Display Model,set the "isOpen" attribute to "true"
		component.set("v.isOpen", true);
	},

	closeModal : function(component, event, helper) {
		// for Hide/Close Model,set the "isOpen" attribute to "Fasle"
		component.set("v.isOpen", false);
	},
    saveTestOrg:function(component, event, helper) {
    //var newTestOrg = component.get('v.testorganisation');            
        var nomfield=component.find("nameid");
       var nom =nomfield.get("v.value");
           var isItemValid = true;
         // alert(JSON.stringify(newTestOrg));
        
        if ($A.util.isEmpty(nom)) {
            isItemValid = false;
         
        } 
        if (isItemValid) {
            var newTestOrg = component.get("v.testorganisation");
				      newTestOrg.Name=nom;      
            var action = component.get('c.addTestOrg');
            action.setParams({
                "item": newTestOrg
            });
               action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state == "SUCCESS") {
                    // publier evenement creation
                    var evt = $A.get("e.c:evntAddTestOrg");
                            evt.fire();
                

                    component.set("v.item",{
                        'sobjectType':'ormtestOrganisation__c',
                        'Name':''
                    });
                }
            });
            $A.enqueueAction(action);

        } else {
            alert("ajout échouée");
        }
        component.set("v.isOpen", false);
        
        },
    refreshListTestOrg:function(component, event, helper) {
        helper.ListTestOrg(component, event);
    },
    onChange : function(component, event, helper)
    {
    	component.find("region").set("v.value", event.getSource().get("v.value"));
	},
     onChange2 : function(component, event, helper)
    {
    	component.find("pays").set("v.value", event.getSource().get("v.value")); 
	},
      createItem: function(component, event, helper) {

        var newItem = component.get("v.item");
         var testorgField=component.find('testOrgId');
         //var eltselected= helper.getSelectedItem(component,event);
	//.component.set('v.testorganisation',eltselected.Id);
        newItem.testOrganisation__c = testorgField.get("v.value");
	var regionField = component.find("region");
      		newItem.orm_region__c  = regionField.get("v.value");
        var paysField = component.find("pays");
		newItem.orm_pays__c  = paysField.get("v.value");
		alert(JSON.stringify(newItem));
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
						'testOrganisation__c':'',
						'Description':''
						
					});
                }
            });
        
            $A.enqueueAction(action);
      }
        
    }
    
    
})