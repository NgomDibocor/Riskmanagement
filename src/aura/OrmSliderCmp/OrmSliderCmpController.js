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
          
           component.set("v.showBusinessImpactsRanking", true);
	       component.set("v.showProbilityRanking", false);
	       document.getElementById("bir").style.display = "block";
           document.getElementById("probility").style.display = "none";
	       if(!document.getElementById("slider5").classList.contains("noUi-target")){
	           helper.jsLoaded2(component, event, helper);
	       }
	       
       }
       
       if(showBusinessImpactsRanking == true){
           component.set("v.showBtnSave", true);
	       component.set("v.showBusinessImpactsRanking", false);
           component.set("v.showHsseImpactsRanking", true);
           
           document.getElementById("hir").style.display = "block";
           document.getElementById("bir").style.display = "none";
           helper.getHsseImpacts(component, event, helper);
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
			        	
			        	//Hide the Spinner
		                var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
			            evtHideSpinner.fire(); 
			        	
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
   
    createHsseImpactsRanking : function(component, event, helper) {
          var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	      evtShowSpinner.fire();
	                  
          var hsseImpacts = [];
          var newItemVeryHigh = component.get("v.hsseVeryHighData");
          newItemVeryHigh.orm_assessment__c = component.get("v.idAssessment");
          hsseImpacts.push(newItemVeryHigh);
       
          var newItemHigh = component.get("v.hsseHighData");
          newItemHigh.orm_assessment__c = component.get("v.idAssessment");
          hsseImpacts.push(newItemHigh);
          
          var newItemMedium = component.get("v.hsseMediumData");
          newItemMedium.orm_assessment__c = component.get("v.idAssessment");
          hsseImpacts.push(newItemMedium);

          var newItemLow = component.get("v.hsseLowData");
          newItemLow.orm_assessment__c = component.get("v.idAssessment");
          hsseImpacts.push(newItemLow);
          console.log('******verif bfore******')
		  console.log(JSON.stringify(hsseImpacts))
          
          /*var actiondeletePreviousHsse = component.get('c.deletePreviousHsseImpacts');
	      actiondeletePreviousHsse.setParams({ "assessment": component.get("v.idAssessment") });
	      actiondeletePreviousHsse.setCallback(this, function(response) {
		      if(response.getState() == 'SUCCESS'){*/
			        	  var actionAddHSSE = component.get('c.addHsseImpacts');
					      actionAddHSSE.setParams({ "items": hsseImpacts });
					      actionAddHSSE.setCallback(this, function(response) {
						        if(response.getState() == 'SUCCESS'){
						            console.log('******Size if click on create button******')
						            console.log(JSON.stringify(response.getReturnValue().length))
						            component.set("v.showBtnUpdate", false);
						        	component.set("v.hsseImpacts", response.getReturnValue());
									
									for (var i = 0; i < component.get("v.hsseImpacts").length; i++) {
					                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'VeryHigh' ){
					                         component.set("v.hsseVeryHighData", component.get("v.hsseImpacts")[i]);
					                      }
					                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'High' ){
					                         component.set("v.hsseHighData", component.get("v.hsseImpacts")[i]);
					                      }
					                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'Medium' ){
					                         component.set("v.hsseMediumData", component.get("v.hsseImpacts")[i]);
					                      }
					                      if(component.get("v.hsseImpacts")[i].orm_rating__c == 'Low' ){
					                         component.set("v.hsseLowData", component.get("v.hsseImpacts")[i]);
					                      }
				                    }
				                    //Hide the Spinner
					                var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
						            evtHideSpinner.fire(); 
						            
						            var toast = $A.get('e.force:showToast');
									toast.setParams({
										'message' : "HSSE Impacts Ranking was successfully saved",
										'type' : 'success',
										'mode' : 'dismissible'
									});      
									toast.fire();
									
						         }else {
						        	alert("ERROR create")	
						         }
					      });
					      $A.enqueueAction(actionAddHSSE);
		     /* }else {
		      
		        alert("ERROR DELETE")	
		      }
	     });
	     $A.enqueueAction(actiondeletePreviousHsse);*/

   },
   
   onChangeVeryHighHS : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
})