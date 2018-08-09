({
    doInit : function(component, event, helper){
        var action = component.get('c.getAssessmentRisks');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var custs = [];
                var conts = response.getReturnValue();
                for(var idAss in conts){
                    custs.push({value:conts[idAss]});
                }
                component.set("v.items", custs);
                
                // start
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
	                //alert(JSON.stringify(component.get("v.PaginationList").lenght))
                //end
                
            } else {
                alert("l'élément n'a pas été chargé");
            }
        });
        $A.enqueueAction(action);
    },
	newAssessment : function(component, event, helper) {
        var evt = $A.get("e.c:OrmDisplayAssessmentEvt");
		evt.fire();
	},
	
	showAssessment : function(component, event, helper) {
	   var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	   evtSpinner.fire();  
	
	   var action = component.get('c.getAssessment');
       action.setParams({ 'idAss' : event.target.id });
	   action.setCallback(this, function(response){
		    var state = response.getState();
		    if(state === 'SUCCESS'){
		         var evt = $A.get("e.c:OrmShowAssessmentClickedEvt");
			     evt.setParams({
			       "assessmentObject" : response.getReturnValue(),
			     });
			     evt.fire();        
		    } else {
		        alert("l'élément n'a pas été chargé");
		    }
		});
		$A.enqueueAction(action);
	},
	
	filter : function(component, event, helper) {
	
	},
	
})