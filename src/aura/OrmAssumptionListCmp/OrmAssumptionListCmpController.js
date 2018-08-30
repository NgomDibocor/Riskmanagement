({

		doInit:function(component, event, helper){
		helper.refreshList(component, event);
		},
		
	    openNewAssumption : function(component, event, helper){
                
        var idAssessment = component.get("v.assessmentData").Id;
        if(idAssessment == null){
        	//alert("check if you have created the assessment");
        	var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : $A.get("$Label.c.orm_toast_warning"),
                'type' : 'warning',
                'mode' : 'dismissible'
            });

            toast.fire();
        } else {
        	var evt = $A.get("e.c:OrmNewAssumptionClickedEvt");
			evt.setParams({
			   "Assessmentdata" : component.get("v.assessmentData")
			});
			evt.fire();
        }
    },
    
})