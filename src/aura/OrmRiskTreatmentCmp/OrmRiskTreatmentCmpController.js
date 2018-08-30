({
/**
 *
 * @author David diop
 * @version 1.0
 * @description method doInit
 * @history 
 * 2018-08-24 : David diop - Implementation
 */
    measureShow: function(component, event, helper) {
        helper.fetchPicklist(component, event, event.getParam('MeasureId'));
        
    },
/**
 *
 * @author David diop
 * @version 1.0
 * @description method Update measure
 * @history 
 * 2018-08-24 : David diop - Implementation
 */
    updateMeasure: function(component, event, helper) {
        var idAssessmentRisk = component.get("v.idAssessmentRisk");
        var measureData = component.get("v.measureData");
        measureData.orm_assessmentRisk__c = idAssessmentRisk;

        var dateMeasure = component.find("dateMeasure");
        measureData.orm_startDate__c = dateMeasure.get("v.value");

        var endDateMeasure = component.find("endDateMeasure");
        measureData.orm_endDate__c = endDateMeasure.get("v.value");

        var statusMeasure = component.find("statusMeasure");
        measureData.orm_measure_Status__c = statusMeasure.get("v.value");

        var measureResponsable = component.find("measureResponsable");
        measureData.orm_measureResponsable__c = measureResponsable.get("v.value");
        
        var cost = component.find("cost");
        measureData.orm_measure_Cost__c = cost.get("v.value");

        var description = component.find("description");
        measureData.orm_description__c = description.get("v.value");

        var action = component.get('c.add');
        action.setParams({
            "item": measureData
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                component.set("v.measureData", response.getReturnValue());
                var toastEvent = $A.get('e.force:showToast');
                toastEvent.setParams({ 
                    'message': $A.get('$Label.c.orm_success_created'),
                    'type': 'success',
                    'mode': 'dismissible'
                });
                toastEvent.fire();
                component.set("v.displaySaveCancelBtn", false);
                
            } else {
                alert($A.get("$Label.c.orm_error"));
            }
        });
        $A.enqueueAction(action);
    },
 /**
 *
 * @author David diop
 * @version 1.0
 * @description method description fields startDate
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
    onStartDate: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
 /**
 *
 * @author David diop
 * @version 1.0
 * @description method description fields endDate
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
    onEndDate: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
 /**
 *
 * @author David diop
 * @version 1.0
 * @description method description fields status
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
    onChangeStatusMeasure: function(component, event, helper) {
        component.find("statusMeasure").set("v.value", event.getSource().get("v.value"));
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
    
     /**
 *
 * @author David diop
 * @version 1.0
 * @description method description fields status
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
    onChangeMeasureResponsable : function(component, event, helper) {
        component.find("measureResponsable").set("v.value", event.getSource().get("v.value"));
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
 /**
 *
 * @author David diop
 * @version 1.0
 * @description method description fields cost
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
    onCost: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
 /**
 *
 * @author David diop
 * @version 1.0
 * @description method description fields Description
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
    onDescription: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
        component.set("v.displaySaveCancelBtn", true);
    },
  /**
 *
 * @author David diop
 * @version 1.0
 * @description method cancel update measure
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
    cancel: function(component, event, helper) {
        component.set("v.displaySaveCancelBtn", false);
    },
})