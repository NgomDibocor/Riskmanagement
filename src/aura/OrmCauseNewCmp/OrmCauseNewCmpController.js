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
		alert('capturé');
		component.set("v.isOpen", true);
        component.set('v.assessmentId', event.getParam('idAssessment'));
	},
	
	/** @author: Laye
	 *  @date: Creation: 27/07/2018
	 *  @description: method for creating a cause */
	createItem : function(component, event, helper){
		var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');
        
        /* we test the validity of data */
        var isItemsValid = true;
        if($A.util.isEmpty(name) || $A.util.isEmpty(description)){
            isItemsValid = false;           
        }
        
        if(isItemsValid){
        	var newCause = component.get('v.cause');
        	newCause.Name = name;
        	newCause.Description = description;
        	newCause.orm_assessmentRisk__c = "a001H00000kbj0vQAA";
        	
        	var action = component.get('c.add');
            action.setParams({
                "item": newCause
            });
            action.setCallback(this, function(response) {
            	if(response.getState() == 'SUCCESS'){
            		alert('SUCCESS');
            		helper.closeModal(component);
                    component.set('v.cause', {  'sobjectType' : 'Macro',
                                               'Name' : '',
                                               'Description' : '',
                                               'orm_assessmentRisk__c' : ''
                    });
                   
                   var evt = $A.get("e.c:OrmCauseCreatedEvt");
                   evt.fire();
            	} else {
            		alert('ERROR');
            	}
            });
            $A.enqueueAction(action);
        	
        } else {
        	alert('No Field should be Empty');
        }
	}
})