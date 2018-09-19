({
	/*
     * CreatedBy @David Diop
     *
     */
    InstantantiateRisk: function(component, event, helper) {
        var riskAssessmentId = event.getParam('riskAssessmentId');
	    component.set("v.assessmentRiskId" ,riskAssessmentId);
        var idAsssessmentRisk = component.get("v.assessmentRiskId");
        helper.fetchPicklist(component, event, idAsssessmentRisk);
        helper.getProbality(component, event); 
       // helper.getHsseImpacts(component, event);
       //helper.getSliderDefault(component, event);
      },
      
      updateAssessmentRisk : function(component, event, helper) {
	       var assessmentRisk = component.get("v.assessmentRiskData");
	       var assessment= component.get("v.assessmentRiskData.orm_assessment__c");
	       var healthAndSafety =component.get("v.healthAndSafety");
	       var security =component.get("v.security");
	       var environmentAndCommunity =component.get("v.environmentAndCommunity");
	       console.log(healthAndSafety);
	       console.log(security);
	       console.log(environmentAndCommunity);
	       var risk = component.get("v.assessmentRiskData.orm_Risk__c");
	       assessmentRisk.orm_assessment__c = assessment;
	       assessmentRisk.orm_Risk__c = risk;
	       
		      // var dateRisk=component.find("dateRisk");
		      // assessmentRisk.orm_date__c =dateRisk.get("v.value");
		      // var environmentAndCommunity =  component.find("environmentAndCommunity");
		       assessmentRisk.orm_environmentAndCommunity__c =environmentAndCommunity;
		       var frequency = component.find("frequency");
		       assessmentRisk.orm_frequency__c =frequency.get("v.value");
		       var manageAbility = component.find("manageAbility");
		       assessmentRisk.orm_manageability__c =manageAbility.get("v.value");
		       var productionLoss = component.find("productionLoss");     
		       assessmentRisk.orm_productionLoss__c =productionLoss.get("v.value");
		       var schedule = component.find("schedule");
		       assessmentRisk.orm_schedule__c =schedule.get("v.value");
		       var status = component.find("status");
		       assessmentRisk.orm_status__c =status.get("v.value");
		       var vulnerability = component.find("vulnerability");
		       assessmentRisk.orm_vulnerability__c =vulnerability.get("v.value");
		      //var security = component.find("security");
		       assessmentRisk.orm_security__c =security;
		       var reputation = component.find("reputation");
		       assessmentRisk.orm_reputation__c =reputation.get("v.value");
		       var cost = component.find("cost");
		       assessmentRisk.orm_cost__c =cost.get("v.value");	
		       //var healthAndSafety = component.find("healthAndSafety");
		       assessmentRisk.orm_healthAndSafety__c =healthAndSafety;
		       var probability = component.find("slider1");
		       assessmentRisk.orm_probability__c = probability.get("v.value");
	       
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
    
    handleRangeChange : function(component, event, helper) { 
        component.set("v.displaySaveCancelBtn",true);
        component.set("v.sliderValue",component.find("slider1").get("v.value")) 
	    var sliderValue = component.find("slider1").get("v.value");
	    if(sliderValue >= component.get("v.RareData.orm_pourcentageMin__c") && sliderValue <= component.get("v.RareData.orm_pourcentageMax__c")){
		    document.getElementById("divColor").style.backgroundColor = "green";
		    document.getElementById("divColor").innerHTML= component.get("v.RareData.orm_probability__c");
	    }else if (sliderValue > component.get("v.unlikelyData.orm_pourcentageMin__c") && sliderValue <= component.get("v.unlikelyData.orm_pourcentageMax__c")){
		    document.getElementById("divColor").style.backgroundColor = "yellow";
		    document.getElementById("divColor").innerHTML= component.get("v.unlikelyData.orm_probability__c");
	    } else if (sliderValue > component.get("v.possibleData.orm_pourcentageMin__c") && sliderValue<= component.get("v.possibleData.orm_pourcentageMax__c")){
		    document.getElementById("divColor").style.backgroundColor = "orange";
		    document.getElementById("divColor").innerHTML= component.get("v.possibleData.orm_probability__c");
	    }else{
		    document.getElementById("divColor").style.backgroundColor = "red";
		    document.getElementById("divColor").innerHTML= component.get("v.probableData.orm_probability__c");
	    }
    },
     
    /**
	 * 
	 * @author David diop
	 * @version 1.0
	 * @description method for count the selected checkboxes
	 * @history 2018-09-05 : David diop - Implementation
	 */
	checkboxSelect : function(component, event, helper) {
		 component.set("v.displaySaveCancelBtn",true);
		 component.set('v.selected',event.getSource().getLocalId());
		 var selectedRadio = event.getSource().get("v.value");
		 
		 if(component.get("v.selected")=='r0')
		 {	 
			 document.getElementById('healthAndSafety').style.backgroundColor = "red";
			 document.getElementById("healthAndSafety").innerHTML= 'very high';
			 var  healthAndSafety =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.healthAndSafety" ,healthAndSafety);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 } if (component.get("v.selected")=='r1')
		 {
			 document.getElementById('healthAndSafety').style.backgroundColor = "orange";
			 document.getElementById("healthAndSafety").innerHTML= 'high';
			 var  healthAndSafety =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.healthAndSafety" ,healthAndSafety);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
		  if (component.get("v.selected")=='r2')
		 {
			 document.getElementById('healthAndSafety').style.backgroundColor = "yellow";
			 document.getElementById("healthAndSafety").innerHTML= 'Medium';
			 var  healthAndSafety =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.healthAndSafety" ,healthAndSafety);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
		 if(component.get("v.selected")=='r3')
		 {
		  document.getElementById('healthAndSafety').style.backgroundColor = "green";
		  document.getElementById("healthAndSafety").innerHTML= 'Low';
		  var  healthAndSafety =document.getElementById(component.get("v.selected")).innerHTML;
		  component.set("v.healthAndSafety" ,healthAndSafety);
		   var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
		 
		  if(component.get("v.selected")=='rr0'){
			 document.getElementById('security').style.backgroundColor = "red";
			 document.getElementById("security").innerHTML= 'very high';
			 var  security =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.security" ,security);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	          evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
			 
		 } 
		 
		 if (component.get("v.selected")=='rr1'){
			 document.getElementById('security').style.backgroundColor = "orange";
			 document.getElementById("security").innerHTML= 'high';
			 var  security =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.security" ,security);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	          evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
		 
		  if (component.get("v.selected")=='rr2'){
			 document.getElementById('security').style.backgroundColor = "yellow";
			 document.getElementById("security").innerHTML= 'Medium';
			 var  security =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.security" ,security);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	          evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
		 
		 if(component.get("v.selected")=='rr3'){
		  document.getElementById('security').style.backgroundColor = "green";
		  document.getElementById("security").innerHTML= 'Low';
		  var  security =document.getElementById(component.get("v.selected")).innerHTML;
		  component.set("v.security" ,security);
		   var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
		 
		  if(component.get("v.selected")=='rrr0'){
			 document.getElementById('environment').style.backgroundColor = "red";
			 document.getElementById("environment").innerHTML= 'very high';
			 var  environment =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.environmentAndCommunity" ,environment);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 } 
		 
		 if (component.get("v.selected")=='rrr1'){
			 document.getElementById('environment').style.backgroundColor = "orange";
			 document.getElementById("environment").innerHTML= 'high';
			 var  environment =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.environmentAndCommunity" ,environment);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
		 
		 if (component.get("v.selected")=='rrr2'){
			 document.getElementById('environment').style.backgroundColor = "yellow";
			 document.getElementById("environment").innerHTML= 'Medium';
			 var  environment =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.environmentAndCommunity" ,environment);
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
		 if(component.get("v.selected")=='rrr3'){
		  document.getElementById('environment').style.backgroundColor = "green";
		  document.getElementById("environment").innerHTML= 'Low';
		  var  environment =document.getElementById(component.get("v.selected")).innerHTML;
		  component.set("v.environmentAndCommunity" ,environment);
		   var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
	},
	
})