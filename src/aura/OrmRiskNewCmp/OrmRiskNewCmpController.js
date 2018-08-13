({
	doInit : function(component, event, helper) {
        var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.risk"), 'fld' : 'orm_categorieRisk__c'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allCategorieRisk', response.getReturnValue());
            } else {
                  var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'the element was not found',
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
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
                	newItem = response.getReturnValue();
                    var newAssessmentRisk = component.get("v.assessmentRisk");
                    newAssessmentRisk.orm_assessment__c =  component.get("v.idAssessment");
                    newAssessmentRisk.orm_Risk__c = newItem.Id;
                    var actionRisk = component.get('c.addAssessmentRisk');
                      actionRisk.setParams({
                    	  "item": newAssessmentRisk
                       });
                       actionRisk.setCallback(this, function(response) {
		                var stateRisk = response.getState();
		                if (component.isValid() && stateRisk == "SUCCESS") {
		               var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'successful association',
			           'type' : 'success',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
		                }
		                else
		                {
		                var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'failed association',
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
		                }
		                });
		                $A.enqueueAction(actionRisk);
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
                   var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'successful association',
			           'type' : 'success',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
                     }
                  else { 
                   var toast = $A.get('e.force:showToast');
                    	toast.setParams({
			           'message' : 'failed association',
			           'type' : 'warning',
			           'mode' : 'dismissible'
                    	});	
                    	toast.fire();
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
    	component.set("v.idAssessment", event.getParam("idAssessment"));
	},
	
})