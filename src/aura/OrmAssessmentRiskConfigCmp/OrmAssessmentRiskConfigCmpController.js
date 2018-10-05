({
	/*
     * CreatedBy @David Diop
     *
     */
    InstantantiateRisk: function(component, event, helper) {
        var data = component.get("v.data");
        data.orm_probability__c = 'Low';
        console.log(JSON.stringify(data));      
        var riskAssessmentId = event.getParam('riskAssessmentId');
	    component.set("v.assessmentRiskId" ,riskAssessmentId);
        var idAsssessmentRisk = component.get("v.assessmentRiskId");
        helper.fetchPicklist(component, event, idAsssessmentRisk);
        helper.getProbality(component, event); 
      },
      updateAssessmentRisk : function(component, event, helper) {
	       var assessmentRisk = component.get("v.assessmentRiskData");
	       var assessment= component.get("v.assessmentRiskData.orm_assessment__c");
	       var healthAndSafety =component.get("v.healthAndSafety");
	       var reputation = component.get("v.reputation");
	       var security =component.get("v.security");
	       var cost =component.get("v.cost");
	       var schedule =component.get("v.schedule");
	       var production =component.get("v.production");
	       var environmentAndCommunity =component.get("v.environmentAndCommunity");
	       var risk = component.get("v.assessmentRiskData.orm_Risk__c");
	       assessmentRisk.orm_assessment__c = assessment;
	       assessmentRisk.orm_Risk__c = risk;
		      // var dateRisk=component.find("dateRisk");
		      // assessmentRisk.orm_date__c =dateRisk.get("v.value");
		      // var environmentAndCommunity =  component.find("environmentAndCommunity");
		      var riskManager = component.find("riskManager");
              assessmentRisk.orm_riskManager__c = riskManager.get("v.value");
		       assessmentRisk.orm_environmentAndCommunity__c =environmentAndCommunity;
		       var workingEnvironment = component.find("workingEnvironment");
		       assessmentRisk.orm_workingEnvironment__c = workingEnvironment.get("v.value");
		       var manageAbility = component.find("manageAbility");
		       assessmentRisk.orm_manageability__c =manageAbility.get("v.value");
		       var status = component.find("status");
		       assessmentRisk.orm_status__c =status.get("v.value");
		       var uncertainty = component.find("uncertainty");
		       assessmentRisk.orm_uncertainty__c =uncertainty.get("v.value");
		      //var security = component.find("security");
		       assessmentRisk.orm_security__c =security;
		       //var reputation = component.find("reputation");
		       assessmentRisk.orm_reputation__c =reputation;
		       //var cost = component.find("cost1");
		       assessmentRisk.orm_cost__c =cost;	
		       //var healthAndSafety = component.find("healthAndSafety");
		       assessmentRisk.orm_healthAndSafety__c =healthAndSafety;
		       var probability = component.find("slider1");
		       assessmentRisk.orm_probability__c = probability.get("v.value");
		       //var scheduleRisk = component.find("schedule1");
		       assessmentRisk.orm_ScheduleRisk__c = schedule;
		      // var productionRisk = component.find("production");
		       assessmentRisk.orm_production_Loss_Risk__c = production;
	       
	       var action = component.get('c.addAssessmentRisk');
	        action.setParams({
	            "item": assessmentRisk
	        });
	        action.setCallback(this,function(response) {
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
	                var idAsssessmentRisk = component.get("v.assessmentRiskId");
	                helper.fetchPicklist(component, event, idAsssessmentRisk);

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
	onChangeWorkingEnvironment : function(component, event, helper){
	    var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.orm_workingEnvironment_label"),
	            "descriptionField": 'Description working environment'
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("workingEnvironment").set("v.value", event.getSource().get("v.value"));
	},
	onChangeVulnerability : function(component, event, helper){
	    component.set("v.displaySaveCancelBtn",true);
	},
	sendVulnerabilityToFD : function(component, event, helper){
	    var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.orm_vulnerability_label"),
	            "descriptionField": 'Description vulnerability'
	        });
           evt.fire();
	},
	onDate : function(component, event, helper){
		  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
	},
    onChangeUncertainty: function(component, event, helper){
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.orm_uncertainty_assessmentRisk"),
	            "descriptionField": 'description Uncertainty'
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("uncertainty").set("v.value", event.getSource().get("v.value"));
	},
    onChangeStatus : function(component, event, helper){
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("status").set("v.value", event.getSource().get("v.value"));
	},
    onChangeManageAbility : function(component, event, helper){
    	 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
        component.set("v.displaySaveCancelBtn",true);
    	component.find("manageAbility").set("v.value", event.getSource().get("v.value"));
	},
	onChangeJustificationUncertainty : function(component, event, helper){
	   component.set("v.displaySaveCancelBtn",true);
	},
	sendJustificationUncertaintyToFD : function(component, event, helper){
	    var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.orm_justificationUncertainty_label"),
            "descriptionField": 'Description Justification'
        });
       evt.fire();
	},
	onChangeJustificationConsequence : function(component, event, helper){
	    component.set("v.displaySaveCancelBtn",true);
	},
	sendJustificationConsequenceToFD : function(component, event, helper){
	    var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": $A.get("$Label.c.orm_justificationConsequence_label"),
            "descriptionField": $A.get("$Label.c.orm_descriptionJustificationConsequence_label")
        });
       evt.fire();
	},
	cancel : function(component, event, helper){
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
    onProbabilityChange : function(component, event, helper) { 
        component.set("v.displaySaveCancelBtn",true);
        component.set("v.sliderValue",component.find("slider1").get("v.value")) 
	    var sliderValue = component.find("slider1").get("v.value");
	    if(sliderValue >= component.get("v.RareData.orm_pourcentageMin__c") && sliderValue <= component.get("v.RareData.orm_pourcentageMax__c")){
		    var data = component.get("v.data");
		    data.orm_probability__c = component.get("v.RareData.orm_probability__c");
		    component.set("v.data", data);
		    document.getElementById("divColor").style.backgroundColor = "green";
		    document.getElementById("divColor").innerHTML= component.get("v.RareData.orm_probability__c") + '(' + sliderValue +')';
	    }else if (sliderValue > component.get("v.unlikelyData.orm_pourcentageMin__c") && sliderValue <= component.get("v.unlikelyData.orm_pourcentageMax__c")){
		    var data = component.get("v.data");
		    data.orm_probability__c = component.get("v.unlikelyData.orm_probability__c");
		    component.set("v.data", data);
		    document.getElementById("divColor").style.backgroundColor = "yellow";
		    document.getElementById("divColor").innerHTML= component.get("v.unlikelyData.orm_probability__c")+ '(' + sliderValue +')';
	    } else if (sliderValue > component.get("v.possibleData.orm_pourcentageMin__c") && sliderValue<= component.get("v.possibleData.orm_pourcentageMax__c")){
		    var data = component.get("v.data");
		    data.orm_probability__c = component.get("v.possibleData.orm_probability__c");
		    component.set("v.data", data);
		    document.getElementById("divColor").style.backgroundColor = "orange";
		    document.getElementById("divColor").innerHTML= component.get("v.possibleData.orm_probability__c")+ '(' + sliderValue +')';
	    }else{
	        
	        var data = component.get("v.data");
		    data.orm_probability__c = component.get("v.probableData.orm_probability__c");
		    component.set("v.data", data);
		    
		    document.getElementById("divColor").style.backgroundColor = "red";
		    document.getElementById("divColor").innerHTML= component.get("v.probableData.orm_probability__c")+ '(' + sliderValue +')';
	    }
    },
     handleRangeChangeCost : function(component, event, helper) { 
        component.set("v.displaySaveCancelBtn",true);
	    var sliderValue = component.find("cost1").get("v.value");
	    if(sliderValue >= component.get("v.businessImpHighData.orm_costProjectBudgetMin__c") && sliderValue <= component.get("v.businessImpHighData.orm_costProjectBudgetMax__c")){
		    document.getElementById("cost").style.backgroundColor = "orange";
		    document.getElementById('cost').style.border = "2px solid #5B86BE";
		    document.getElementById("cost").innerHTML= 'High';
		    component.set("v.cost" ,sliderValue);
	    }if (sliderValue >= component.get("v.businessImpMediumData.orm_costProjectBudgetMin__c") && sliderValue <= component.get("v.businessImpMediumData.orm_costProjectBudgetMax__c")){
		    document.getElementById("cost").style.backgroundColor = "yellow";
		    document.getElementById('cost').style.border = "2px solid #5B86BE";
		    document.getElementById("cost").innerHTML= 'Medium';
		    component.set("v.cost" ,sliderValue);
	    } if (sliderValue >= component.get("v.businessImpLowData.orm_costProjectBudgetMin__c") && sliderValue<= component.get("v.businessImpLowData.orm_costProjectBudgetMax__c")){
		    document.getElementById("cost").style.backgroundColor = "green";
		    document.getElementById('cost').style.border = "2px solid #5B86BE";
		    document.getElementById("cost").innerHTML='Low' ;
		    component.set("v.cost" ,sliderValue);
	    } 
	    if (sliderValue >= component.get("v.businessImpVeryHighData.orm_costProjectBudgetMin__c") && sliderValue<= component.get("v.businessImpVeryHighData.orm_costProjectBudgetMax__c")){
		    document.getElementById("cost").style.backgroundColor = "red";
		    document.getElementById('cost').style.border = "2px solid #5B86BE";
		    document.getElementById("cost").innerHTML='Very High' ;
		    component.set("v.cost" ,sliderValue);
	    }
        
        
    },
     handleRangeChangeSchedule : function(component, event, helper) { 
        component.set("v.displaySaveCancelBtn",true);
        component.set("v.sliderValue",component.find("slider1").get("v.value")) 
	    var sliderValue = component.find("schedule1").get("v.value");
	    if(sliderValue >= component.get("v.businessImpHighData.orm_scheduleProjectBaselineMin__c") && sliderValue <= component.get("v.businessImpHighData.orm_scheduleProjectBaselineMax__c")){
		    document.getElementById("schedule").style.backgroundColor = "orange";
		    document.getElementById('schedule').style.border = "2px solid #5B86BE";
		    document.getElementById("schedule").innerHTML= 'High';
		    component.set("v.schedule" ,sliderValue);
	    }if (sliderValue >= component.get("v.businessImpMediumData.orm_scheduleProjectBaselineMin__c") && sliderValue <= component.get("v.businessImpMediumData.orm_scheduleProjectBaselineMax__c")){
		    document.getElementById("schedule").style.backgroundColor = "yellow";
		    document.getElementById('schedule').style.border = "2px solid #5B86BE";
		    document.getElementById("schedule").innerHTML= 'Medium';
		    component.set("v.schedule" ,sliderValue);
	    } if (sliderValue >= component.get("v.businessImpLowData.orm_scheduleProjectBaselineMin__c") && sliderValue<= component.get("v.businessImpLowData.orm_scheduleProjectBaselineMax__c")){
		    document.getElementById("schedule").style.backgroundColor = "green";
		    document.getElementById('schedule').style.border = "2px solid #5B86BE";
		    document.getElementById("schedule").innerHTML='Low' ;
		    component.set("v.schedule" ,sliderValue);
	    } 
	    if (sliderValue >= component.get("v.businessImpVeryHighData.orm_scheduleProjectBaselineMin__c") && sliderValue<= component.get("v.businessImpVeryHighData.orm_scheduleProjectBaselineMax__c")){
		    document.getElementById("schedule").style.backgroundColor = "red";
		    document.getElementById('schedule').style.border = "2px solid #5B86BE";
		    document.getElementById("schedule").innerHTML='Very High' ;
		    component.set("v.schedule" ,sliderValue);
	    } 
    },
     handleRangeChangeProduction : function(component, event, helper) { 
        component.set("v.displaySaveCancelBtn",true);
	    var sliderValue = component.find("production").get("v.value");
	    if(sliderValue >= component.get("v.businessImpLowData.orm_productionLossMin__c") && sliderValue <= component.get("v.businessImpLowData.orm_productionLossMax__c")){
		    document.getElementById("production").style.backgroundColor = "green";
		    document.getElementById('production').style.border = "2px solid #5B86BE";
		    document.getElementById("production").innerHTML= 'Low';
		    component.set("v.production" ,sliderValue);
	        
	    }else if (sliderValue > component.get("v.businessImpMediumData.orm_productionLossMin__c") && sliderValue <= component.get("v.businessImpMediumData.orm_productionLossMax__c")){
		    document.getElementById("production").style.backgroundColor = "yellow";
		    document.getElementById('production').style.border = "2px solid #5B86BE";
		    document.getElementById("production").innerHTML= 'Medium';
		    component.set("v.production" ,sliderValue);
		    
	    } else if (sliderValue > component.get("v.businessImpHighData.orm_productionLossMin__c") && sliderValue<= component.get("v.businessImpHighData.orm_productionLossMax__c")){
		    document.getElementById("production").style.backgroundColor = "orange";
		    document.getElementById('production').style.border = "2px solid #5B86BE";
		    document.getElementById("production").innerHTML= 'High';
		    component.set("v.production" ,sliderValue);
	    }else{
		    document.getElementById("production").style.backgroundColor = "red";
		    document.getElementById('production').style.border = "2px solid #5B86BE";
		    document.getElementById("production").innerHTML= 'Very High';
		    component.set("v.production" ,sliderValue);
	    }
    },
    checkboxSelectreputation  : function(component, event, helper) {
          component.set("v.displaySaveCancelBtn",true);
		  component.set('v.selectedReputation',event.getSource().getLocalId());
		  
		  if(component.get("v.selectedReputation")=='reputation1'){	 
			 document.getElementById('reputation').style.backgroundColor = "red";
			 document.getElementById('reputation').style.border = "2px solid #5B86BE"; 
			 document.getElementById("reputation").innerHTML= 'Very High';
			 var  reputation =document.getElementById(component.get("v.selectedReputation")).innerHTML;
			 component.set("v.reputation" ,reputation);
		     var data = component.get("v.data");
	         data.orm_reputation__c = 'VeryHigh'
	         component.set("v.data", data);
	       
		 } if (component.get("v.selectedReputation")=='reputation2'){
			 document.getElementById('reputation').style.backgroundColor = "orange";
			 document.getElementById('reputation').style.border = "2px solid #5B86BE"; 
			 document.getElementById("reputation").innerHTML= 'High';
			 var  reputation =document.getElementById(component.get("v.selectedReputation")).innerHTML;
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         component.set("v.reputation" ,reputation);
		     var data = component.get("v.data");
	         data.orm_reputation__c = 'High'
	         component.set("v.data", data);
		 }
		  if (component.get("v.selectedReputation")=='reputation3'){
			 document.getElementById('reputation').style.backgroundColor = "yellow";
			 document.getElementById('reputation').style.border = "2px solid #5B86BE"; 
			 document.getElementById("reputation").innerHTML= 'Medium';
			 var  reputation =document.getElementById(component.get("v.selectedReputation")).innerHTML;
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         component.set("v.reputation" ,reputation);
		     var data = component.get("v.data");
	         data.orm_reputation__c = 'Medium'
	         component.set("v.data", data);
		 }
		 if(component.get("v.selectedReputation")=='reputation4'){
			  document.getElementById('reputation').style.backgroundColor = "green";
			  document.getElementById('reputation').style.border = "2px solid #5B86BE"; 
			  document.getElementById("reputation").innerHTML= 'Low';
			  var  reputation =document.getElementById(component.get("v.selectedReputation")).innerHTML;
			  component.set("v.reputation" ,reputation);
			  
			  var data = component.get("v.data");
		      data.orm_reputation__c = 'Low'
		      component.set("v.data", data);
		
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
		 
		 if(component.get("v.selected")=='r0'){	 
			 document.getElementById('healthAndSafety').style.backgroundColor = "red";
			 document.getElementById('healthAndSafety').style.border = "2px solid #5B86BE";
			 document.getElementById("healthAndSafety").innerHTML= 'Very High';
			 var  healthAndSafety =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.healthAndSafety" ,healthAndSafety);
			 var data = component.get("v.data");
		     data.orm_healthAndSafety__c = 'VeryHigh';
		     component.set("v.data", data);
			 
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 } 
		 if (component.get("v.selected")=='r1'){
			 document.getElementById('healthAndSafety').style.backgroundColor = "orange";
			 document.getElementById('healthAndSafety').style.border = "2px solid #5B86BE";
			 document.getElementById("healthAndSafety").innerHTML= 'High';
			 var  healthAndSafety =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.healthAndSafety" ,healthAndSafety);
			 var data = component.get("v.data");
		     data.orm_healthAndSafety__c = 'High';
		     component.set("v.data", data);
			 
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 }
		 if (component.get("v.selected")=='r2'){
			 document.getElementById('healthAndSafety').style.backgroundColor = "yellow";
			 document.getElementById('healthAndSafety').style.border = "2px solid #5B86BE";
			 document.getElementById("healthAndSafety").innerHTML= 'Medium';
			 var  healthAndSafety =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.healthAndSafety" ,healthAndSafety);
			 var data = component.get("v.data");
		     data.orm_healthAndSafety__c = 'Medium';
		     component.set("v.data", data);
			 
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 }
		 if(component.get("v.selected")=='r3'){
		  document.getElementById('healthAndSafety').style.backgroundColor = "green";
		  document.getElementById('healthAndSafety').style.border = "2px solid #5B86BE";
		  document.getElementById("healthAndSafety").innerHTML= 'Low';
		  var  healthAndSafety =document.getElementById(component.get("v.selected")).innerHTML;
		  component.set("v.healthAndSafety" ,healthAndSafety);
		  var data = component.get("v.data");
	      data.orm_healthAndSafety__c = 'Low';
	      component.set("v.data", data);
		  
		  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	      evt.setParams({
	           "nomField": $A.get("$Label.c.search_title_label"),
	           "descriptionField": $A.get("$Label.c.search_description_title")
	      });
          evt.fire();
		 }
		 if(component.get("v.selected")=='rr0'){
			 document.getElementById('security').style.backgroundColor = "red";
			 document.getElementById('security').style.border = "2px solid #5B86BE";
			 document.getElementById("security").innerHTML= 'Very High';
			 var  security =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.security" ,security);
			 var data = component.get("v.data");
		     data.orm_security__c = 'VeryHigh'
		     component.set("v.data", data);
			 
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 } 
		 if (component.get("v.selected")=='rr1'){
			 document.getElementById('security').style.backgroundColor = "orange";
			 document.getElementById('security').style.border = "2px solid #5B86BE";
			 document.getElementById("security").innerHTML= 'High';
			 var  security =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.security" ,security);
			 var data = component.get("v.data");
		     data.orm_security__c = 'High'
		     component.set("v.data", data);
			 
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 }
		 if (component.get("v.selected")=='rr2'){
			 document.getElementById('security').style.backgroundColor = "yellow";
			 document.getElementById('security').style.border = "2px solid #5B86BE";
			 document.getElementById("security").innerHTML= 'Medium';
			 var  security =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.security" ,security);
			 var data = component.get("v.data");
		     data.orm_security__c = 'Medium'
		     component.set("v.data", data);
			 
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 }
		 if(component.get("v.selected")=='rr3'){
			  document.getElementById('security').style.backgroundColor = "green";
			  document.getElementById('security').style.border = "2px solid #5B86BE";
			  document.getElementById("security").innerHTML= 'Low';
			  var  security =document.getElementById(component.get("v.selected")).innerHTML;
			  component.set("v.security" ,security);
			  var data = component.get("v.data");
		      data.orm_security__c = 'Low'
		      component.set("v.data", data);
			  
			  var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
		      evt.setParams({
		            "nomField": $A.get("$Label.c.search_title_label"),
		            "descriptionField": $A.get("$Label.c.search_description_title")
		      });
	          evt.fire();
		 }
		 if(component.get("v.selected")=='rrr0'){
			 document.getElementById('environment').style.backgroundColor = "red";
			 document.getElementById('environment').style.border = "2px solid #5B86BE";
			 document.getElementById("environment").innerHTML= 'Very High';
			 var  environment =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.environmentAndCommunity" ,environment);
			 var data = component.get("v.data");
		     data.orm_environment__c = 'VeryHigh'
		     component.set("v.data", data);
			 
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 } 
		 if (component.get("v.selected")=='rrr1'){
			 document.getElementById('environment').style.backgroundColor = "orange";
			 document.getElementById('environment').style.border = "2px solid #5B86BE";
			 document.getElementById("environment").innerHTML= 'High';
			 var  environment =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.environmentAndCommunity" ,environment);
			 var data = component.get("v.data");
		     data.orm_environment__c = 'High'
		     component.set("v.data", data);
		     
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 }
		 if (component.get("v.selected")=='rrr2'){
			 document.getElementById('environment').style.backgroundColor = "yellow";
			 document.getElementById('environment').style.border = "2px solid #5B86BE";
			 document.getElementById("environment").innerHTML= 'Medium';
			 var  environment =document.getElementById(component.get("v.selected")).innerHTML;
			 component.set("v.environmentAndCommunity" ,environment);
			 var data = component.get("v.data");
		     data.orm_environment__c = 'Medium'
		     component.set("v.data", data);
			 
			 var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	         evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	         });
             evt.fire();
		 }
		 if(component.get("v.selected")=='rrr3'){
		  document.getElementById('environment').style.backgroundColor = "green";
		  document.getElementById('environment').style.border = "2px solid #5B86BE";
		  document.getElementById("environment").innerHTML= 'Low';
		  var  environment =document.getElementById(component.get("v.selected")).innerHTML;
		  component.set("v.environmentAndCommunity" ,environment);
		  var data = component.get("v.data");
		  data.orm_environment__c = 'Low'
		  component.set("v.data", data);
		  
		   var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
	        evt.setParams({
	            "nomField": $A.get("$Label.c.search_title_label"),
	            "descriptionField": $A.get("$Label.c.search_description_title")
	        });
           evt.fire();
		 }
	},
	
	goToRiskPucture : function(component, event, helper) {
	    console.log('*****in RA before send******')
        console.log(JSON.stringify(component.get("v.data")))
	    var evtShowMatrice = $A.get("e.c:OrmShowMatriceAssessmentRiskEvt");
	    evtShowMatrice.setParams({
	            "assessmentRisk": component.get("v.assessmentRiskData"),
	            "data": component.get("v.data")
	    });
        evtShowMatrice.fire();
       
	},
	
})