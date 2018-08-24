({
	
    
     doInit: function(component, event, helper) {
    
      // call the apex class method and fetch activity list  
         var action = component.get("c.findAllActivity");
       // var assmntDataId=component.get('v.assessmentData').Id;
        // alert('assesmment= '+assmntDataId);
        // var assmntDataId='a051H00000aQvq3QAC';
        // action.setParam('assessmt',assmntDataId);
             action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                  var storeResponse = response.getReturnValue();
                  console.log(JSON.stringify(storeResponse));
               // set ActivityList list with return value from server.
                  component.set("v.ActivityList", storeResponse);
                  component.set("v.storeListActivity", storeResponse);
                  alert(JSON.stringify(storeResponse));
              }
        });
        $A.enqueueAction(action);
         // set deafult count and select all checkbox value to false on load 
    component.set("v.selectedCount", 0);
    component.find("box3").set("v.value", false);
    },  
       openActivityNewCmp : function(component, event, helper){
                
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
        	var evt = $A.get("e.c:OrmOpenNewActivityCmpEvt");
			evt.setParams({
			   "idAssessment" : idAssessment
			});
			evt.fire();
        }
    },
    Save: function(component, event, helper) {
      // Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)){
              // call the saveActivity apex method for update inline edit fields update 
               var action = component.get("c.saveActivity");
                  action.setParams({
                    'lstActivity': component.get("v.ActivityList")
                  });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    // set ActivityList list with return value from server.
                        console.log(JSON.stringify(storeResponse));
                    component.set("v.ActivityList", storeResponse);
                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
                    component.set("v.showSaveCancelBtn",false);
                    alert('Updated...');
                }
            });
            $A.enqueueAction(action);
        } 
    },
    
    cancel : function(component,event,helper){
       // on cancel refresh the view
        $A.get('e.force:refreshView').fire(); 
    },
    removeActivity:function(component,event,helper){
    //is checked delete activity show popup  message confirmation
    component.set("v.showConfirmRemoveActivity",true);
    
    },
    closeModalRemove:function(component,event,helper){
    component.set("v.showConfirmRemoveActivity",false);
    },
    
    removeActSelected: function(component,event,helper){
    component.set("v.showConfirmRemoveActivity",false);
    //fire event to childActivityList
  
		var evt = $A.get("e.c:OrmRemoveRecordActivityEvnt");
	/*
		evt.setParams({
			"countSelected" :component.get("v.selectedCount") 
		});*/
		evt.fire();
    },
    
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description search filter 
 * @history 
 * 2018-08-20 : Salimata NGOM - Implementation
 */
    filter : function (component, event, helper){
    	//alert('on filtre');
    	var ListActivity = component.get('v.storeListActivity');
    	var data = ListActivity;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refreshList(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		data=ListActivity.filter(row => regex.test(row.Name) || 
        	 		regex.test(row.orm_activityStatus__c) || 
        	 		regex.test(row.orm_description__c) ||  
        	 		regex.test(row.orm_startDate__c) );
		        } catch (e) {
		    	   alert(e)
		        }
		        
		   component.set("v.ActivityList", data);
         }        	
    }
 
})