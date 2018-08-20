({
    doInit : function(component, event, helper){
        helper.refresh(component, event);
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
	
	filter : function (component, event, helper){
    	
    	var assessments = component.get('v.items');
    	var data = assessments;
    	console.log(JSON.stringify(data));
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refresh(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		data = data.filter(row => regex.test(row.value.assessment.Name) || regex.test(row.value.assessment.orm_description__c));
		        } catch (e) {
		    	   alert(e)
		        }
		        
		   component.set("v.PaginationList", data);
         }        	
    },
	
})