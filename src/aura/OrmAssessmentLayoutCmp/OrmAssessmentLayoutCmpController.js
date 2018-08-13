({
    doInit : function(component, event, helper) {
       helper.fetchPicklist(component, event);
	},
    
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
   
	onChangeProjectManager : function(component, event, helper)
    {
	    component.set("v.displaySaveCancelBtn",true);
		component.find("projectManager").set("v.value", event.getSource().get("v.value"));
		var field = "Project Manager";
	    var description = "This field allows us to specify the Project Manager for this Project";
	    helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeRiskManagerTypeProjet : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("inProjetRM").set("v.value", event.getSource().get("v.value"));
    	var field = "Risk Manager";
        var description = "This field allows us to specify the Risk Manager for this Project";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeOrganisationManager : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("organisationManager").set("v.value", event.getSource().get("v.value"));
    	var field = "Organisation Manager";
        var description = "This field allows us to specify the Organisation Manager for this Organisation";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeInOrganisationRiskManager : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("organisationRiskManager").set("v.value", event.getSource().get("v.value"));
    	var field = "Organisation Manager";
        var description = "This field allows us to specify the Risk Manager for this Organisation";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeIndSector : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("industrySector").set("v.value", event.getSource().get("v.value"));
    	var field = "Industry Sector";
        var description = "This field allows us to specify the Industry Sector for the Client";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeOrganisationIndSector : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("industrySectorOrganisation").set("v.value", event.getSource().get("v.value"));
    	var field = "Organisation Industry Sector";
        var description = "This field allows us to specify the Industry Sector for the organisation";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeCurrency : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("currency").set("v.value", event.getSource().get("v.value"));
    	var field = "Currency";
        var description = "This field specifies the currency used";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeCurrencyOrganisation : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("currencyOrganisation").set("v.value", event.getSource().get("v.value"));
    	var field = "Currency";
        var description = "This field specifies the currency used in this organisation";
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
    	var field = "Status";
        var description = "This field specifies the status of the projet";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeStatusProcessus : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("statusProcessus").set("v.value", event.getSource().get("v.value"));
    	var field = "Status Processus";
        var description = "This field specifies the status of the process";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeStatusOrganisation : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("statusOrganisation").set("v.value", event.getSource().get("v.value"));
    	var field = "Status Organisation";
        var description = "This field specifies the status of the organisation";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeCountry : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("country").set("v.value", event.getSource().get("v.value"));
    	var field = "Country";
        var description = "This field specifies the country of organisation";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeRegion : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("region").set("v.value", event.getSource().get("v.value"));
    	var field = "Region";
        var description = "This field specifies the region of organisation";
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
       var field = "Application Date";
       var description = "This field defines the Application Date of process";
       helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    sendPlannedEndDateToFD : function(component, event, helper)
    {
       var field = "Planned End Date";
       var description = "This field defines the Planned End Date for this project";
       helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    sendPlannedStartDateToFD : function(component, event, helper)
    {
       var field = "Planned Start Date";
       var description = "This field defines the Planned Start Date for this project";
       helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
	onChangePilote : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("pilote").set("v.value", event.getSource().get("v.value"));
    	var field = "Pilot";
        var description = "This field allows us to specify the Pilot for this process";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	onChangeCopilote : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn", true);
    	component.find("copilote").set("v.value", event.getSource().get("v.value"));
    	var field = "Copilot";
        var description = "This field allows us to specify the copilot for this process";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
	},
	
    onChangeOrganisation : function(component, event, helper)
    {
    	var newItem = component.get("v.assessmentData");
    	newItem.orm_organisation__c = component.find("organisation").get("v.value");
        var action = component.get('c.add');
        action.setParams({"item": newItem});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.assessmentData', response.getReturnValue());
                var toast = $A.get('e.force:showToast');
                toast.setParams({
            	'message' : newItem.orm_organisation__c+' associated with success',
                'type' : 'success',
                'mode' : 'dismissible'
            });
            toast.fire();
            
            } else {
                alert("mise a jour echouée");
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
                alert("l'Element n'a pas été retrouvé");
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
        var field = "Project Type";
        var description = "This field allows us to specify what type of project we want to create";
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
        var field = "Project Name"
        var description = "This fiels represents the name of the project"
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
    
    /* @cretedBy: laye
	   @createdDate: 28/07/2018
     */
    openCauseNewCmp : function(component, event, helper){
    	/* after created the assessment we must get the assessment id
			var assessment = component.get('v.assessmentData');
         */
        var assessmentRiskId = "";
        var evt = $A.get("e.c:OrmNewCauseClickedEvt");
        evt.setParams({
        	"idAssessmentRisk" : assessmentRiskId
		});
		evt.fire();
    },
    onChangeCause : function(component, event, helper) {
    
    },
    sendDescriptionSearchToFD : function(component,event,helper){ 
    	component.set("v.closeFieldDescription",false);
        var field =  event.getParam("nomField");
        var description = event.getParam("descriptionField");
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    
    sendSizeToFD : function(component,event,helper){ 
    	component.set("v.closeFieldDescription",false);
        var field =  "Size";
        var description = "This field gives the number of employees for this organisation";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    sendBudgetOrganisationToFD : function(component,event,helper){ 
    	component.set("v.closeFieldDescription",false);
        var field =  "Budget";
        var description = "This field gives us the budget of this organisation";
        helper.sendValuesToFieldDescription(component, event, helper, field, description);
    },
    onChangeBudgetOrganisation : function(component,event,helper){ 
       component.set("v.displaySaveCancelBtn",true);
    },
    onChangeSize : function(component, event, helper) {
         component.set("v.displaySaveCancelBtn",true);
    },
    
    cancel : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",false);
    },
   
})