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
     alert(JSON.stringify(event.getParam("assessmentObject")))
       $A.createComponent(
                "c:OrmAssessmentLayoutCmp", {
                    "component": component.set("v.assessmentData", event.getParam("assessmentObject")),
                },
                function(newCmp) {
                    if (component.isValid()) {
                        component.set("v.body", newCmp);
                    }
                }
            );  
      },
    
})