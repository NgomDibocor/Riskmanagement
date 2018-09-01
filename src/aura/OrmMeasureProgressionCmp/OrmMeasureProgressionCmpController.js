({
/**
 *
 * @author David diop
 * @version 1.0
 * @description method doInit
 * @history 
 * 2018-08-31 : David diop - Implementation
 */
    measureProgression: function(component, event, helper) {
       // helper.fetchPicklist(component, event, event.getParam('MeasureId'));
        component.set("v.idMeasure", event.getParam('MeasureId'));
		helper.getAllMeasuresProgressionByMeasure(component, event);
    },
    openMeasureProgressionNew : function(component, event, helper){
        var IdMeasure = component.get("v.idMeasure");
        var evt = $A.get("e.c:OrmNewMeasureProgressionClickedEvt");
        evt.setParams({
            "idMeasure": IdMeasure
        });
		evt.fire();
    },
    refreshList : function(component, event, helper) {
		helper.getAllMeasuresProgressionByMeasure(component,event);
	},
	cancel : function(component,event,helper) {
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
       component.set("v.showSaveCancelBtn",false);
    },
    save: function(component, event, helper) {
		if (helper.requiredValidation(component, event)){
              // call the saveAccount apex method for update inline edit fields update 
               var action = component.get("c.updateMeasureProgressions");
               action.setParams({
            	   'measureProgression': component.get("v.measureProgression")
               });
                  
	           action.setCallback(this, function(response) {
	               var state = response.getState();
	               if (state === "SUCCESS") {
	                    var measuresProgressions = response.getReturnValue();
	                    // set cause list with return value from server.
	                    component.set("v.measureProgression", measuresProgressions);
	                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
	                    component.set("v.showSaveCancelBtn", false);
	                    var toast = $A.get('e.force:showToast');
			            toast.setParams({
			            	'message' : $A.get('$Label.c.orm_updated'),
			                'type' : 'success',
			                'mode' : 'dismissible'
			            });	
			            toast.fire();
			       }
	           });
	           $A.enqueueAction(action);
        } 
        }, 
})