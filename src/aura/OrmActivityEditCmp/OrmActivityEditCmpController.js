({
    doInit: function(component, event, helper) {
        var action = component.get('c.getSelectOptions');
        action.setParams({
            'objObject': component.get("v.objInfo"),
            'fld': 'orm_activityStatus__c'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS' && component.isValid()) {
                component.set('v.allStatus', response.getReturnValue());
            } else {
                alert("the element was not found");
            }
        });
        $A.enqueueAction(action);
    },
    openCurrentCmp: function(component, event) {
        component.set("v.isOpen", true);
        component.set('v.assessmentId', event.getParam('idAssessment'));
        component.set('v.idActivity', event.getParam('idActivity'));
        var actionActivity = component.get("c.findActivity");
        actionActivity.setParams({
            "activityId": component.get("v.idActivity")
        });
        actionActivity.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                component.set('v.activityData', response.getReturnValue());
            } else {
                alert($A.get('$Label.c.orm_not_found'));
            }
        });
        $A.enqueueAction(actionActivity);

    },
    /** @author: David
     *  @date: Creation: 31/08/2018
     *  @description: method for creating a activity */
    editActivity: function(component, event, helper) {
        var name = component.find('name').get('v.value');
        var description = component.find('description').get('v.value');
        var status = component.find('status').get('v.value');
        var startDate = component.find('startDate').get('v.value');
        var endDate = component.find('endDate').get('v.value');
        var activityData = component.get('v.activityData');
        var activityStatus =  component.get('v.activityData').orm_activityStatus__c;
        if ($A.util.isEmpty(status)) {
                activityData.orm_activityStatus__c = activityStatus;
            } else {
                activityData.orm_activityStatus__c = status;
            }
        activityData.Name = name;
        activityData.orm_description__c = description;
        activityData.orm_startDate__c = startDate;
        activityData.orm_endDate__c = endDate;
        var action = component.get('c.updateActivity');
        action.setParams({
            "activity": activityData
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                component.set("v.activityData", response.getReturnValue());
                var toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({
                    'message': $A.get('$Label.c.orm_success_created'),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toastEvent.fire();
                var evt = $A.get("e.c:OrmActivityCreatedEvt");
                evt.fire();
                component.set("v.isOpen", false);

            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(action);
    },
    	onChange : function(component, event, helper) {
	    	component.find("status").set("v.value", event.getSource().get("v.value")); 
	},
})