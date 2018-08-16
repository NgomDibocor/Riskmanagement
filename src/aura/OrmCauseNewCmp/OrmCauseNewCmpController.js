({
	/** @author: Laye
	 *  @date: Creation: 27/07/2018
	 *  @description: method for initializing the component */
	doInit : function(component, event, helper) {
		
	},
	
	/** @author: Laye
	 *  @date: Creation: 27/07/2018
	 *  @description: method for opening the component and initilizing its attributes */
	openOrmCauseNewCmp : function(component, event, helper) {
		component.set("v.isOpen", true);
        //component.set('v.idAssessmentRisk', event.getParam('idAssessmentRisk'));
	},
	
	/** @author: Laye
	 *  @date: Creation: 27/07/2018
	 *  @description: method for creating a cause */
	createItem : function(component, event, helper){
		//var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');
        
        /* we test the validity of data */
        var isItemsValid = true;
        if($A.util.isEmpty(description)){
            isItemsValid = false;           
        }
        
        if(isItemsValid){
        	var newCause = component.get('v.cause');
        	newCause.Name = 'XXXX';
        	newCause.Description = description;
        	newCause.orm_assessmentRisk__c = component.get("v.idAssessmentRisk");
        	
        	var action = component.get('c.add');
            action.setParams({
                "item": newCause
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
                    component.set('v.cause', { 'sobjectType' : 'Macro',
                                               'Description' : '',
                                               'orm_assessmentRisk__c' : ''
                    });
                   var evt = $A.get("e.c:OrmCauseCreatedEvt");
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