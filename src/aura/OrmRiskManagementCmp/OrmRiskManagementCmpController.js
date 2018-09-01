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
    createAssessment : function(component, event, helper) {
        $A.createComponent(
            "c:OrmAssessmentLayoutCmp", {
               "createAssessmentButtonClicked" : true
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
    ShowMeasureList: function(component, event, helper) {
        $A.createComponent(
            "c:OrmMyMeasureListCmp", {

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
	  
	  showInfoAssessmentRisk : function(component,event,helper){ 
	   $A.createComponent(
	            "c:OrmAssessmentLayoutCmp", {
	                "assessmentData": event.getParam("assessmentObject"),
	                "showContext": false,
	                "showRiskAnalyse" : true,
	                "showAssessmentRisk": true,
	                "idAssessmentRisk" : event.getParam("idAssessmentRisk")
	            },
	            function(newCmp) {
	                if (component.isValid()) {
	                    component.set("v.body", newCmp);
	                }
	            }
	        );  
	  },
	   showInfoMeasure : function(component,event,helper){ 
	   $A.createComponent(
	            "c:OrmAssessmentLayoutCmp", {
	                "assessmentData": event.getParam("assessmentObject"),
	                "showContext": false,
	                "showMeasureInfo": true,
	                "showRiskTreatment":true,
	                "idAssessmentRisk" : event.getParam("idAssessmentRisk"),
	                "idMeasure": event.getParam("idMeasure")
	            },
	            function(newCmp) {
	                if (component.isValid()) {
	                    component.set("v.body", newCmp);
	                }
	            }
	        );  
	  },
    
})