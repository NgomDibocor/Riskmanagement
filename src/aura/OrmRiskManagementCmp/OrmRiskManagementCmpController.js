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
	                "assessmentData": event.getParam("assessmentObject"),
	                "showAssessmentButtonClicked" : true,
	                "nbreRisk" : event.getParam("numberOfRisk")   
	            },
	            function(newCmp) {
	                if (component.isValid()) {
	                    component.set("v.body", newCmp);
	                }
	            }
	        );  
	 },
	 
	 showInfoAssessmentAfterCreate : function(component,event,helper){ 
	   $A.createComponent(
	            "c:OrmAssessmentLayoutCmp", {
	                "assessmentData": event.getParam("assessmentObject"),
	                "createAssessmentButtonClicked" : true,
	                "nbreRisk" : event.getParam("numberOfRisk") 
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
        var menu = document.getElementById("menuRM");
        var arrowLeft = document.getElementById("arrowLeft");
        var arrowRight = document.getElementById("arrowRight");
        if(menu !== null){
           $A.util.addClass(menu, 'disabledbutton');
        }
        if(arrowLeft !== null){
           $A.util.addClass(arrowLeft, 'disabledbutton');
        }
        if(arrowRight !== null){
           $A.util.addClass(arrowRight, 'disabledbutton');
        }
        
      },

      hideSpinner: function(component) {
        var spinner = component.find('spinner-div');
        $A.util.addClass(spinner, "slds-hide");
        var menu = document.getElementById("menuRM");
        var arrowLeft = document.getElementById("arrowLeft");
        var arrowRight = document.getElementById("arrowRight");
        if(menu !== null){
           $A.util.removeClass(menu, 'disabledbutton');
        }
        if(arrowLeft !== null){
           $A.util.removeClass(arrowLeft, 'disabledbutton');
        }
        if(arrowRight !== null){
           $A.util.removeClass(arrowRight, 'disabledbutton');
        }
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