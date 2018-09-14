({
    nextTab : function(component, event, helper) {
        component.set("v.setMessage", '');           
        var showContext = component.get("v.showContext");
        var showContext2 = component.get("v.showContext2");
        var showContextActivity = component.get("v.showContextActivity");
        var showContextActivityShow = component.get("v.showContextActivityShow");
        var showContextWorkshop = component.get("v.showContextWorkshop");
        var showSlider = component.get("v.showSlider");  
        var showRiskIdentif = component.get("v.showRiskIdentif");
        var showRiskAnalyse = component.get("v.showRiskAnalyse");
        var showListCauseAndImpact = component.get("v.showListCauseAndImpact");
        var showListMeasure = component.get("v.showListMeasure");
        var showRiskTreatment = component.get("v.showRiskTreatment");
        
        if(showContext == true){
            var idAssessment = component.get("v.assessmentData").Id;
	        if(idAssessment != null){
		        component.set("v.showContext", false);
                component.set("v.showContext2", true);
                helper.activeContext2(component, event);
	        }else{
	             var toast = $A.get('e.force:showToast');
	             toast.setParams({
	            	'message' : 'Create first an assessment',
	                'type' : 'warning',
	                'mode' : 'dismissible'
	             });
	             toast.fire();
	         }        
         }  
        
        if(showContext2 == true){
            //console.log(assessment.orm_organisation__c)
            component.set("v.showContext2", false);
            component.set("v.showContextActivity", true);
            helper.activeContextActivity(component, event);
        }
        
        if(showContextActivity == true){
            var assessment = component.get("v.assessmentData");
            if(assessment.orm_organisation__c != undefined){
    	       component.set("v.showContextActivity", false);
               component.set("v.showContextWorkshop", true);
               helper.activeContextWorkshop(component, event); 
	              
            }else{
                  var toast = $A.get('e.force:showToast');
	              toast.setParams({
	            	'message' : 'Please select an organisation',
	                'type' : 'warning',
	                'mode' : 'dismissible'
	              });
	              toast.fire();
            }
            
        }
        
        if( showContextActivityShow == true){ 
            component.set("v.showContextActivityShow", false);
            component.set("v.showContextWorkshop", true);
            helper.activeContextWorkshop(component, event);
        }
        
        if(showContextWorkshop == true){
            component.set("v.showContextWorkshop", false);
            component.set("v.showSlider", true);
            helper.activeSlider(component, event);
        }
        
        if(showSlider == true){
            var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	        evtSpinner.fire();
            component.set("v.showSlider", false);
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
        var showContextActivityShow = component.get("v.showContextActivityShow");
        var showSlider = component.get("v.showSlider");  
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
        
        if( showContextActivityShow == true){
            component.set("v.showContextActivity", true);
            component.set("v.showContextActivityShow", false);
            helper.activeContextActivity(component, event);
        }
        
        if(showContextWorkshop == true){
            component.set("v.showContextWorkshop", false);
            component.set("v.showContextActivity", true);
            helper.activeContextActivity(component, event);
        }
        
        if(showSlider == true){
            component.set("v.showSlider", false);
            component.set("v.showContextWorkshop", true);
            helper.activeContextWorkshop(component, event);
        }
        if(showRiskIdentif == true){
            //Hide the Spinner
	        var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
	        evtSpinner.fire(); 
            component.set("v.showSlider", true);
            component.set("v.showRiskIdentif", false);
            helper.activeSlider(component, event);
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
        //Hide the Spinner
          var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
          evtSpinner.fire(); 
        helper.activeContext(component, event);
    },
    
    activeRiskIdentif : function(component, event, helper) {
        var idAssessment = component.get("v.assessmentData").Id;
        if(idAssessment == null){
        	var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : 'Create first an assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
            });
            toast.fire();
        }else{
	            if(component.get("v.isEmptyListAssessmentRisk")){
	                var toast = $A.get('e.force:showToast');
	                toast.setParams({
	                    'message' : 'List assessmentRisk is empty',
	                    'type' : 'warning',
	                    'mode' : 'dismissible'
	                });
	                toast.fire();
				 }else{ 
				      //Hide the Spinner
		              var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
			          evtHideSpinner.fire(); 
				 
				      var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	                  evtSpinner.fire(); 
				      helper.activeRiskIdentif(component, event);
				 }
                    
        }
    },
    
    activeRiskAnalye : function(component, event, helper) {
	     var idAssessmentRisk = event.getParam("idAssessmentRisk");
	     var idAssessment = component.get("v.assessmentData").Id;
         if(idAssessment != null){
	            if(idAssessmentRisk == null){
		            var toast = $A.get('e.force:showToast');
		            toast.setParams({
		            	'message' : 'Please, select an assessmentRisk in Risk Identification',
		                'type' : 'warning',
		                'mode' : 'dismissible'
		            });
		            toast.fire();
		        }else{
		            
		            //Hide the Spinner
	                var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
		            evtHideSpinner.fire(); 
			 
			        var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
                    evtSpinner.fire(); 
		        
			        component.set("v.showRiskIdentif", false);
			        component.set("v.showRiskAnalyse", true);
			        helper.activeRiskAnalye(component, event);
			        component.set("v.idAssessmentRisk", idAssessmentRisk);
			        var evt = $A.get("e.c:OrmInstantiateRiskAnalysisEvt");
			        evt.setParams({"riskAssessmentId": idAssessmentRisk});
			        evt.fire();
		       }
	       
         }else{
	             var toast = $A.get('e.force:showToast');
	             toast.setParams({
	            	'message' : 'Create first an assessment',
	                'type' : 'warning',
	                'mode' : 'dismissible'
	             });
	             toast.fire();
         }
	     
    },
    
    riskAnalyeTabClicked : function(component, event, helper) {
         var idAssessmentRisk = component.get("v.idAssessmentRisk");
         var idAssessment = component.get("v.assessmentData").Id;
         
         if(idAssessment != null){
             if(component.get("v.isEmptyListAssessmentRisk")){
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message' : 'List assessmentRisk is empty in Risk Identification',
                    'type' : 'warning',
                    'mode' : 'dismissible'
                });
                toast.fire();
	         }else{
			          if(idAssessmentRisk == null){
			                var toast = $A.get('e.force:showToast');
			                toast.setParams({
			                    'message' : 'Please, select an assessmentRisk in Risk Identification',
			                    'type' : 'warning',
			                    'mode' : 'dismissible'
			                });
			                toast.fire();
				       }else{
				                //Hide the Spinner
					            var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
						        evtHideSpinner.fire(); 
						        
				                var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	                            evtSpinner.fire();
				                
				                component.set("v.showRiskIdentif", false);
				                component.set("v.showRiskAnalyse", true);
				                helper.activeRiskAnalye(component, event);
				                var evt = $A.get("e.c:OrmInstantiateRiskAnalysisEvt");
				                evt.setParams({"riskAssessmentId": idAssessmentRisk});
				                evt.fire();
				        }
	               }
         }else{         
             var toast = $A.get('e.force:showToast');
             toast.setParams({
            	'message' : 'Create first an assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
             });
             toast.fire();
         }
         
    },
    
    activeRiskTreatment : function(component, event, helper) {
     var idMeasure = event.getParam("idMeasure");
     var idAssessment = component.get("v.assessmentData").Id;
     if(idAssessment != null){
         if(idMeasure == null){
		     var toast = $A.get('e.force:showToast');
	         toast.setParams({
	        	'message' : 'Please, select a measure in Risk Analysis',
	            'type' : 'warning',
	            'mode' : 'dismissible'
	         });
	         toast.fire();
	         
	    }else{
	        var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	        evtSpinner.fire();
	        helper.activeRiskTreatment(component, event);
	        component.set("v.idMeasure", idMeasure);
	        var evt = $A.get("e.c:OrmInstanceRiskTreatmentEvt");
	        evt.setParams({"MeasureId": idMeasure});
	        evt.fire();
	     }
        
     }else{
            var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : 'Create first an assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
            });
            toast.fire();
     }
     
   },
    
   riskTreatmentTabClicked : function(component, event, helper) {
     var idMeasure = component.get("v.idMeasure");
     var idAssessment = component.get("v.assessmentData").Id;
     if(idAssessment != null){
            if(component.get("v.isEmptyListMeasure")){
                var toast = $A.get('e.force:showToast');
                toast.setParams({
                    'message' : 'List Measure is empty in Risk Analysis',
                    'type' : 'warning',
                    'mode' : 'dismissible'
                });
                toast.fire();
			 }else{
			         if(idMeasure == null){
				           var toast = $A.get('e.force:showToast');
				           toast.setParams({
				            	'message' : 'Please, select a measure in Risk Analysis',
				                'type' : 'warning',
				                'mode' : 'dismissible'
				            });
				            toast.fire();
				     }else{	  
				        var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	                    evtSpinner.fire();    
				        helper.activeRiskTreatment(component, event);
				        var evt = $A.get("e.c:OrmInstanceRiskTreatmentEvt");
				        evt.setParams({"MeasureId": idMeasure});
				        evt.fire();
				     }
			  }
     }else{
         var toast = $A.get('e.force:showToast');
         toast.setParams({
        	'message' : 'Create first an assessment',
            'type' : 'warning',
            'mode' : 'dismissible'
         });
         toast.fire();
     }
	     
        /*var toast = $A.get('e.force:showToast');
        toast.setParams({
        	'message' : 'please, select a measure in Risk Analysis',
            'type' : 'warning',
            'mode' : 'dismissible'
        });
        toast.fire();
        var field = "Risk Treatment";
        var description = "You must select a  measure in Risk Analysis before to navigate to this tab";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);*/
  },
    
    activeActionPlan : function(component, event, helper) {
        var idAssessment = component.get("v.assessmentData").Id;
        if(idAssessment != null){
	        helper.activeActionPlan(component, event);   
        }else{
             var toast = $A.get('e.force:showToast');
             toast.setParams({
            	'message' : 'Create first an assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
             });
             toast.fire();
         }        
    },
    
	navigateToListAssessment : function (component, event, helper) {
	   var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	   evtSpinner.fire();
       var evt = $A.get("e.c:OrmDisplayListAssessmentEvt");
	   evt.fire();
    },
    
    navigateToListAssessmentRisk : function (component, event, helper) {
	   var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	   evtSpinner.fire();
       var evt = $A.get("e.c:OrmDisplayAssessmentRiskEvt");
	   evt.fire();
    },
    
    navigateToListMeasure : function (component, event, helper) {
	   var evtSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	   evtSpinner.fire();
       var evt = $A.get("e.c:OrmShowMyMeasureListEvt");
	   evt.fire();
    },
    
    
    
})