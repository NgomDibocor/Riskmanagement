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
        //helper.getBusinessImpacts(component, event);
       //helper.getSliderDefault(component, event);
      },
      
      updateAssessmentRisk : function(component, event, helper) {
	       var assessmentRisk = component.get("v.assessmentRiskData");
	       var assessment= component.get("v.assessmentRiskData.orm_assessment__c");
	       var healthAndSafety =component.get("v.healthAndSafety");
	       var reputation = component.get("v.reputation");
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
		      var riskManager = component.find("riskManager");
              assessmentRisk.orm_riskManager__c = riskManager.get("v.value");
		       assessmentRisk.orm_environmentAndCommunity__c =environmentAndCommunity;
		       var frequency = component.find("frequency");
		       assessmentRisk.orm_frequency__c =frequency.get("v.value");
		       var manageAbility = component.find("manageAbility");
		       assessmentRisk.orm_manageability__c =manageAbility.get("v.value");
		       var status = component.find("status");
		       assessmentRisk.orm_status__c =status.get("v.value");
		       var vulnerability = component.find("vulnerability");
		       assessmentRisk.orm_vulnerability__c =vulnerability.get("v.value");
		      //var security = component.find("security");
		       assessmentRisk.orm_security__c =security;
		       //var reputation = component.find("reputation");
		       assessmentRisk.orm_reputation__c =reputation;
		       var cost = component.find("cost1");
		       assessmentRisk.orm_cost__c =cost.get("v.value");	
		       //var healthAndSafety = component.find("healthAndSafety");
		       assessmentRisk.orm_healthAndSafety__c =healthAndSafety;
		       var probability = component.find("slider1");
		       assessmentRisk.orm_probability__c = probability.get("v.value");
		       var scheduleRisk = component.find("schedule1");
		       assessmentRisk.orm_ScheduleRisk__c = scheduleRisk.get("v.value");
		       var productionRisk = component.find("production");
		       assessmentRisk.orm_production_Loss_Risk__c = productionRisk.get("v.value");
	       
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
       /**
 *
 * @author David diop
 * @version 1.0
 * @description method description fields status
 * @history 
 * 2018-08-27 : David diop - Implementation
 */
    onChangeRiskManager : function(component, event, helper) {
        component.find("riskManager").set("v.value", event.getSource().get("v.value"));
     
        component.set("v.displaySaveCancelBtn", true);
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
     handleRangeChangeCost : function(component, event, helper) { 
        component.set("v.displaySaveCancelBtn",true);
	    var sliderValue = component.find("cost1").get("v.value");
	    if(sliderValue >= component.get("v.businessImpHighData.orm_costProjectBudgetMin__c") && sliderValue <= component.get("v.businessImpHighData.orm_costProjectBudgetMax__c")){
		    document.getElementById("cost").style.backgroundColor = "orange";
		    document.getElementById("cost").innerHTML= 'high';
	    }if (sliderValue >= component.get("v.businessImpMediumData.orm_costProjectBudgetMin__c") && sliderValue <= component.get("v.businessImpMediumData.orm_costProjectBudgetMax__c")){
		    document.getElementById("cost").style.backgroundColor = "yellow";
		    document.getElementById("cost").innerHTML= 'Medium';
	    } if (sliderValue >= component.get("v.businessImpLowData.orm_costProjectBudgetMin__c") && sliderValue<= component.get("v.businessImpLowData.orm_costProjectBudgetMax__c")){
		    document.getElementById("cost").style.backgroundColor = "green";
		    document.getElementById("cost").innerHTML='low' ;
	    } 
	    if (sliderValue >= component.get("v.businessImpVeryHighData.orm_costProjectBudgetMin__c") && sliderValue<= component.get("v.businessImpVeryHighData.orm_costProjectBudgetMax__c")){
		    document.getElementById("cost").style.backgroundColor = "red";
		    document.getElementById("cost").innerHTML='veryHigh' ;
	    }
        
        
    },
     handleRangeChangeSchedule : function(component, event, helper) { 
        component.set("v.displaySaveCancelBtn",true);
        component.set("v.sliderValue",component.find("slider1").get("v.value")) 
	    var sliderValue = component.find("schedule1").get("v.value");
	    if(sliderValue >= component.get("v.businessImpHighData.orm_scheduleProjectBaselineMin__c") && sliderValue <= component.get("v.businessImpHighData.orm_scheduleProjectBaselineMax__c")){
		    document.getElementById("schedule").style.backgroundColor = "orange";
		    document.getElementById("schedule").innerHTML= 'high';
	    }if (sliderValue >= component.get("v.businessImpMediumData.orm_scheduleProjectBaselineMin__c") && sliderValue <= component.get("v.businessImpMediumData.orm_scheduleProjectBaselineMax__c")){
		    document.getElementById("schedule").style.backgroundColor = "yellow";
		    document.getElementById("schedule").innerHTML= 'Medium';
	    } if (sliderValue >= component.get("v.businessImpLowData.orm_scheduleProjectBaselineMin__c") && sliderValue<= component.get("v.businessImpLowData.orm_scheduleProjectBaselineMax__c")){
		    document.getElementById("schedule").style.backgroundColor = "green";
		    document.getElementById("schedule").innerHTML='low' ;
	    } 
	    if (sliderValue >= component.get("v.businessImpVeryHighData.orm_scheduleProjectBaselineMin__c") && sliderValue<= component.get("v.businessImpVeryHighData.orm_scheduleProjectBaselineMax__c")){
		    document.getElementById("schedule").style.backgroundColor = "red";
		    document.getElementById("schedule").innerHTML='veryHigh' ;
	    } 
    },
     handleRangeChangeProduction : function(component, event, helper) { 
        component.set("v.displaySaveCancelBtn",true);
	    var sliderValue = component.find("production").get("v.value");
	    if(sliderValue >= component.get("v.businessImpLowData.orm_productionLossMin__c") && sliderValue <= component.get("v.businessImpLowData.orm_productionLossMax__c")){
		    document.getElementById("production").style.backgroundColor = "green";
		    document.getElementById("production").innerHTML= 'low';
	    }else if (sliderValue > component.get("v.businessImpMediumData.orm_productionLossMin__c") && sliderValue <= component.get("v.businessImpMediumData.orm_productionLossMax__c")){
		    document.getElementById("production").style.backgroundColor = "yellow";
		    document.getElementById("production").innerHTML= 'Medium';
	    } else if (sliderValue > component.get("v.businessImpHighData.orm_productionLossMin__c") && sliderValue<= component.get("v.businessImpHighData.orm_productionLossMax__c")){
		    document.getElementById("production").style.backgroundColor = "orange";
		    document.getElementById("production").innerHTML= 'High';
	    }else{
		    document.getElementById("production").style.backgroundColor = "red";
		    document.getElementById("production").innerHTML= 'VeryHigh';
	    }
    },
    checkboxSelectreputation  : function(component, event, helper) {
    	component.set("v.displaySaveCancelBtn",true);
		 component.set('v.selectedReputation',event.getSource().getLocalId());
		 
		 
		  if(component.get("v.selectedReputation")=='reputation1')
		 {	 
			 document.getElementById('reputation').style.backgroundColor = "red";
			 document.getElementById("reputation").innerHTML= 'very high';
			 var  reputation =document.getElementById(component.get("v.selectedReputation")).innerHTML;
			 component.set("v.reputation" ,reputation);
	       
		 } if (component.get("v.selectedReputation")=='reputation2')
		 {
			 document.getElementById('reputation').style.backgroundColor = "orange";
			 document.getElementById("reputation").innerHTML= 'high';
			 var  reputation =document.getElementById(component.get("v.selectedReputation")).innerHTML;
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         component.set("v.reputation" ,reputation);
		 }
		  if (component.get("v.selectedReputation")=='reputation3')
		 {
			 document.getElementById('reputation').style.backgroundColor = "yellow";
			 document.getElementById("reputation").innerHTML= 'Medium';
			 var  reputation =document.getElementById(component.get("v.selectedReputation")).innerHTML;
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        component.set("v.reputation" ,reputation);
		 }
		 if(component.get("v.selectedReputation")=='reputation4')
		 {
		  document.getElementById('reputation').style.backgroundColor = "green";
		  document.getElementById("reputation").innerHTML= 'Low';
		  var  reputation =document.getElementById(component.get("v.selectedReputation")).innerHTML;
		  component.set("v.reputation" ,reputation);
		
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
	}
	
})