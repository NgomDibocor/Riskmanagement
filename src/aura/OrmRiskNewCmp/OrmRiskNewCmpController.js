({
	doInit : function(component, event, helper) {
	/*component.set("v.idAssessment", event.getParam("assessment"));*/
	    alert(component.get('v.idAssessment'));
        var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.risk"), 'fld' : 'orm_categorieRisk__c'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allCategorieRisk', response.getReturnValue());
            } else {
                alert("the element was not found");
            }
        });
        $A.enqueueAction(action);
        //helper.openCurrentCmp(component, event);
	},
     createItem:function(component, event, helper) {
        var newItem = component.get("v.risk");
        var nameRisk=component.find("Name");
        newItem.Name =nameRisk.get("v.value");
        var descriptionRisk = component.find("description");
        newItem.Description = descriptionRisk.get("v.value"); 
        var categorieRisk= component.find("categorieRisk");
        newItem.orm_categorieRisk__c= categorieRisk.get("v.value");
        var isItemValid = true;
        if ($A.util.isEmpty(nameRisk)) {
            isItemValid = false;
        } 
        if (isItemValid) { 
            var action = component.get('c.add');
            action.setParams({
                "item": newItem
            });
               action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state == "SUCCESS") {
                    // publier evenement creation
                    var evt = $A.get("e.c:OrmRiskCreatedEvt");
				   	evt.fire();   
                    helper.closeModal(component);
                    component.set('v.risk', {'sobjectType' : 'Macro',
                                                             'Name' : '',
                                                             'Description' : '',
                                                      		 'orm_assessment__c': '',
                                                             'orm_categorieRisk__c' : ''
                                                         });
                    alert("successful addition");
                     }
                  else {
                alert("failed addition");
                  }
            });
            $A.enqueueAction(action);
        }
        },
         onChange2 : function(component, event, helper)
    {
    	component.find("categorieRisk").set("v.value", event.getSource().get("v.value")); 
	},
	  openModal: function(component, event, helper)
    {
    	component.set("v.isOpen", true); 
    	component.set("v.idAssessment", event.getParam('assessment'));
	},
	
})