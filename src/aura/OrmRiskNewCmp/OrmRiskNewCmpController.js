({
	doInit : function(component, event, helper) {
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
        var nomfield=component.find("Name");
       newItem.Name =nomfield.get("v.value");
        var description = component.find("description");
        newItem.Description = description.get("v.value"); 
        var categorieRisk= component.find("categorieRisk");
        newItem.orm_categorieRisk__c= categorieRisk.get("v.value");
          var isItemValid = true;
        if ($A.util.isEmpty(nomfield)) {
            isItemValid = false;
        } 
        if (isItemValid) {
            //var idAssessment=component.get("v.assessmentData").Id;
         // var  idAssessment="a051H00000aQvjWQAS";
           //newItem.orm_assessment__c= idAssessment; 
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
                    alert("ajout réussie");
                     }
                  else {
                alert("ajout échouée");
                  }
            });
            $A.enqueueAction(action);
        }
        },
         onChange2 : function(component, event, helper)
    {
    	component.find("allCategorieRisk").set("v.value", event.getSource().get("v.value")); 
	}
})