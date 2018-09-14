({
    doInit : function(component, event, helper) {
         //helper.getProbilities(component, event, helper); 
    },
    
    jsLoaded : function(component, event, helper) {
        document.getElementById("bir").style.display = "none";
        document.getElementById("hir").style.display = "none";
        
          var actionGetProbabilities = component.get('c.findAllProbabilitiesByAssessment');
	      actionGetProbabilities.setParams({ "assessment": component.get("v.idAssessment") });
	      actionGetProbabilities.setCallback(this, function(response) {
		        if(response.getState() == 'SUCCESS'){
		        
		        	component.set("v.probabilities", response.getReturnValue());
		        	if(component.get("v.probabilities").length > 0){
	        	   
	                   for (var i = 0; i < component.get("v.probabilities").length; i++) {
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Probable' ){
		                         component.set("v.probableData", component.get("v.probabilities")[i]);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Possible' ){
		                         component.set("v.possibleData", component.get("v.probabilities")[i]);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Unlikely' ){
		                         component.set("v.unlikelyData", component.get("v.probabilities")[i]);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Rare' ){
		                         component.set("v.RareData", component.get("v.probabilities")[i]);
		                      }
		                   }
			        	}	
		        	
		        	helper.jsLoaded(component, event, helper);
		        	
		        } else {
		        	alert("ERROR")	
		        }
	      });
	      $A.enqueueAction(actionGetProbabilities);  
          
          

    },
    
    
    nextPage : function(component, event, helper) {
       var showProbilityRanking = component.get("v.showProbilityRanking");
       var showHsseImpactsRanking = component.get("v.showHsseImpactsRanking");
       var showBusinessImpactsRanking = component.get("v.showBusinessImpactsRanking");
       
       if(showProbilityRanking == true){
           component.set("v.showBtnSave", true);
           component.set("v.showBusinessImpactsRanking", true);
	       component.set("v.showProbilityRanking", false);
	       document.getElementById("bir").style.display = "block";
           document.getElementById("probility").style.display = "none";
	       if(!document.getElementById("slider5").classList.contains("noUi-target")){
	           helper.jsLoaded2(component, event, helper);
	       }
	       
       }
       
       if(showBusinessImpactsRanking == true){
           
	       component.set("v.showBusinessImpactsRanking", false);
           component.set("v.showHsseImpactsRanking", true);
           
           document.getElementById("hir").style.display = "block";
           document.getElementById("bir").style.display = "none";
       }
      
    },
    
    PrevPage : function(component, event, helper) {
       var showProbilityRanking = component.get("v.showProbilityRanking");
       var showHsseImpactsRanking = component.get("v.showHsseImpactsRanking");
       var showBusinessImpactsRanking = component.get("v.showBusinessImpactsRanking");
       
       if(showBusinessImpactsRanking == true){
           
	       component.set("v.showProbilityRanking", true);
           component.set("v.showBusinessImpactsRanking", false);
           
           document.getElementById("probility").style.display = "block";
           document.getElementById("bir").style.display = "none";
           
       } 
       
       if(showHsseImpactsRanking == true){
           component.set("v.showBtnSave", false);
           component.set("v.showBusinessImpactsRanking", true);
	       component.set("v.showHsseImpactsRanking", false);
	       
	       document.getElementById("bir").style.display = "block";
           document.getElementById("hir").style.display = "none";
           
       }
        
    },
    
    createProbilityRanking : function(component, event, helper) {
    
      
          var probabilities = [];
          var newItemProbable = {};
          newItemProbable.sobjectType = 'Macro';
          newItemProbable.Name = "XXXX";
          newItemProbable.orm_assessment__c = component.get("v.idAssessment");
          newItemProbable.orm_probability__c = 'Probable';
          newItemProbable.orm_pourcentageMin__c = component.get("v.probableMin");
          newItemProbable.orm_pourcentageMax__c = component.get("v.probableMax");
          probabilities.push(newItemProbable);
          
          var newItemPossible = {};
          newItemPossible.sobjectType = 'Macro';
          newItemPossible.Name = "XXXX";
          newItemPossible.orm_assessment__c = component.get("v.idAssessment");
          newItemPossible.orm_probability__c = 'Possible';
          newItemPossible.orm_pourcentageMin__c = component.get("v.possibleMin");
          newItemPossible.orm_pourcentageMax__c = component.get("v.possibleMax");
          probabilities.push(newItemPossible);
          
          var newItemUnlikely = {};
          newItemUnlikely.sobjectType = 'Macro';
          newItemUnlikely.Name = "XXXX";
          newItemUnlikely.orm_assessment__c = component.get("v.idAssessment");
          newItemUnlikely.orm_probability__c = 'Unlikely';
          newItemUnlikely.orm_pourcentageMin__c = component.get("v.unlikelyMin");
          newItemUnlikely.orm_pourcentageMax__c = component.get("v.unlikelyMax");
          probabilities.push(newItemUnlikely);
          
          var newItemRare = {};
          newItemRare.sobjectType = 'Macro';
          newItemRare.Name = "XXXX";
          newItemRare.orm_assessment__c = component.get("v.idAssessment");
          newItemRare.orm_probability__c = 'Rare';
          newItemRare.orm_pourcentageMin__c = component.get("v.rareMin");
          newItemRare.orm_pourcentageMax__c = component.get("v.rareMax");
          probabilities.push(newItemRare);
          
          
          var actiondeletePrevious = component.get('c.deletePreviousProbalities');
	      actiondeletePrevious.setParams({ "assessment": component.get("v.idAssessment") });
	      actiondeletePrevious.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	        	  var action = component.get('c.addProbabilities');
			      action.setParams({ "items": probabilities });
			      action.setCallback(this, function(response) {
			        if(response.getState() == 'SUCCESS'){
			            component.set("v.showBtnUpdate", false);
			        	component.set("v.probabilities", response.getReturnValue());
			        	var toast = $A.get('e.force:showToast');
						toast.setParams({
							'message' : "Probalility Ranking was successfully saved",
							'type' : 'success',
							'mode' : 'dismissible'
						});      
						toast.fire(); 	
			        } else {
			        	alert("ERROR")	
			        }
			     });
			     $A.enqueueAction(action);
	        } else {
	        	alert("ERROR")	
	        }
	     });
	     $A.enqueueAction(actiondeletePrevious); 
          
   },
   
   cancelUpdate : function(component, event, helper) {
      component.set("v.showBtnUpdate", false);
   },
   
   /*createHsseImpactsRanking : function(component, event, helper) {
      var hsseImpacts = [];
          var newItemVeryHigh = {};
          newItemVeryHigh.sobjectType = 'Order';
          newItemVeryHigh.orm_assessment__c = component.get("v.idAssessment");
          newItemVeryHigh.orm_rating__c = 'VeryHigh';
          newItemVeryHigh.Description = '';
          newItemVeryHigh.orm_security__c = '';
          newItemVeryHigh.orm_environmentAndCommunity__c = '';
          hsseImpacts.push(newItemVeryHigh);
       
          var newItemHigh = {};
          newItemHigh.sobjectType = 'Order';
          newItemHigh.orm_assessment__c = component.get("v.idAssessment");
          newItemHigh.orm_rating__c = 'High';
          newItemHigh.Description = '';
          newItemHigh.orm_security__c = '';
          newItemHigh.orm_environmentAndCommunity__c = '';
          hsseImpacts.push(newItemHigh);
          
          var newItemMedium = {};
          newItemMedium.sobjectType = 'Order';
          newItemMedium.orm_assessment__c = component.get("v.idAssessment");
          newItemMedium.orm_rating__c = 'Medium';
          newItemMedium.Description = '';
          newItemMedium.orm_security__c = '';
          newItemMedium.orm_environmentAndCommunity__c = '';
          hsseImpacts.push(newItemMedium);

          var newItemLow = {};
          newItemLow.sobjectType = 'Order';
          newItemLow.orm_assessment__c = component.get("v.idAssessment");
          newItemLow.orm_rating__c = 'Low';
          newItemLow.Description = '';
          newItemLow.orm_security__c = '';
          newItemLow.orm_environmentAndCommunity__c = '';
          hsseImpacts.push(newItemLow);

          var actiondeletePrevious = component.get('c.deletePreviousHsseImpacts');
	      actiondeletePrevious.setParams({ "assessment": component.get("v.idAssessment") });
	      actiondeletePrevious.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	        	  var action = component.get('c.addHsseImpacts');
			      action.setParams({ "items": hsseImpacts });
			      action.setCallback(this, function(response) {
			        if(response.getState() == 'SUCCESS'){
			            component.set("v.showBtnUpdate", false);
			        	component.set("v.hsseImpacts", response.getReturnValue());
			        	var toast = $A.get('e.force:showToast');
						toast.setParams({
							'message' : "HSSE Impacts Ranking was successfully saved",
							'type' : 'success',
							'mode' : 'dismissible'
						});      
						toast.fire(); 	
			        } else {
			        	alert("ERROR")	
			        }
			     });
			     $A.enqueueAction(action);
	        } else {
	        	alert("ERROR")	
	        }
	     });
	     $A.enqueueAction(actiondeletePrevious);

   }*/
   
})