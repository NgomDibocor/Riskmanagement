({
    fetchPicklist : function(component, event) {        
        var action = component.get('c.getSelectOptions');
        action.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_typeAssessment__c'});
        var opts = [];
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var allValues = response.getReturnValue();
 
                if (allValues != undefined && allValues.length > 0) {
                    opts.push("--- None ---");
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push(allValues[i]);
                }
                component.set('v.allTypeAssessment', opts);
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionOrgs = component.get("c.getOrganisations");
        actionOrgs.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.allOrganisation', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(action);
        $A.enqueueAction(actionOrgs);
	},
   
    activeContext : function(component, event, helper) {
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
        component.set("v.showRiskIdentif", false);
        component.set("v.showRiskAnalyse", false);
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
    },
    activeContext2 : function(component, event, helper) {
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
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
    },
    activeContextActivity : function(component, event, helper) {
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
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
    },
    activeContextWorkshop : function(component, event, helper) {
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
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
    },
    activeRiskIdentif : function(component, event, helper) {
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
        component.set("v.showRiskTreatment", false);
        component.set("v.showActionPlan", false);
    },
    activeRiskAnalye : function(component, event, helper) {
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active fruits tab
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
    },
    activeRiskTreatment : function(component, event, helper) {
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active fruits tab
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
        component.set("v.showRiskTreatment", true);
        component.set("v.showActionPlan", false);
    },
    
    activeActionPlan  : function(component, event, helper) {
        var tab1 = component.find('contextId');
        var tab2 = component.find('riskIdentifId');
        var tab3 = component.find('riskAnalyseId');
        var tab4 = component.find('riskTreatmentId');
        var tab5 = component.find('actionPlanId');
        
        //show and Active fruits tab
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
    },  
    
    sendValuesToFieldDescription  : function(component, event, helper, field, description) {
       component.set("v.closeFieldDescription",false);
            var evt = $A.get("e.c:OrmSendValuesToFieldDescriptionEvt");
            evt.setParams({
				"nomField" : field,
				"descriptionField" : description
			});
		    evt.fire();
    }
})