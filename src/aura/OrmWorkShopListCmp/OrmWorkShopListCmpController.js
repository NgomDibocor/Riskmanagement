({
	     initRecords: function(component, event, helper) {
    
      // call the apex class method and fetch activity list  
         var action = component.get("c.findWorkshopByAssessment");
       var assmntDataId=component.get('v.assessmentData').Id;
        // alert('assesmment= '+assmntDataId);
        // var assmntDataId='a051H00000aQvq3QAC';
        action.setParam('asssessment',assmntDataId);
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set WorkshopList list with return value from server.
                  component.set("v.WorkshopList", storeResponse);
              }
        });
        $A.enqueueAction(action);
         // set deafult count and select all checkbox value to false on load 
   // component.set("v.selectedCount", 0);
   // component.find("box3").set("v.value", false);
    },  
        Save: function(component, event, helper) {
      // Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)){
              // call the saveWorkshop apex method for update inline edit fields update 
               var action = component.get("c.saveWorkShop");
                  action.setParams({
                    'lstWorkshop': component.get("v.WorkshopList")
                  });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    // set WorkshopList list with return value from server.
                        console.log(JSON.stringify(storeResponse));
                    component.set("v.WorkshopList", storeResponse);
                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
                    component.set("v.showSaveCancelBtn",false);
                    alert('Updated...');
                }
            });
            $A.enqueueAction(action);
        } 
    },
   cancel : function(component,event,helper){
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        $A.get('e.force:refreshView').fire(); 
    },
    
    openNewWorkshop : function(component, event, helper){
                
        var idAssessment = component.get("v.assessmentData").Id;
        if(idAssessment == null){
        	//alert("check if you have created the assessment");
        	var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : 'Check if you Have Created the Assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
            });

            toast.fire();
        } else {
        	var evt = $A.get("e.c:OrmNewWorkShopEvt");
			evt.setParams({
			   "Assessmentdata" : component.get("v.assessmentData")
			});
			evt.fire();
        }
    },
})