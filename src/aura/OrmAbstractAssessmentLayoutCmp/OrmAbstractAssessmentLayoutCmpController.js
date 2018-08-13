({
    nextTab : function(component, event, helper) {
        component.set("v.setMessage", '');           
        var showContext = component.get("v.showContext");
        var showContext2 = component.get("v.showContext2");
        var showContextActivity = component.get("v.showContextActivity");
        var showContextWorkshop = component.get("v.showContextWorkshop");
        var showRiskIdentif = component.get("v.showRiskIdentif");
        var showRiskAnalyse = component.get("v.showRiskAnalyse");
        var showRiskTreatment = component.get("v.showRiskTreatment");
        var showData = component.get("v.showData");
        if(showContext == true){
            var newItem = component.get("v.assessmentData");
            //var assessmentName = component.find("Name").get("v.value");
            //console.log('assessmentName:::'+assessmentName);
            /*if(assessmentName =='' || assessmentName == null || newItem.Id == null ){
                component.set("v.setMessage",'error');           
            }

            if(component.get("v.setMessage")=='error')
            { 
                component.set("v.showContext", true);
                component.set("v.showContextWorkshop", false);
                component.set("v.showRiskIdentif",false);
                component.set("v.showRiskAnalyse", false);
                component.set("v.showContextActivity", false);
                component.set("v.showError", true);
                component.set("v.showData", false);
                
            }*/
            //else
            //{ 
                component.set("v.showContext", false);
                component.set("v.showContext2", true);
                helper.activeContext2(component, event);
                
          //  }
            
        }  
        if(showContext2 == true){
       
            component.set("v.showContext2", false);
            component.set("v.showContextActivity", true);
            helper.activeContextActivity(component, event);
            
        }
        if(showContextActivity == true){
            component.set("v.showContextActivity", false);
            component.set("v.showContextWorkshop", true);
            helper.activeContextWorkshop(component, event);
        }
        if(showContextWorkshop == true){
            component.set("v.showContextWorkshop", false);
            component.set("v.showRiskIdentif", true);
            helper.activeRiskIdentif(component, event);
        }
        if(showRiskIdentif == true){
            component.set("v.showRiskIdentif", false);
            component.set("v.showRiskAnalyse", true);
            helper.activeRiskAnalye(component, event);
        }   
        if(showRiskAnalyse == true){
            component.set("v.showRiskTreatment", true);
            component.set("v.showRiskIdentif", false);
            helper.activeRiskTreatment(component, event);
                
        }
        if(showRiskTreatment == true){
       
            component.set("v.showActionPlan", true);
            component.set("v.showRiskTreatment", false);
            component.set("v.showError", false);
            helper.activeActionPlan(component, event);
        }
        
    },
    prevTab : function(component, event, helper) {
        var showContext = component.get("v.showContext");
        var showContext2 = component.get("v.showContext2");
        var showContextActivity = component.get("v.showContextActivity");
        var showContextWorkshop = component.get("v.showContextWorkshop");
        var showRiskIdentif = component.get("v.showRiskIdentif");
        var showRiskAnalyse = component.get("v.showRiskAnalyse");
        var showRiskTreatment = component.get("v.showRiskTreatment");
        var showActionPlan = component.get("v.showActionPlan");
        
        if(showContext2 == true){
            component.set("v.showContext2", false);
            component.set("v.showContext", true);
            helper.activeContext(component, event);
        }
        if(showContextActivity == true){
            component.set("v.showContext2", true);
            component.set("v.showContextActivity", false);
            helper.activeContext2(component, event);
        }
        
        if(showContextWorkshop == true){
            component.set("v.showContextWorkshop", false);
            component.set("v.showContextActivity", true);
            helper.activeContextActivity(component, event);
        }
        
        if(showRiskIdentif == true){
            component.set("v.showContextWorkshop", true);
            component.set("v.showRiskIdentif", false);
            helper.activeContextWorkshop(component, event);
        }    
        if(showRiskAnalyse == true){
            component.set("v.showRiskIdentif", true);
            component.set("v.showRiskAnalyse", false);
            helper.activeRiskIdentif(component, event);
        }
        if(showRiskTreatment == true){
            component.set("v.showRiskTreatment", false);
            component.set("v.showRiskAnalyse", true);
            helper.activeRiskAnalye(component, event);
        }
        if(showActionPlan == true){
            component.set("v.showRiskTreatment", true);
            component.set("v.showActionPlan", false);
            helper.activeRiskTreatment(component, event);
        } 
    },
    activeContext : function(component, event, helper) {
        helper.activeContext(component, event);
    },
    /* laye */
    activeRiskIdentif : function(component, event, helper) {
        /*var evt = $A.get("e.c:OrmRiskIdentificationClickedEvt");
        evt.setParams({"idAssessment": component.get("v.assessmentData").Id});
        evt.fire();*/
        var idAssessment = component.get("v.assessmentData").Id;
        if(idAssessment == null){
        	//alert("check if you have created the assessment");
        	var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : 'Check if you Have Created the Assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
            });

            toast.fire();
        }else{
        
        helper.activeRiskIdentif(component, event);
        }
    },
    activeRiskAnalye : function(component, event, helper) {
     var idAssessmentRisk = event.getParam("idAssessmentRisk");
     if(idAssessmentRisk == null){
     var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : 'Check if you Have Created the Assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
            });

            toast.fire();
     }else{
        helper.activeRiskAnalye(component, event);
        }
    },
    activeRiskTreatment : function(component, event, helper) {
        helper.activeRiskTreatment(component, event);
    },
    activeActionPlan : function(component, event, helper) {
        helper.activeActionPlan(component, event);
    },
    
	navigateToListAssessment : function (component, event, helper) {
	   var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	   evtSpinner.fire();
       var evt = $A.get("e.c:OrmDisplayListAssessmentEvt");
	   evt.fire();
    },
})