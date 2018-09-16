({
    doInit : function(component, event, helper) {
       helper.fetchPicklist(component, event);
	},
    
    /* @cretedBy: Dibocor NGOM
	   @createdDate: 02/07/2018
    */
    createAssessment : function(component, event, helper) {
        var ta = component.find("typeAssessment");
        var newItem = component.get("v.assessmentData");
        newItem.orm_typeAssessment__c = ta.get("v.value");
        
        if(ta.get("v.value")== 'Projet'){
          var statusProjet = component.find("statusProjet");
          newItem.orm_statusAssessment__c = statusProjet.get("v.value");
          var typeProjet = component.find("typeProjet");
          newItem.orm_typeProjet__c = typeProjet.get("v.value");
          var currency = component.find("currency");
          newItem.orm_currency__c = currency.get("v.value");
          var industrySector = component.find("industrySector");
          newItem.orm_clientIndustrySector__c = industrySector.get("v.value");
          var schedule = component.find("schedule");
          newItem.orm_schedule__c = schedule.get("v.value");
          
          var riskManager = component.find("inProjetRM");
          newItem.orm_riskManager__c = riskManager.get("v.value");
          var projectManager = component.find("projectManager");
          newItem.orm_projetManager__c = projectManager.get("v.value");
        }
        if(ta.get("v.value")== 'Processus'){
          var statusProcessus = component.find("statusProcessus");
          newItem.orm_statusAssessment__c = statusProcessus.get("v.value");
          var pilote = component.find("pilote");
          newItem.orm_pilote__c = pilote.get("v.value");
          var copilote = component.find("copilote");
          newItem.orm_copilote__c = copilote.get("v.value");
        }
        if(ta.get("v.value")== 'Organisation'){
          var statusOrganisation = component.find("statusOrganisation");
          newItem.orm_statusAssessment__c = statusOrganisation.get("v.value");
          var riskManager = component.find("organisationRiskManager");
          newItem.orm_riskManager__c = riskManager.get("v.value");
          var organisationManager = component.find("organisationManager");
          newItem.orm_organisationManager__c = organisationManager.get("v.value");
          var industrySectorOrganisation = component.find("industrySectorOrganisation");
          newItem.orm_organisationIndustrySector__c = industrySectorOrganisation.get("v.value");
          var country = component.find("country");
          newItem.orm_pays__c = country.get("v.value");
          var region = component.find("region");
          newItem.orm_region__c = region.get("v.value");
          var currency = component.find("currencyOrganisation");
          newItem.orm_currency__c = currency.get("v.value");
          var size = component.find("size");
          newItem.orm_size__c = size.get("v.value");
          var budget = component.find("budgetOrganissation");
          newItem.orm_budgetOrganisation__c = budget.get("v.value");
        }
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
				    if(newItem.Id == null){
				      toastEvent.setParams({
                         'message' : newItem.orm_typeAssessment__c+' '+$A.get("$Label.c.orm_success_created"),
                         'type' : 'success',
                         'mode' : 'dismissible'
                       });
				    }else{
				      toastEvent.setParams({
                         'message' : newItem.orm_typeAssessment__c+' '+$A.get("$Label.c.orm_success_updated"),
                         'type' : 'success',
                         'mode' : 'dismissible'
                       });
				    }
                   toastEvent.fire();  
                    
                }else{
                   alert($A.get("$Label.c.orm_error"));
                }
            });
        $A.enqueueAction(action);
    },
   
	onChangeProjectManager : function(component, event, helper)
    {
	    component.set("v.displaySaveCancelBtn",true);
		component.find("projectManager").set("v.value", event.getSource().get("v.value"));
		var field = $A.get("$Label.c.orm_projectManager_label");
        var description = $A.get("$Label.c.orm_projectManager_description");
	    helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeRiskManagerTypeProjet : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("inProjetRM").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_risk_manager_label");
        var description = $A.get("$Label.c.orm_riskManagerProject_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeOrganisationManager : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("organisationManager").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_organisatio_manager_label");
        var description = $A.get("$Label.c.orm_organisationManager_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeInOrganisationRiskManager : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("organisationRiskManager").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_risk_manager_label");
        var description = $A.get("$Label.c.orm_organisationRiskManager_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeIndSector : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("industrySector").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_industry_sector_label");
        var description = $A.get("$Label.c.orm_industrySectorClient_description"); 
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeOrganisationIndSector : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("industrySectorOrganisation").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_industry_sector_label"); 
        var description = $A.get("$Label.c.orm_industrySectorOrg_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeCurrency : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("currency").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_currency_label");
        var description = $A.get("$Label.c.orm_currency_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeCurrencyOrganisation : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("currencyOrganisation").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_currency_label");
        var description = $A.get("$Label.c.orm_currencyOrg_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeSchedule : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("schedule").set("v.value", event.getSource().get("v.value"));
	},
	onChangeStatusProjet : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("statusProjet").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_status_label");
        var description = $A.get("$Label.c.orm_statusProject_description"); 
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeStatusProcessus : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("statusProcessus").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_status_label");
        var description = $A.get("$Label.c.orm_statusProcessus_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeStatusOrganisation : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("statusOrganisation").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_status_label");
        var description = $A.get("$Label.c.orm_statusOrg_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeCountry : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("country").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_country_label");
        var description = $A.get("$Label.c.orm_country_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeRegion : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("region").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_region_label");
        var description = $A.get("$Label.c.orm_region_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangePlannedSD : function(component, event, helper)
    {
       component.set("v.displaySaveCancelBtn", true);
    },
    onChangePlannedED : function(component, event, helper)
    {
       component.set("v.displaySaveCancelBtn", true);
    },
    onChangeApplicationDate : function(component, event, helper)
    {
       component.set("v.displaySaveCancelBtn", true);
    },
    sendApplicationDateToFD : function(component, event, helper)
    {
       var field = $A.get("$Label.c.orm_applicationDate_label");
       var description = $A.get("$Label.c.orm_applicationDate_description");
       helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    sendPlannedEndDateToFD : function(component, event, helper)
    {
       var field = $A.get("$Label.c.orm_plannedEndDate_label");
       var description = $A.get("$Label.c.orm_plannedEndDate_description");
       helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    sendPlannedStartDateToFD : function(component, event, helper)
    {
       var field = $A.get("$Label.c.orm_plannedStartDate_label");
       var description = $A.get("$Label.c.orm_plannedStartDate_description");
       helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
	onChangePilote : function(component, event, helper)
    {
       component.set("v.displaySaveCancelBtn", true);
       component.find("pilote").set("v.value", event.getSource().get("v.value"));
       var field = $A.get("$Label.c.orm_pilot_label");
       var description = $A.get("$Label.c.orm_pilot_description");
       helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeCopilote : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("copilote").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_copilot_label");  
        var description = $A.get("$Label.c.orm_copilot_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	
    onChangeOrganisation : function(component, event, helper){
        var field = $A.get("$Label.c.orm_organisationUnit_label");
        var description = $A.get("$Label.c.orm_organisationUnit_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
        
    	var newItem = component.get("v.assessmentData");
    	
    	newItem.orm_organisation__c = component.find("organisation").get("v.value");
        var action = component.get('c.add');
        action.setParams({"item": newItem});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                
                var actiongetAssessment = component.get('c.getAssessment');
		        actiongetAssessment.setParams({"idAss": component.get("v.assessmentData").Id });
		        actiongetAssessment.setCallback(this, function(response){
		            var state = response.getState();
		            if(state === 'SUCCESS'){
		                
		                component.set('v.assessmentData', response.getReturnValue());
		                var toast = $A.get('e.force:showToast');
		                toast.setParams({
			            	'message' : component.get("v.assessmentData").orm_organisation__r.Name+' '+$A.get("$Label.c.orm_success_associated"),
			                'type' : 'success',
			                'mode' : 'dismissible'
			            });
			            toast.fire();
            
		            } else {
		                alert($A.get("$Label.c.orm_update_failed"));
		            }
		        });
		        $A.enqueueAction(actiongetAssessment);
            
            } else {
                alert($A.get("$Label.c.orm_update_failed"));
            }
        });
        $A.enqueueAction(action);
	},
    
    closeFielDescript : function(component, event, helper) {
        component.set("v.closeFieldDescription", true);
    },

    openOrganisationNew : function(component, event, helper){
        var assessment = component.get('v.assessmentData');
		var evt = $A.get("e.c:OrmOpenNewOrganisationEvt");
		evt.setParams({
			"idAssessment" : assessment.Id
		});
		evt.fire();
    },
    
    refreshListOrganisation : function(component, event, helper){
        var actionOrgs = component.get("c.getOrganisations");
        actionOrgs.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allOrganisation', response.getReturnValue());
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        $A.enqueueAction(actionOrgs);
    },
    onChangeTypeAssessment : function(component,event,helper){ 
        if(event.getSource().get("v.value").trim() != '' || event.getSource().get("v.value").trim() != '---None---'){ 
            component.find("typeAssessment").set("v.value", event.getSource().get("v.value")); 
             var typeAss = event.getSource().get("v.value");
             helper.verifTypeAssessment(component, event, helper, typeAss);          
        }
        var field = $A.get("$Label.c.orm_type_assessment");
        var description = $A.get("$Label.c.orm_description_type_assessment");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    
    onChangeTypeProjet : function(component,event,helper){ 
        component.set("v.displaySaveCancelBtn", true);
        if(event.getSource().get("v.value").trim() != ''){ 
            component.find("typeProjet").set("v.value", event.getSource().get("v.value")); 
        }
        var field = $A.get("$Label.c.orm_projectType_label");
        var description = $A.get("$Label.c.orm_projectTypeDescription");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    
    onNameProjectChange : function(component,event,helper){ 
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.displaySaveCancelBtn",true);
        }
    },
    onObjectifProjectChange : function(component,event,helper){ 
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.displaySaveCancelBtn",true);
        }
    },
    sendProjectNameToFD  : function(component,event,helper){ 
        var field = $A.get("$Label.c.orm_projectName_label");
        var description = $A.get("$Label.c.orm_projectNameDescription");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    
    onTitleChange : function(component,event,helper){ 
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.displaySaveCancelBtn",true);
        }
    },
    onChangeDescriptionProject : function(component,event,helper){ 
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.displaySaveCancelBtn",true);
        }
    },
    
    onchangeDescriptionOrganisation : function(component,event,helper){ 
       component.set("v.displaySaveCancelBtn",true);
    },
     
    onchangeObjectifOrganisation : function(component,event,helper){ 
       component.set("v.displaySaveCancelBtn",true);
    },
     
    onChangeClientName : function(component,event,helper){ 
       component.set("v.displaySaveCancelBtn",true);
    },
    
    onChangeBudgetCommercial : function(component,event,helper){ 
       component.set("v.displaySaveCancelBtn",true);
    },
    
    sendDesciptionBudgetCommercial  : function(component,event,helper){ 
        var field = 'Commercial Budget';
        var description = 'Description Commercial Budget';
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
     
    sendDesciptionClientName  : function(component,event,helper){ 
        var field = 'Client Name';
        var description = 'Description Client Name';
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
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
    
    sendDescriptionSearchToFD : function(component,event,helper){ 
    	component.set("v.closeFieldDescription",false);
        var field =  event.getParam("nomField");
        var description = event.getParam("descriptionField");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    
    onChangeBudgetOrganisation : function(component,event,helper){ 
        component.set("v.displaySaveCancelBtn", true);
    	component.find("size").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_budget_label");
        var description = $A.get("$Label.c.orm_budget_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    
    onChangeSize : function(component, event, helper) {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("size").set("v.value", event.getSource().get("v.value"));
    	var field = $A.get("$Label.c.orm_size_label");
        var description = $A.get("$Label.c.orm_size_description");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
        
    },
    
    cancel : function(component, event, helper){
       component.set("v.displaySaveCancelBtn",false);
    },
    
    backToTopFunction: function(component, event, helper){
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
   },
   
   afterAssociateAssessmentRisk : function(component, event, helper){
   
        component.set("v.isEmptyListAssessmentRisk", false);
        var actionGetIdFirstAssessmentRisk = component.get("c.getIdFirstAssessmentRisk");
	    actionGetIdFirstAssessmentRisk.setParams({"idAssessment": component.get("v.assessmentData").Id});
	    actionGetIdFirstAssessmentRisk.setCallback(this, function(response){
	        var state = response.getState();
	        if(state === 'SUCCESS'){
	            component.set('v.idAssessmentRisk', response.getReturnValue());
	        } else {
	            alert($A.get("$Label.c.orm_not_found"));
	        }
	    });
	    $A.enqueueAction(actionGetIdFirstAssessmentRisk);
   },
   
   afterdeletingAssessmentRisk : function(component, event, helper){
        var actionGetIdFirstAssRisk = component.get("c.ifListNotEmptyGetIdFirstAssessmentRisk");
	    actionGetIdFirstAssRisk.setParams({"idAssessment": component.get("v.assessmentData").Id});
	    actionGetIdFirstAssRisk.setCallback(this, function(response){
	        var state = response.getState();
	        if(state === 'SUCCESS'){
	            var idAssRisk = response.getReturnValue();
	            console.log(idAssRisk)
	            if(idAssRisk == null){
	               component.set("v.isEmptyListAssessmentRisk", true);
	            }else{
	                    component.set('v.idAssessmentRisk', idAssRisk);
	                    
	                    var actionGetIdFirstMeasure = component.get("c.ifListNotEmptyGetIdFirstMeasure");
		                actionGetIdFirstMeasure.setParams({"idAssessmentRisk": component.get("v.idAssessmentRisk")});
				        actionGetIdFirstMeasure.setCallback(this, function(response){
				            var state = response.getState();
				            if(state === 'SUCCESS'){
				                var idMeasure = response.getReturnValue();
					            console.log(idMeasure)
					            if(idMeasure == null){
					               component.set("v.isEmptyListMeasure", true);
					            }else{
					               component.set('v.idMeasure', idMeasure);
					            }
				            
				            } else { 
				                alert($A.get("$Label.c.orm_not_found"));
				            }
				        });
				        $A.enqueueAction(actionGetIdFirstMeasure);
	           
	            }
	            
	        } else {
	            alert($A.get("$Label.c.orm_not_found"));
	        }
	    });
	    $A.enqueueAction(actionGetIdFirstAssRisk);
   },
   
   afterAddingMeasure : function(component, event, helper){
	    component.set('v.idMeasure', event.getParam("idMeasure"));
	    component.set("v.isEmptyListMeasure", false);
   },
   
   showActivity : function(component, event, helper){
        //console.log("id Activity dans AssessmentLayout"+ event.getParam("idActivity"))
        component.set("v.showContextActivity", false);
        component.set("v.showContextActivityShow", true);
	    var evt = $A.get("e.c:OrmSendIdActivityEvt");
        evt.setParams({
            "idActivity": event.getParam("idActivity")
        });
        evt.fire();
   },
})