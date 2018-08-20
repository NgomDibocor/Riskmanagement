({
    doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
    showAssessmentRisk : function(component, event, helper) {
         var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	     evtSpinner.fire(); 
    
         var assessmentRiskId = event.target.id;
         var idAssessment = document.getElementById( assessmentRiskId ).getElementsByTagName( 'span' ).item(0).id;
     
	     var action = component.get('c.getAssessment');
	     action.setParams({"idAss": idAssessment });
	     action.setCallback(this, function(response){
	          var state = response.getState();
	          if(state === 'SUCCESS'){
		         var evt = $A.get("e.c:OrmShowAssessmentRiskInfoEvt");
			     evt.setParams({
			       "assessmentObject" : response.getReturnValue(),
			       "idAssessmentRisk" : assessmentRiskId
			     });
			     evt.fire();        
		     } else {
		        alert("l'élément n'a pas été chargé");
		     }
	     });
	     $A.enqueueAction(action);
	},
	
	filter : function (component, event, helper){
    	
    	var assessmentRisks = component.get('v.items');
    	var data = assessmentRisks;
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
        	 		//data = data.filter(row => regex.test(row[3]) || regex.test(row[1]);
		        } catch (e) {
		    	   alert(e)
		        }
		        
		   component.set("v.PaginationList", data);
         }        	
    },

})