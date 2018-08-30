({
    nextTab : function(component, event, helper) {
        component.set("v.setMessage", '');           
        var showContext = component.get("v.showContext");
        var showContext2 = component.get("v.showContext2");
        var showContextActivity = component.get("v.showContextActivity");
        var showContextWorkshop = component.get("v.showContextWorkshop");
        var showRiskIdentif = component.get("v.showRiskIdentif");
        var showRiskAnalyse = component.get("v.showRiskAnalyse");
        var showListCauseAndImpact = component.get("v.showListCauseAndImpact");
        var showListMeasure = component.get("v.showListMeasure");
        var showRiskTreatment = component.get("v.showRiskTreatment");
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
            component.set("v.showListCauseAndImpact", true);
            component.set("v.showRiskAnalyse", false);
            //send idAseessmentRisk to CauseListCmp
            var evt = $A.get("e.c:OrmSendIdAssessmentRiskToCauseEvt");
            evt.setParams({"idAssessmentRisk": component.get("v.idAssessmentRisk")});
            evt.fire();
            helper.activeRiskAnalyeListCauseAndImpact(component, event);
                
        }
        if(showListCauseAndImpact == true){
            component.set("v.showListMeasure", true);
            component.set("v.showListCauseAndImpact", false);
            //send idAseessmentRisk to MeasureListCmp
            var evt = $A.get("e.c:OrmSendIdAssesssmentRiskEvt");
            evt.setParams({"idAssessmentRisk": component.get("v.idAssessmentRisk")});
            evt.fire();
            helper.activeRiskAnalyeListMeasure(component, event);
        }
        /*if(showListMeasure == true){
            
        }*/
        if(showRiskTreatment == true){
            component.set("v.showActionPlan", true);
            component.set("v.showRiskTreatment", false);
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
        var showListCauseAndImpact = component.get("v.showListCauseAndImpact");
        var showListMeasure = component.get("v.showListMeasure");
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
        if(showListCauseAndImpact == true){
            component.set("v.showRiskAnalyse", true);
            component.set("v.showListCauseAndImpact", false);
            helper.activeRiskAnalye(component, event);
            var evt = $A.get("e.c:OrmInstantiateRiskAnalysisEvt");
            evt.setParams({"riskAssessmentId": component.get("v.idAssessmentRisk")});
            evt.fire();
        }
        if(showListMeasure == true){
            component.set("v.showListCauseAndImpact", true);
            component.set("v.showListMeasure", false);
            var evt = $A.get("e.c:OrmSendIdAssessmentRiskToCauseEvt");
            evt.setParams({"idAssessmentRisk": component.get("v.idAssessmentRisk")});
            evt.fire();
            helper.activeRiskAnalyeListCauseAndImpact(component, event);
        }
        if(showRiskTreatment == true){
            component.set("v.showRiskTreatment", false);
            component.set("v.showListMeasure", true);
            var evt = $A.get("e.c:OrmSendIdAssesssmentRiskEvt");
            evt.setParams({"idAssessmentRisk": component.get("v.idAssessmentRisk")});
            evt.fire();
            helper.activeRiskAnalyeListMeasure(component, event);
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
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", true);
        helper.activeRiskAnalye(component, event);
        component.set("v.idAssessmentRisk", idAssessmentRisk);
        var evt = $A.get("e.c:OrmInstantiateRiskAnalysisEvt");
        evt.setParams({"riskAssessmentId": idAssessmentRisk});
        evt.fire();
        }
    },
    
    activeRiskTreatment : function(component, event, helper) {
     var idMeasure = event.getParam("idMeasure");
     if(idMeasure == null){
     var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : 'Check if you Have Created the Assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
            });

            toast.fire();
     }else{
        //component.set("v.showRiskTreatment", true);
        //component.set("v.showMeasureInfo", true);
        helper.activeRiskTreatment(component, event);
        component.set("v.idMeasure", idMeasure);
        var evt = $A.get("e.c:OrmInstanceRiskTreatmentEvt");
        evt.setParams({"MeasureId": idMeasure});
        evt.fire();
        }
        
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
    riskAnalyeClicked : function(component, event, helper) {
        var toast = $A.get('e.force:showToast');
        toast.setParams({
        	'message' : 'please, select an assessmentRisk in Risk Identification',
            'type' : 'warning',
            'mode' : 'dismissible'
        });
        toast.fire();
        var field = "Risk Analysis";
        var description = "You must select an assessmentRisk in Risk Identification before to navigate to this tab";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    riskTreatmentClicked : function(component, event, helper) {
        var toast = $A.get('e.force:showToast');
        toast.setParams({
        	'message' : 'please, select a measure in Risk Analysis',
            'type' : 'warning',
            'mode' : 'dismissible'
        });
        toast.fire();
        var field = "Risk Treatment";
        var description = "You must select a  measure in Risk Analysis before to navigate to this tab";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
})