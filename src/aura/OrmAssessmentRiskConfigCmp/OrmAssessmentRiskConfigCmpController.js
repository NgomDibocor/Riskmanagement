({
	/*
     * CreatedBy @David Diop
     *
     */
    doInit: function(component, event, helper) {
    var riskAssessmentId = event.getParam('riskAssessmentId');
		console.log("bien   " + riskAssessmentId);
		component.set("v.assessmentRiskId" ,riskAssessmentId);
        var idAsssessmentRisk = component.get("v.assessmentRiskId");
        var actionOrgs = component.get("c.findAssessmentRisk");
        actionOrgs.setParams({
            "item": idAsssessmentRisk
           
        });
       // component.set("v.categorieRisk", item);
        actionOrgs.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') { 
                component.set('v.assessmentRiskData', response.getReturnValue());
            } else {

                alert("l'Element n'a pas été retrouvé");
            }
        });
        
         var actionFrequency = component.get("c.getSelectOptions");
        actionFrequency.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_frequency__c'});
        actionFrequency.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.frequency', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        
         var actionmanageAbility = component.get("c.getSelectOptions");
        actionmanageAbility.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_manageAbility__c'});
        actionmanageAbility.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.manageAbility', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        var actionproductionLoss = component.get("c.getSelectOptions");
        actionproductionLoss.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_productionLoss__c'});
        actionproductionLoss.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.productionLoss', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        
         var actionschedule = component.get("c.getSelectOptions");
        actionschedule.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_schedule__c'});
        actionschedule.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.schedule', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        
         var actionstatus = component.get("c.getSelectOptions");
        actionstatus.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_status__c'});
        actionstatus.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.status', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        
         var actionvulnerability = component.get("c.getSelectOptions");
        actionvulnerability.setParams({"objObject": component.get("v.objInfo"), "fld": 'orm_vulnerability__c'});
        actionvulnerability.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.vulnerability', response.getReturnValue());
            } else {
                alert("l'Element n'a pas été retrouvé");
            }
        });
        $A.enqueueAction(actionvulnerability);
        $A.enqueueAction(actionstatus);
        $A.enqueueAction(actionschedule);
        $A.enqueueAction(actionproductionLoss);
        $A.enqueueAction(actionmanageAbility);
        $A.enqueueAction(actionFrequency);
        $A.enqueueAction(actionOrgs);
        
        
      },
      updateAssessmentRisk : function(component, event, helper) {
      var assessmentRisk = component.get("v.assessmentRiskData");
      var assessment= component.get("v.assessmentRiskData.orm_assessment__c");
      var risk = component.get("v.assessmentRiskData.orm_Risk__c");
      
      	assessmentRisk.orm_assessment__c = assessment;
      	assessmentRisk.orm_Risk__c = risk;
      	
       var dateRisk=component.find("dateRisk");
        assessmentRisk.orm_date__c =dateRisk.get("v.value");
       var environmentAndCommunity =  component.find("environmentAndCommunity");
          assessmentRisk.orm_environmentAndCommunity__c =environmentAndCommunity.get("v.value");
       var frequency = component.find("frequency");
          assessmentRisk.orm_frequency__c =frequency.get("v.value");
       var manageAbility = component.find("manageAbility");
            assessmentRisk.orm_manageAbility__c =manageAbility.get("v.value");
       var productionLoss = component.find("productionLoss");     
            assessmentRisk.orm_productionLoss__c =productionLoss.get("v.value");
       var schedule = component.find("schedule");
       	 	assessmentRisk.orm_schedule__c =schedule.get("v.value");
       var status = component.find("status");
       		assessmentRisk.orm_status__c =status.get("v.value");
       var vulnerability = component.find("vulnerability");
       		assessmentRisk.orm_vulnerability__c =vulnerability.get("v.value");
       var security = component.find("security");
       		assessmentRisk.orm_security__c =security.get("v.value");
       var reputation = component.find("reputation");
       		assessmentRisk.orm_reputation__c =reputation.get("v.value");
       		 
       var action = component.get('c.addAssessmentRisk');
        action.setParams({
            "item": assessmentRisk
        });
        alert(JSON.stringify(assessmentRisk));
        action
        .setCallback(
            this,
            function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                component.set("v.displaySaveCancelBtn", false);
                component.set("v.assessmentRiskData",response.getReturnValue());
                    var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            'message' :'crée avec success',
                            'type' : 'success',
                            'mode' : 'dismissible'
                        });

		                toastEvent.fire();
                    
                }
            });
        $A.enqueueAction(action);
    },
   
      
     onEnvironmentAndCommunity : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
        
    	
	},
	 onFrequency : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("frequency").set("v.value", event.getSource().get("v.value"));
	},
	 onDate : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	
	},
	 
    onReputation: function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	
	},
    onSecurity : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	
	},
    onVulnerability: function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("vulnerability").set("v.value", event.getSource().get("v.value"));
	},
    onStatus : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("status").set("v.value", event.getSource().get("v.value"));
	},
    onSchedule : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("schedule").set("v.value", event.getSource().get("v.value"));
	},
    onProductionLoss:  function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("productionLoss").set("v.value", event.getSource().get("v.value"));
	},
    onManageAbility : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",true);
    	component.find("manageAbility").set("v.value", event.getSource().get("v.value"));
	},
	cancel : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",false);
    },
	
})