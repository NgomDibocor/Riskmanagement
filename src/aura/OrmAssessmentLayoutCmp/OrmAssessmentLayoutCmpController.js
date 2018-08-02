({
    doInit : function(component, event, helper) {
       helper.fetchPicklist(component, event);
	},
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
           /* var assessmentName = component.find("Name").get("v.value");
            //console.log('assessmentName:::'+assessmentName);
            if(assessmentName =='' || assessmentName == null){
                component.set("v.setMessage",'error');           
            }

            if(component.get("v.setMessage")=='error')
            { 
                component.set("v.showRiskIdentif",false);
                component.set("v.showRiskAnalyse", false);
                component.set("v.showError", true);
                component.set("v.showData", false);
                
            }
            else
            { */
                component.set("v.showContext", false);
                component.set("v.showContext2", true);
                component.set("v.showError", false);
                helper.activeContext2(component, event);
                
           // }
            
        }  
        if(showContext2 == true){
       
            component.set("v.showContext2", false);
            component.set("v.showContextActivity", true);
            component.set("v.showError", false);
            helper.activeContextActivity(component, event);
            
        }
        if(showContextActivity == true){
       
            component.set("v.showContextActivity", false);
            component.set("v.showContextWorkshop", true);
            component.set("v.showError", false);
            helper.activeContextWorkshop(component, event);
            
        }
        if(showContextWorkshop == true){
      
            component.set("v.showContextWorkshop", false);
            component.set("v.showRiskIdentif", true);
            component.set("v.showError", false);
            helper.activeRiskIdentif(component, event);
        }
        
        
        if(showRiskIdentif == true){
        
                component.set("v.showRiskIdentif", false);
                component.set("v.showRiskAnalyse", true);
                component.set("v.showError", false);
                component.set("v.showData", false);                
                helper.activeRiskAnalye(component, event);
                
        }   
        
        if(showRiskAnalyse == true){
        
                component.set("v.showRiskTreatment", true);
                component.set("v.showRiskIdentif", false);
                component.set("v.showError", false);
                component.set("v.showData", true);
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
            component.set("v.showError", false);
            helper.activeContext(component, event);
        }
        if(showContextActivity == true){
            component.set("v.showContext2", true);
            component.set("v.showContextActivity", false);
            component.set("v.showError", false);
            helper.activeContext2(component, event);
        }
        
        if(showContextWorkshop == true){
            component.set("v.showContextWorkshop", false);
            component.set("v.showContextActivity", true);
            component.set("v.showError", false);
            helper.activeContextActivity(component, event);
        }
        
        if(showRiskIdentif == true){
            component.set("v.showContextWorkshop", true);
            component.set("v.showRiskIdentif", false);
            component.set("v.showError", false);
            helper.activeContextWorkshop(component, event);
            
            
        }    
        if(showRiskAnalyse == true){
            component.set("v.showRiskIdentif", true);
            component.set("v.showRiskAnalyse", false);
            component.set("v.showError", false);
            helper.activeRiskIdentif(component, event);
            
            
        }
        if(showRiskTreatment == true){
            component.set("v.showRiskTreatment", false);
            component.set("v.showRiskAnalyse", true);
            component.set("v.showError", false);
            helper.activeRiskAnalye(component, event);
        }
        if(showActionPlan == true){
            component.set("v.showRiskTreatment", true);
            component.set("v.showActionPlan", false);
            component.set("v.showError", false);
            helper.activeRiskTreatment(component, event);
        } 
    },
    
    createAssessment : function(component, event, helper) {
        var title = component.find("Name");
        var titleAssess = title.get("v.value");
        var ta = component.find("typeAssessment");
        var newItem = component.get("v.assessmentData");
        newItem.orm_typeAssessment__c = ta.get("v.value");
        //alert(JSON.stringify(newItem))
        var action = component.get('c.add');
        action.setParams({
            "item": newItem
        });
        action
        .setCallback(
            this,
            function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                component.set("v.displaySaveCancelBtn", false);
                component.set("v.assessmentData",response.getReturnValue());
                    var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            'message' : newItem.orm_typeAssessment__c+' '+'crée avec success',
                            'type' : 'success',
                            'mode' : 'dismissible'
                        });

		                toastEvent.fire();
                    
                }
            });
        $A.enqueueAction(action);
    },
    onChangeTA : function(component, event, helper)
    {
    	component.find("typeAssessment").set("v.value", event.getSource().get("v.value"));
	},
    onChangeOrg : function(component, event, helper)
    {
    	alert(component.find("organisation").get("v.value"));
	},
    
    closeFielDescript : function(component, event, helper) {
        component.set("v.closeFieldDescription", true);
    },
    
    onSelectChange : function(component, event, helper) {
        var selected = component.find("StageName").get("v.value");
        component.set("v.OpportunityData.StageName",selected);
        console.log('opp::::'+JSON.stringify(selected));
    },
    
    saveRecord : function(component, event, helper) {
        helper.saveData(component, event, helper);               
    },
    activeContext : function(component, event, helper) {
        helper.activeContext(component, event);
    },
    /* laye */
    activeRiskIdentif : function(component, event, helper) {
    	alert(component.get("v.assessmentData").Id);
        /*var evt = $A.get("e.c:OrmRiskIdentificationClickedEvt");
        evt.setParams({"idAssessment": component.get("v.assessmentData").Id});
        
        evt.fire();*/
        var evt = $A.get("e.c:OrmRiskIdentificationClickedEvt");
        evt.setParams({"idAssessment": component.get("v.assessmentData").Id});
        
        evt.fire();
        /*var evt = $A.get("e.c:OrmRiskIdentificationClickedEvt");
        evt.setParams({"idAssessment": component.get("v.assessmentData").Id});
        
        evt.fire();*/
        helper.activeRiskIdentif(component, event);
    },
    activeRiskAnalye : function(component, event, helper) {
        helper.activeRiskAnalye(component, event);
    },
    activeRiskTreatment : function(component, event, helper) {
        helper.activeRiskTreatment(component, event);
    },
    activeActionPlan : function(component, event, helper) {
        helper.activeActionPlan(component, event);
    },
    
    openActivityNewCmp : function(component, event, helper){
        /* after created the assessment we must get the assessment id
			var assessment = component.get('v.assessmentData');
         */
        /*var action = component.get('c.getSingleAssessment');
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                 var assessment = response.getReturnValue();
                 var evt = $A.get("e.c:OrmOpenNewActivityCmpEvt");
			     evt.setParams({
			        "idAssessment" : assessment.Id
			     });
			     evt.fire();
            } else {
                alert('error');
            }            
        });
        $A.enqueueAction(action);*/
        
        var idAssessment = component.get("v.assessmentData").Id;
        //alert("idAssessment " + idAssessment);
        if(idAssessment == null){
        	//alert("check if you have created the assessment");
        	var toast = $A.get('e.force:showToast');
            toast.setParams({
            	'message' : 'Check if you Have Created the Assessment',
                'type' : 'warning',
                'mode' : 'dismissible'
            });

            toast.fire();
        } else {
        	var evt = $A.get("e.c:OrmOpenNewActivityCmpEvt");
			evt.setParams({
			   "idAssessment" : idAssessment
			});
			evt.fire();
        }
    },
    
    openOrganisationNew : function(component, event, helper){
        var assessment = component.get('v.assessmentData');
		var evt = $A.get("e.c:OrmOpenNewOrganisationEvt");
		evt.setParams({
			"idAssessment" : assessment.Id
		});
		evt.fire();
    },
    
    refreshListActivity : function(component, event, helper){
        
        /*var action = component.get('c.getSelectOptions');    
        action.setParams({'objObject' : component.get("v.activity"), 'fld' : 'Status'});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.allStatus', response.getReturnValue());
            } else {
                alert("the element was not found");
            }
        });
        $A.enqueueAction(action);*/
        
        var action = component.get('c.findAllActiviteByAssessment');
        action.setParams({'idAssessment' : null});
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                component.set('v.allActivities', response.getReturnValue());
            } else {
                alert('ERROR');
            }            
        });
        $A.enqueueAction(action);
    },
    
    refreshListOrganisation : function(component, event, helper){
        var actionOrgs = component.get("c.getOrganisations");
        actionOrgs.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allOrganisation', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(actionOrgs);
    },
    onTypeAssessmentChange : function(component,event,helper){ 
        if(event.getSource().get("v.value").trim() != ''){ 
            component.find("typeAssessment").set("v.value", event.getSource().get("v.value"));            
        }
        var field = $A.get("$Label.c.orm_type_assessment");
        var description = $A.get("$Label.c.orm_description_type_assessment");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
        
    },
    
    onTitleChange : function(component,event,helper){ 
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.displaySaveCancelBtn",true);
        }
    },
    sendTitleToFD : function(component,event,helper){ 
    	
        var field = $A.get("$Label.c.orm_title_assessment");
        var description = $A.get("$Label.c.orm_description_assessment");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    
    sendObjectifToFD  : function(component,event,helper){ 
    	
        var field = $A.get("$Label.c.orm_objectif_assessment");
        var description = $A.get("$Label.c.orm_description_objectif");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
   
    sendDesciptionToFD : function(component,event,helper){ 
        var field = $A.get("$Label.c.orm_description");
        var description = $A.get("$Label.c.orm_description_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    
    cancel : function(component,event,helper){
       // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        $A.get('e.force:refreshView').fire(); 
    },
    
    /* @cretedBy: laye
	   @createdDate: 28/07/2018
     */
    openCauseNewCmp : function(component, event, helper){
    	/* after created the assessment we must get the assessment id
			var assessment = component.get('v.assessmentData');
         */
        alert('déclenche evt');
        /*var action = component.get('c.getSingleAssessment');
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                 var assessment = response.getReturnValue();
                 var evt = $A.get("e.c:OrmNewCauseClickedEvt");
			     evt.setParams({
			        "idAssessment" : assessment.Id
			     });
			     evt.fire();
            } else {
                alert('error');
            }            
        });
        $A.enqueueAction(action);*/
        
        var assessmentRiskId = "";
        var evt = $A.get("e.c:OrmNewCauseClickedEvt");
        evt.setParams({
        	"idAssessmentRisk" : assessmentRiskId
		});
		evt.fire();
    },
    
    /* @cretedBy: laye
	   @createdDate: 28/07/2018
     */
    refreshListCause : function(component, event, helper){
    	var action = component.get('c.findAllCauseByAssessment');
        action.setParams({'idAssessment' : null});
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
            	alert('SUCCESS');
                component.set('v.allCauses', response.getReturnValue());
            } else {
                alert('ERROR');
            }            
        });
        $A.enqueueAction(action);
    },
    
    onChangeCause : function(component, event, helper) {
    
    }
    
})