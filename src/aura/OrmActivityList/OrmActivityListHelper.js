({
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method for check required field
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */
	requiredValidation : function(component, event) {
		// get all activity..
		var allRecords = component.get("v.ActivityList");
		var isValid = true;
		// play a for loop on all activity list and check that activty name is
		// not null,
		for (var i = 0; i < allRecords.length; i++) {
			if (allRecords[i].Name == null || allRecords[i].Name.trim() == '') {
				alert('Complete this field : Row No ' + (i + 1)
						+ ' Name is null');
				isValid = false;
			}
		}
		return isValid;
	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description refresh list activity
	 * @history 2018-08-20 : Salimata NGOM - Implementation
	 */
	refreshList : function(component, event) {
		var action = component.get('c.findActivityByAssessment');
		action.setParam("assessment", component.get("v.assessmentData").Id);
		action.setCallback(this, function(response) {
			if (response.getState() == 'SUCCESS') {
				//component.set('v.ActivityList', response.getReturnValue());
				
			} else {
				alert($A.get("$Label.c.loaded_message"));
			}
		});
		$A.enqueueAction(action);
	},
	refresh : function(component, event){
	// call the apex class method and fetch activity list
		var action = component.get("c.findActivityByAssessment");
		action.setParam("assessment",component.get("v.assessmentData").Id);
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				var storeResponse = response.getReturnValue();
				// set ActivityList list with return value from server.
				//component.set("v.ActivityList", storeResponse);
				//component.set("v.storeListActivity", storeResponse);
				
				component.set('v.initialData', response.getReturnValue());
                component.set('v.items', response.getReturnValue());
                   // start pagination
                    var pageSize = component.get("v.pageSizeBis");
	                // get size of all the records and then hold into an attribute "totalRecords"
	                component.set("v.totalRecords", component.get("v.items").length);
	                // set star as 0
	                component.set("v.startPage",0);
	                var totalRecords = component.get("v.items").length;
				    //var div = Math.trunc(totalRecords / pageSize);
	                if(totalRecords === pageSize){
	                  component.set("v.hideNext", true);
	                  component.set("v.endPage", pageSize - 1);
	                }else{
	                  component.set("v.hideNext", false);
	                  component.set("v.endPage", pageSize - 1);
	                }
	                var PaginationList = [];
	                for(var i=0; i< pageSize; i++){
	                    if(component.get("v.items").length> i)
	                        PaginationList.push(component.get("v.items")[i]);    
	                }
	                component.set('v.PaginationList', PaginationList);
                //end pagination
				

			}
		});
		$A.enqueueAction(action);
		// set deafult count and select all checkbox value to false on load
		//component.set("v.selectedCount", 0);
		//component.find("box3").set("v.value", false);
	},
	
})