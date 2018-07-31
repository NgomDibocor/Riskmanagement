({
	/* @CreatedBy: laye
	 * @Description: method for initialize the compeonents
	 */
	doInit : function(component, event, helper) {
        var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.activity"), 'fld' : 'orm_activityStatus__c'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allStatus', response.getReturnValue());
            } else {
                alert("the element was not found");
            }
        });
        $A.enqueueAction(action);        
	},
	
	/* @CreatedBy: laye
	 * @Description: method for opening the compeonents
	 */
    openCurrentCmp : function(component, event){
        component.set("v.isOpen", true);
        component.set('v.assessmentId', event.getParam('idAssessment'));
	},
    
    /* @CreatedBy: laye
	 * @Description: method for adding an activity
	 */
    createItem : function(component, event, helper) {
        var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');
        var status = component.find('status').get('v.value');
        var startDate = component.find('startDate').get('v.value');
        var endDate = component.find('endDate').get('v.value');
        
        var isItemsValid = true;
        if($A.util.isEmpty(name) || $A.util.isEmpty(description) || $A.util.isEmpty(status)  
        		|| $A.util.isEmpty(startDate) || $A.util.isEmpty(endDate)){
            isItemsValid = false;           
        }
        
        if(isItemsValid){
            var newActivity = component.get('v.activity');
            newActivity.Name = name;
            newActivity.orm_description__c = description;
            newActivity.orm_activityStatus__c = status;
            newActivity.orm_startDate__c = startDate;
            newActivity.orm_endDate__c = endDate;
            //newActivity.orm_user__c = component.get('v.user');
            newActivity.orm_assessment__c = component.get('v.assessmentId');
            
            var action = component.get('c.add');
            action.setParams({
                "item": newActivity
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if ( state == "SUCCESS") {
                   alert("ajout réussie");
                   var evt = $A.get("e.c:OrmActivityCreatedEvt");
				   evt.fire();
                   helper.closeModal(component);
                   component.set('v.activity', {        	'sobjectType' : 'Assessment__c',
                                                             'Name' : '',
                                                             'orm_description__c' : '',
                                                             'orm_activityStatus__c' : '',
                                                             'orm_endDate__c' : '',
                                                             'orm_startDate__c' : '',
                                                             'orm_user__c' : '',
                                                             'orm_assessment__c' : ''
                                                         });
                } else {
                    alert("ERROR");
                }
            });            
            $A.enqueueAction(action);
        } else {
			 alert("No Field Should be Empty");
		}
    }    
})