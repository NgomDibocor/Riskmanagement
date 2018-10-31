({
	getAllMeasuresProgressionByMeasure : function(component, event) {	
		
        var action = component.get("c.getAllMeasuresProgressionByMeasure");
        action.setParam('idMeasure', component.get("v.idMeasure"));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            	//console.log('measure '+ JSON.stringify(response.getReturnValue()));
            	//component.set("v.measureProgression ", response.getReturnValue());
            	//component.set("v.measureProgressionTemp ", response.getReturnValue());
//            	component.set('v.initialData', response.getReturnValue());
//                component.set('v.items', response.getReturnValue());
//                   // start pagination
//                    var pageSize = component.get("v.pageSizeBis");
//	                // get size of all the records and then hold into an attribute "totalRecords"
//	                component.set("v.totalRecords", component.get("v.items").length);
//	                // set star as 0
//	                component.set("v.startPage",0);
//	                var totalRecords = component.get("v.items").length;
//				    //var div = Math.trunc(totalRecords / pageSize);
//	                if(totalRecords === pageSize){
//	                  component.set("v.hideNext", true);
//	                  component.set("v.endPage", pageSize - 1);
//	                }else{
//	                  component.set("v.hideNext", false);
//	                  component.set("v.endPage", pageSize - 1);
//	                }
//	                var PaginationList = [];
//	                for(var i=0; i< pageSize; i++){
//	                    if(component.get("v.items").length> i)
//	                        PaginationList.push(component.get("v.items")[i]);    
//	                }
//	                component.set('v.PaginationList', PaginationList);
                //end pagination
                
                 var pageSize = component.get("v.pageSizeInlineEdit");
                component.set('v.ListData', response.getReturnValue());
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.ListData").length);
                //Set the current Page as 0
                component.set("v.currentPage", 0);
                // set star as 0
                component.set("v.startPage", 0);
                var totalRecords = component.get("v.ListData").length;
                if (totalRecords === pageSize) {
                    component.set("v.hideNext", true);
                    component.set("v.endPage", pageSize - 1);
                } else {
                    component.set("v.hideNext", false);
                    component.set("v.endPage", pageSize - 1);
                }
                var PaginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    if (component.get("v.ListData").length > i) {
                        PaginationList.push(response.getReturnValue()[i]);
                    }
                }
                component.set('v.PaginationList', PaginationList);
            }else{
            	alert($A.get('$Label.c.orm_not_found'));
            }
        });
        $A.enqueueAction(action);
		},
//	requiredValidation : function(component,event) {
//        // get all causes.. 	
//        var allRecords = component.get("v.measureProgression");
//        
//        var isValid = true;
//        
//        return isValid;
//    },
        checkIfMapContentIsEmpty : function(component, event, myMap) {
        console.log("checkIfMapContentIsEmpty start")
        var lengthMap = Object.keys(myMap).length;
        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            if(myMap[page].length != 0){
              component.set("v.isEmptyMap", false);
              console.log("isEmptyMap", component.get("v.isEmptyMap"));
            }
        }
    },
})