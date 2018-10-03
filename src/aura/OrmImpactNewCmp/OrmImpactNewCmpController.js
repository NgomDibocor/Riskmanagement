({
	/** @author: David
	 *  @date: Creation: 28/08/2018
	 *  @description: method for opening the component and initilizing its attributes */
	openOrmImpactNewCmp : function(component, event, helper) {
		component.set("v.isOpen", true);
        component.set('v.idAssessmentRisk', event.getParam('idAssessmentRisk'));
        
         var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.impact"), 'fld' : 'orm_categorie_impact__c'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allCategorieImpact', response.getReturnValue());
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
	},
	  onChange2 : function(component, event, helper)
	    {
	    	component.find("categorieImpact").set("v.value", event.getSource().get("v.value")); 
		},
	
	/** @author: David
	 *  @date: Creation: 28/08/2018
	 *  @description: method for creating a cause */
	createItem : function(component, event, helper){
		var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');
        var categorieImpact = component.find('categorieImpact').get('v.value');
        var categoryImpact = component.get("v.categorieImpact");
        /* we test the validity of data */
        var isItemsValid = true;
        if($A.util.isEmpty(description)){
            isItemsValid = false;           
        }
        
        if(isItemsValid){
        	var newImpact = component.get('v.impact');
        	newImpact.Name = name ;
        	newImpact.Description = description;
        	newImpact.orm_categorie_impact__c = categorieImpact;
        	newImpact.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
        	
        	if ($A.util.isEmpty(categorieImpact)) {
                newImpact.orm_categorie_impact__c = categoryImpact;
            } else {
                component.set("v.categorieImpact", categorieImpact);
                newImpact.orm_categorie_impact__c = component.get("v.categorieImpact");
            }
        	
        	var action = component.get('c.add');
            action.setParams({
                "item": newImpact
            });
            action.setCallback(this, function(response) {
            	if(response.getState() == 'SUCCESS'){
            		var newCause = response.getReturnValue();
            		var toast = $A.get('e.force:showToast');
            		toast.setParams({
			           'message' : $A.get('$Label.c.new_title_labels')+ ' ' 
			           		+ $A.get('$Label.c.orm_label_cause') + ' '
			           		+ $A.get('$Label.c.orm_toast_success'),
			           'type' : 'success',
			           'mode' : 'dismissible'
		            });	
		            toast.fire();
                    component.set('v.impact', { 'sobjectType' : 'Macro',
                                               'Description' : '',
                                               'Name':'',
                                               'orm_categorie_impact__c':'',
                                               'orm_assessmentRisk__c' : ''
                    });
                    var evt = $A.get("e.c:OrmImpactCreatedEvt");
                   evt.fire();
                   component.set("v.isOpen", false);
            	} else {
            		var toast = $A.get('e.force:showToast');
            		toast.setParams({
			           'message' : $A.get('$Label.c.orm_error'),
			           'type' : 'error',
			           'mode' : 'dismissible'
		            });	
		            toast.fire();
            	}
            });
            $A.enqueueAction(action);
             component.set('v.impact', {'sobjectType' : 'Macro',
                                                             'Name' : '',
                                                             'Description' : '',
                                                      		 'orm_categorie_impact__c': '',
                                                             'orm_assessmentRisk__c' : ''
                                                         });
        	
        } else {
        	var toast = $A.get('e.force:showToast');
        	toast.setParams({
			   'message' : $A.get("$Label.c.orm_error_field_empty"),
			   'type' : 'error',
			   'mode' : 'dismissible'
		    });	
		    toast.fire();
        }
	}
})