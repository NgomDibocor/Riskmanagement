({
    doInit: function(component, event, helper) {
        $A.createComponent(
            "c:OrmAcceuilCmp", {
                
            },
            function(newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
    
    showAssessmentList : function(component, event, helper) {
        $A.createComponent(
            "c:OrmAssessmentListCmp", {

            },
            function(newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
    showAssessment : function(component, event, helper) {
        $A.createComponent(
            "c:OrmAssessmentLayoutCmp", {
               "assessmentData": component.get("v.assessmentData")
            },
            function(newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
    ShowAssessmentRiskList: function(component, event, helper) {
        $A.createComponent(
            "c:OrmAssessmentRiskListCmp", {

            },
            function(newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
	 showInfoAssessment : function(component,event,helper){ 
	   $A.createComponent(
	            "c:OrmAssessmentLayoutCmp", {
	                "assessmentData": event.getParam("assessmentObject")
	            },
	            function(newCmp) {
	                if (component.isValid()) {
	                    component.set("v.body", newCmp);
	                }
	            }
	        );  
	  },
	  
      showSpinner: function(component) {
        var spinner = component.find('spinner-div');
        $A.util.removeClass(spinner, "slds-hide");
      },

      hideSpinner: function(component) {
        var spinner = component.find('spinner-div');
        $A.util.addClass(spinner, "slds-hide");
	  },
    
})