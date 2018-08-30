
({
    fetchPicklist : function(component, event) { 
        if(component.get("v.showAssessmentRisk")== true){
           var evt = $A.get("e.c:OrmActiveRiskAnalyeCmpEvt");
           evt.setParams({
             "idAssessmentRisk": component.get("v.idAssessmentRisk")
           });
           evt.fire();
         }    
         if(component.get("v.showRiskTreatment")== true){
           var evt = $A.get("e.c:OrmActiveRiskTraitementCmpEvt");
           evt.setParams({
             "idMeasure": component.get("v.idMeasure")
           });
           evt.fire();
         }  
        var actionTypeAssessment = component.get('c.getSelectOptions');
        actionTypeAssessment.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_typeAssessment__c'});
        var opts = [];
        actionTypeAssessment.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValues = response.getReturnValue();
                if (allValues != undefined && allValues.length > 0) {
                    var none="---None---";
                    opts.push(none);
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push(allValues[i]);
                }
                component.set('v.allTypeAssessment', opts);
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionOrgs = component.get("c.getOrganisations");
        actionOrgs.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allOrganisation', response.getReturnValue());
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionTypeProjet = component.get('c.getSelectOptions');
        actionTypeProjet.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_typeProjet__c'});
        var opts2 = [];
        actionTypeProjet.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValuesTP = response.getReturnValue();
                if (allValuesTP != undefined && allValuesTP.length > 0) {
                    var none="---None---";
                    opts2.push(none);
                }
                for (var i = 0; i < allValuesTP.length; i++) {
                    opts2.push(allValuesTP[i]);
                }
                component.set('v.allTypeProjet', opts2);
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionStatus = component.get('c.getSelectOptions');
        actionStatus.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_statusAssessment__c'});
        var opts3 = [];
        actionStatus.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValuesStatus = response.getReturnValue();
                for (var i = 0; i < allValuesStatus.length; i++) {
                    opts3.push(allValuesStatus[i]);
                }
                component.set('v.allStatus', opts3);
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionCurrency = component.get('c.getSelectOptions');
        actionCurrency.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_currency__c'});
        var opts4 = [];
        actionCurrency.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValuesCurrency = response.getReturnValue();
                for (var i = 0; i < allValuesCurrency.length; i++) {
                    opts4.push(allValuesCurrency[i]);
                }
                component.set('v.allCurrency', opts4);
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionSchedule = component.get('c.getSelectOptions');
        actionSchedule.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_schedule__c'});
        var opts5 = [];
        actionSchedule.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValuesSchedule = response.getReturnValue();
                for (var i = 0; i < allValuesSchedule.length; i++) {
                    opts5.push(allValuesSchedule[i]);
                }
                component.set('v.allSchedule', opts5);
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionSector = component.get("c.getSelectOptions");
        actionSector.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_clientIndustrySector__c'});
        actionSector.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allIndustrySector', response.getReturnValue());
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionUser = component.get("c.getUsers");
        actionUser.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allUser', response.getReturnValue());
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionOrganisationSectorInd = component.get("c.getSelectOptions");
        actionOrganisationSectorInd.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_organisationIndustrySector__c'});
        actionOrganisationSectorInd.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allOrganisationIndustrySector', response.getReturnValue());
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        var actionCountry = component.get("c.getSelectOptions");
        actionCountry.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_pays__c'});
        actionCountry.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allCountry', response.getReturnValue());
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });

        var actionRegion = component.get("c.getSelectOptions");
        actionRegion.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_region__c'});
        actionRegion.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allRegion', response.getReturnValue());
                //Hide the Spinner
                var evtSpinner = $A.get("e.c:OrmHideSpinnerEvt");
	            evtSpinner.fire(); 
            } else {
                alert($A.get("$Label.c.orm_not_found"));
            }
        });
        $A.enqueueAction(actionTypeAssessment);
        $A.enqueueAction(actionOrgs);
        $A.enqueueAction(actionTypeProjet);
        $A.enqueueAction(actionStatus);
        $A.enqueueAction(actionCurrency);
        $A.enqueueAction(actionSchedule);
        $A.enqueueAction(actionSector);
        $A.enqueueAction(actionUser);
        $A.enqueueAction(actionCountry);
        $A.enqueueAction(actionRegion);
	},
   
    verifTypeAssessment  : function(component, event, helper, typeAssessment) {
    if(typeAssessment == 'Organisation'){
      component.set("v.typeOrganisation", true);
      component.set("v.typeProcessus", false);
      component.set("v.typeProjet", false);
    }
    if(typeAssessment == 'Processus'){
      component.set("v.typeOrganisation", false);
      component.set("v.typeProcessus", true);
      component.set("v.typeProjet", false);
    }
    if(typeAssessment == 'Projet'){
      component.set("v.typeOrganisation", false);
      component.set("v.typeProcessus", false);
      component.set("v.typeProjet", true);
    }
   },
   // test
   activeContext : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active fruits tab
        $A.util.removeClass(tab1, 'slds-is-active');
        $A.util.addClass(tab1, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
 
        $A.util.removeClass(tab3, 'slds-is-current');
        $A.util.addClass(tab3, 'slds-is-active');
        
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", true);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showListCauseAndImpact", false);
        component.set("v.showListMeasure", false);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);  
        component.set("v.showChevronleft", false); 
        component.set("v.showChevronright", true);        
    },
    activeContext2 : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active fruits tab
        $A.util.removeClass(tab1, 'slds-is-active');
        $A.util.addClass(tab1, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
 
        $A.util.removeClass(tab3, 'slds-is-current');
        $A.util.addClass(tab3, 'slds-is-active');
        
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", true);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showListCauseAndImpact", false);
        component.set("v.showListMeasure", false);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
        component.set("v.showChevronleft", true);  
        component.set("v.showChevronright", true); 
    },
    activeContextActivity : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active fruits tab
        $A.util.removeClass(tab1, 'slds-is-active');
        $A.util.addClass(tab1, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
 
        $A.util.removeClass(tab3, 'slds-is-current');
        $A.util.addClass(tab3, 'slds-is-active');
        
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", true);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showListCauseAndImpact", false);
        component.set("v.showListMeasure", false);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
        component.set("v.showChevronleft", true);   
        component.set("v.showChevronright", true);
    },
    activeContextWorkshop : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active fruits tab
        $A.util.removeClass(tab1, 'slds-is-active');
        $A.util.addClass(tab1, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
 
        $A.util.removeClass(tab3, 'slds-is-current');
        $A.util.addClass(tab3, 'slds-is-active');
        
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", true);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showListCauseAndImpact", false);
        component.set("v.showListMeasure", false);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
        component.set("v.showChevronleft", true);   
        component.set("v.showChevronright", true);
    },
    // this methode actives the action Risk Identification tab
    activeRiskIdentif : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active fruits tab
        $A.util.removeClass(tab2, 'slds-is-active');
        $A.util.addClass(tab2, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab1, 'slds-is-current');
        $A.util.addClass(tab1, 'slds-is-active');
 
        $A.util.removeClass(tab3, 'slds-is-current');
        $A.util.addClass(tab3, 'slds-is-active');
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", true);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showListCauseAndImpact", false);
        component.set("v.showListMeasure", false);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
        component.set("v.showChevronleft", true);
        component.set("v.showChevronright", false);
        
           
    },
    
    // this methode actives the action Risk Analye tab
    activeRiskAnalye : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active Risk Analye tab
        $A.util.removeClass(tab3, 'slds-is-active');
        $A.util.addClass(tab3, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab1, 'slds-is-current');
        $A.util.addClass(tab1, 'slds-is-active');
 
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", true);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
        component.set("v.showChevronleft", true); 
        component.set("v.showChevronright", true);  
    },
    activeRiskAnalyeListCauseAndImpact : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active Risk Analye tab
        $A.util.removeClass(tab3, 'slds-is-active');
        $A.util.addClass(tab3, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab1, 'slds-is-current');
        $A.util.addClass(tab1, 'slds-is-active');
 
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showListCauseAndImpact", true);
        component.set("v.showListMeasure", false);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
        component.set("v.showChevronleft", true);   
        component.set("v.showChevronright", true);
    },
    activeRiskAnalyeListMeasure : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active Risk Analye tab
        $A.util.removeClass(tab3, 'slds-is-active');
        $A.util.addClass(tab3, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab1, 'slds-is-current');
        $A.util.addClass(tab1, 'slds-is-active');
 
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showListCauseAndImpact", false);
        component.set("v.showListMeasure", true);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
        component.set("v.showChevronleft", true);   
        component.set("v.showChevronright", false);
    },
    
    // this methode actives the action Risk Treatment tab
    activeRiskTreatment : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        $A.util.removeClass(tab4, 'slds-is-active');
        $A.util.addClass(tab4, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab1, 'slds-is-current');
        $A.util.addClass(tab1, 'slds-is-active');
 
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
        $A.util.removeClass(tab3, 'slds-is-current');
        $A.util.addClass(tab3, 'slds-is-active');
        $A.util.removeClass(tab5, 'slds-is-current');
        $A.util.addClass(tab5, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showListCauseAndImpact", false);
        component.set("v.showListMeasure", false);
        component.set("v.showRiskTreatment", true);
        component.set("v.showActionPlan", false);
        component.set("v.showChevronleft", true); 
        component.set("v.showChevronright", true);  
    },
    
    // this methode actives the action plan tab
    activeActionPlan  : function(component, event, helper) {
        component.set("v.closeFieldDescription",true);
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active action plan tab
        $A.util.removeClass(tab5, 'slds-is-active');
        $A.util.addClass(tab5, 'slds-is-current');
        // Hide and deactivate others tab
        $A.util.removeClass(tab1, 'slds-is-current');
        $A.util.addClass(tab1, 'slds-is-active');
 
        $A.util.removeClass(tab2, 'slds-is-current');
        $A.util.addClass(tab2, 'slds-is-active');
        $A.util.removeClass(tab3, 'slds-is-current');
        $A.util.addClass(tab3, 'slds-is-active');
        $A.util.removeClass(tab4, 'slds-is-current');
        $A.util.addClass(tab4, 'slds-is-active');
        
        component.set("v.showContext", false);
        component.set("v.showContext2", false);
        component.set("v.showContextActivity", false);
        component.set("v.showContextWorkshop", false);
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", true);
        component.set("v.showChevronleft", true);   
        component.set("v.showChevronright", true);
    },
      
    
    
})