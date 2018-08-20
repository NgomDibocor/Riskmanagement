({
	refreshList : function(component, event) {
		var action = component.get('c.getAllAssessmentRisks');
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
              component.set('v.items', response.getReturnValue());
              // start pagination
                    var pageSize = component.get("v.pageSize");
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
            }else
            {
                 alert($A.get("$Label.c.loaded_message"));
            }
        });
        $A.enqueueAction(action);
	},
	paginationFilter : function(component, event) {
       // start pagination
            var pageSize = component.get("v.pageSize");
            // get size of all the records and then hold into an attribute "totalRecords"
            component.set("v.totalRecords", component.get("v.filterPagination").length);
            // set star as 0
            component.set("v.startPage",0);
            var totalRecords = component.get("v.filterPagination").length;
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
                if(component.get("v.filterPagination").length> i)
                    PaginationList.push(component.get("v.filterPagination")[i]);    
            }
            component.set('v.PaginationList', PaginationList);
        //end pagination
	}
})