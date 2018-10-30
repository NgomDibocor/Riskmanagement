({
	refresh : function(component, idAssessmentRisk) {	
		
        var action = component.get("c.findAllImpactByAssessmentRisk");
        action.setParam('idAssRisk', idAssessmentRisk);
        action.setCallback(this, function(response) {
            var state = response.getState();
//            if (state === "SUCCESS") {
//            	//component.set("v.impacts", response.getReturnValue());
//            	//component.set("v.impactsTemp", response.getReturnValue());
//            	
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
//                //end pagination
//            	
//            }
            	 if (state === 'SUCCESS' && component.isValid()) {
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
            } else {
                alert('ERROR');
            }
        });
        $A.enqueueAction(action);
	},
//	requiredValidation : function(component,event) {
//        // get all causes.. 	
//        var allRecords = component.get("v.impacts");
//        var isValid = true;
//        // play a for loop on all account list and check that account name is not null,   
//        for(var i = 0; i < allRecords.length; i++) {
//            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
//                alert('Complete this field : Row No ' + (i+1) + ' Name is null' );
//                isValid = false;
//            }  
//        }
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