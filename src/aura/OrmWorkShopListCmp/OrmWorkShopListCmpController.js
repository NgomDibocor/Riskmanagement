({
	     initRecords: function(component, event, helper) {
    
      // call the apex class method and fetch activity list  
         var action = component.get("c.findWorkshopByAssessment");
       var assmntDataId=component.get('v.assessmentData').Id;
        var assmntDataOrganisation=component.get('v.assessmentData').orm_organisation__c;
        action.setParam('asssessment',assmntDataId);
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set WorkshopList list with return value from server.
                  component.set("v.WorkshopList", storeResponse);
                   component.set("v.storeListWorkshop", storeResponse);
                  
              }
        });
        $A.enqueueAction(action);
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
    
    openNewWorkshop : function(component, event, helper){
                
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
        	var evt = $A.get("e.c:OrmNewWorkShopEvt");
			evt.setParams({
			   "Assessmentdata" : component.get("v.assessmentData")
			});
			evt.fire();
        }
    },
    
     openNewContact : function(component, event, helper){
                
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
        	var evt = $A.get("e.c:OrmNewContactEvt");
			evt.setParams({
			   "Assessmentdata" : component.get("v.assessmentData")
			});
			evt.fire();
        }
    },
      
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description search filter 
 * @history 
 * 2018-08-24 : Salimata NGOM - Implementation
 */
    filter : function (component, event, helper){
    	var ListWorkshop = component.get('v.storeListWorkshop');
    	var data = ListWorkshop;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refreshList(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 	
        	 		// filter checks each row, constructs new array where function returns true
        	 		data=ListWorkshop.filter(row => regex.test(row.Name) || 
        	 		regex.test(row.CompanySignedDate) || 
        	 		regex.test(row.Description) ||  
        	 		regex.test(row.StartDate) || regex.test(row.orm_Contract_End_Date__c));
		        } catch (e) {
		    	   alert(e)
		        }
		        
		   component.set("v.WorkshopList", data);
         }        	
    },
   
})