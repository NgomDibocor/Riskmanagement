({
	/**
	 * @author: Salimata NGOM
	 * @date: Creation: 30/08/2018
	 * @description: method for opening the modal form
	 *               
	 */
	openModalAssumption : function(component, event, helper) {
	
		component.set("v.isOpen", true);
		component.set('v.assessmentData', event.getParam('Assessmentdata'));
		
	},
		
	/** @author: Salimata NGOM
	 *  @date: Creation: 30/08/2018
	 *  @description: method for creating new assumption
    */
	createItem : function(component, event, helper){
		var name = component.find('name').get('v.value');
            /* we test the validity of data */
        var isItemsValid = true;
        if($A.util.isEmpty(name)){
            isItemsValid = false;           
        }
        
        if(isItemsValid){
        	var newAssumption= component.get('v.assumption');
        	newAssumption.Name =name;
        	newAssumption.orm_assessment__c = component.get("v.assessmentData").Id;
        	
        	var action = component.get('c.add');
            action.setParams({
                "item": newAssumption
            });
            action.setCallback(this, function(response) {
            	if(response.getState() == 'SUCCESS'){
            		var newCause = response.getReturnValue();
            		var toast = $A.get('e.force:showToast');
            		toast.setParams({
			           'message' : $A.get('$Label.c.new_title_labels')+ ' ' 
			           		+ $A.get('$Label.c.orm_name_assumption') + ' '
			           		+ $A.get('$Label.c.orm_toast_success'),
			           'type' : 'success',
			           'mode' : 'dismissible'
		            });	
		            toast.fire();
                    component.set('v.assumption', { 'sobjectType' : 'Macro',
                                                'Name' : '',
														  'orm_assessment__c' : ''
                    });
                  var evt = $A.get("e.c:OrmAssumptionCreatedEvt");
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