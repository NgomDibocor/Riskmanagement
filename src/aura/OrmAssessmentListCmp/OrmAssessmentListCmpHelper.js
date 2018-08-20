({

   refresh : function(component, event, helper) {
       var action = component.get('c.getAssessmentRisks');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
              //Hide the Spinner
                var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
	            evtSpinner.fire(); 
            
                var custs = [];
                var conts = response.getReturnValue();
                for(var idAss in conts){
                    custs.push({value:conts[idAss]});
                }
                component.set("v.items", custs);
                component.set('v.initialData', custs);
                
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
                
            } else {
                alert("l'élément n'a pas été chargé");
            }
        });
        $A.enqueueAction(action);
    },

})