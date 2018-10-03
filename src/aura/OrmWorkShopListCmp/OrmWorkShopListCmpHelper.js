({
	 requiredValidation : function(component,event) {
        // get all workshop	
        var allRecords = component.get("v.WorkshopList");
        var isValid = true;
        // play a for loop on all workshop list and check that workshop title is not null,   
        for(var i = 0; i < allRecords.length;i++){
            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
   
                isValid = false;
            }  
        }
        return isValid;
    },
     /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description refresh list workshop 
 * @history 
 * 2018-08-24 : Salimata NGOM - Implementation
 */
    refreshList : function(component, event) {
     var assmntDataId=component.get('v.assessmentData').Id;
		var action = component.get('c.findWorkshopByAssessment');
		action.setParam('asssessment',assmntDataId);
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
             component.set('v.initialData', response.getReturnValue());
                component.set('v.items', response.getReturnValue());
                // start pagination
                var pageSize = component.get("v.pageSizeBis");
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.items").length);
                // set star as 0
                component.set("v.startPage", 0);
                var totalRecords = component.get("v.items").length;
                //var div = Math.trunc(totalRecords / pageSize);
                if (totalRecords === pageSize) {
                    component.set("v.hideNext", true);
                    component.set("v.endPage", pageSize - 1);
                } else {
                    component.set("v.hideNext", false);
                    component.set("v.endPage", pageSize - 1);
                }
                var PaginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    if (component.get("v.items").length > i)
                        PaginationList.push(component.get("v.items")[i]);
                }
                component.set('v.PaginationList', PaginationList);
                //end pagination

            }else
            {
                 alert($A.get("$Label.c.loaded_message"));
            }
        });
        $A.enqueueAction(action);
	}
})