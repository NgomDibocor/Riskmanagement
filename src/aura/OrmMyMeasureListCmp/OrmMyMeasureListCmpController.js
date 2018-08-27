({
doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
showMeasure : function(component, event, helper) 
    {
    	var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	     evtSpinner.fire(); 
	     
	     var measureId = event.target.id;
         var idAssessment = document.getElementById( measureId ).getElementsByTagName( 'span' ).item(0).id;
         var action = component.get('c.getAssessment');
	     action.setParams({"idAss": idAssessment });
	     action.setCallback(this, function(response){
	          var state = response.getState();
	          if(state === 'SUCCESS'){
		         var evt = $A.get("e.c:OrmShowMeasureInfoEvt");
			     evt.setParams({
			       "assessmentObject" : response.getReturnValue(),
			       "idMeasure" : measureId
			     });
			     evt.fire();        
		     } else {
		        alert("l'élément n'a pas été chargé");
		     }
	     });
	     $A.enqueueAction(action);
	},
	filter : function (component, event, helper){
    	
    	var assessmentRisks = component.get('v.initialData');
    	var data = assessmentRisks;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.refreshList(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		data = data.filter(row => regex.test(row.orm_description__c) || regex.test(row.Name));
		        } catch (e) {
		    	   alert(e)
		        }
		   component.set("v.filterPagination", data);
		   component.set("v.items", component.get("v.filterPagination"));
		   helper.paginationFilter(component, event);
         }        	
    },
})