({
	/*
     * CreatedBy @David Diop
     *
     */
    doInit: function(component, event, helper) {
        var riskAssessmentId = event.getParam('riskAssessmentId');
	    component.set("v.assessmentRiskId" ,riskAssessmentId);
        var idAsssessmentRisk = component.get("v.assessmentRiskId");
        helper.fetchPicklist(component, event, idAsssessmentRisk);
      },
      
      updateAssessmentRisk : function(component, event, helper) {
	       var assessmentRisk = component.get("v.assessmentRiskData");
	       var assessment= component.get("v.assessmentRiskData.orm_assessment__c");
	       var risk = component.get("v.assessmentRiskData.orm_Risk__c");
	      
	       assessmentRisk.orm_assessment__c = assessment;
	       assessmentRisk.orm_Risk__c = risk;
	       if(component.get("v.assessmentData").orm_typeAssessment__c == 'Projet'){
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
		       var cost = component.find("cost");
		       assessmentRisk.orm_cost__c =cost.get("v.value");	
		       var healthAndSafety = component.find("healthAndSafety");
		       assessmentRisk.orm_healthAndSafety__c =healthAndSafety.get("v.value");
	       }
	       if(component.get("v.assessmentData").orm_typeAssessment__c == 'Organisation'){
		       var dateRisk=component.find("dateRisk");
		       assessmentRisk.orm_date__c =dateRisk.get("v.value");
		       var frequency = component.find("frequency");
		       assessmentRisk.orm_frequency__c =frequency.get("v.value");
		       var status = component.find("status");
		       assessmentRisk.orm_status__c =status.get("v.value");
		       var vulnerability = component.find("vulnerability");
		       assessmentRisk.orm_vulnerability__c =vulnerability.get("v.value");
		       var manageAbility = component.find("manageAbility");
		       assessmentRisk.orm_manageAbility__c =manageAbility.get("v.value");
	       }
	       if(component.get("v.assessmentData").orm_typeAssessment__c == 'Processus'){
	           var dateRisk=component.find("dateRisk");
		       assessmentRisk.orm_date__c =dateRisk.get("v.value");
		       var frequency = component.find("frequency");
		       assessmentRisk.orm_frequency__c =frequency.get("v.value");
		       var status = component.find("status");
		       assessmentRisk.orm_status__c =status.get("v.value");
		       var vulnerability = component.find("vulnerability");
		       assessmentRisk.orm_vulnerability__c =vulnerability.get("v.value");
		       var manageAbility = component.find("manageAbility");
		       assessmentRisk.orm_manageAbility__c =manageAbility.get("v.value");
	       }
	       
	       		 
	       var action = component.get('c.addAssessmentRisk');
	        action.setParams({
	            "item": assessmentRisk
	        });
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
	                            'message' :assessmentRisk.orm_Risk__r.Name+' '+$A.get("$Label.c.orm_success_updated"),
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
    	  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
	},
	 onFrequency : function(component, event, helper)
    {
	    var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("frequency").set("v.value", event.getSource().get("v.value"));
	},
	 onDate : function(component, event, helper)
    {
		  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
	},
	 
    onReputation: function(component, event, helper)
    {
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);	
	},
	onCost: function(component, event, helper)
    {
		 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
	},
	onHealthAndSafety: function(component, event, helper)
    {
		 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
	},
    onSecurity : function(component, event, helper)
    {
    	var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
	},
    onVulnerability: function(component, event, helper)
    {
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("vulnerability").set("v.value", event.getSource().get("v.value"));
	},
    onStatus : function(component, event, helper)
    {
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("status").set("v.value", event.getSource().get("v.value"));
	},
    onSchedule : function(component, event, helper)
    {
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("schedule").set("v.value", event.getSource().get("v.value"));
	},
    onProductionLoss:  function(component, event, helper)
    {
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("productionLoss").set("v.value", event.getSource().get("v.value"));
	},
    onManageAbility : function(component, event, helper)
    {
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("manageAbility").set("v.value", event.getSource().get("v.value"));
	},
	cancel : function(component, event, helper)
    {
        component.set("v.displaySaveCancelBtn",false);
    },
     sendDescriptionSearchToFD: function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.search_title_label"),
            "descriptionField": $A.get("$Label.c.search_description_title")
        });
        evt.fire();
    },
	
})