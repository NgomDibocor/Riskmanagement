({

		doInit:function(component, event, helper){
		helper.refreshList(component, event);
		},
		
	    openNewAssumption : function(component, event, helper){
                
        var idAssessment = component.get("v.assessmentData").Id;
        if(idAssessment == null){
        	//alert("check if you have created the assessment");
        	var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : $A.get("$Label.c.orm_toast_warning"),
                'type' : 'warning',
                'mode' : 'dismissible'
            });

            toast.fire();
        } else {
        	var evt = $A.get("e.c:OrmNewAssumptionClickedEvt");
			evt.setParams({
			   "Assessmentdata" : component.get("v.assessmentData")
			});
			evt.fire();
        }
    },
       Save: function(component, event, helper) {
      // Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)){
              // call the saveAssumption apex method for update inline edit fields update 
               var action = component.get("c.saveAssumption");
                  action.setParams({
                    'listAssumption': component.get("v.assumptionList")
                  });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    // set assumptionList list with return value from server.
                        console.log(JSON.stringify(storeResponse));
                    component.set("v.assumptionList", storeResponse);
                    		var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : $A.get("$Label.c.orm_updated"),
                'type' : 'success',
                'mode' : 'dismissible'
            });      
            toast.fire();  
                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
                    component.set("v.showSaveCancelBtn",false);
                  
                }
            });
            $A.enqueueAction(action);
        } 
    },
   cancel : function(component,event,helper){
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        $A.get('e.force:refreshView').fire(); 
    },
    
     /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description search filter 
 * @history 
 * 2018-08-30 : Salimata NGOM - Implementation
 */
    filter : function (component, event, helper){
    	var ListAssumption = component.get('v.storeAssumptionList');
    	var data = ListAssumption;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refreshList(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 	
        	 		// filter checks each row, constructs new array where function returns true
        	 		data=ListAssumption.filter(row => regex.test(row.Name));
		        } catch (e) {
		    	   alert(e)
		        }
		        
		   component.set("v.assumptionList", data);
         }        	
    },
    
})