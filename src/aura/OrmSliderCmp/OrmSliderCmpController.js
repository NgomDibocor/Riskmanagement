({
   
    jsLoaded : function(component, event, helper) {
        document.getElementById("bir").style.display = "none";
        document.getElementById("hir").style.display = "none";
        document.getElementById("ro").style.display = "none";
        
          var actionGetProbabilities = component.get('c.findAllProbabilitiesByAssessment');
	      actionGetProbabilities.setParams({ "assessment": component.get("v.idAssessment") });
	      actionGetProbabilities.setCallback(this, function(response) {
		        if(response.getState() == 'SUCCESS'){
		        
		        	component.set("v.probabilities", response.getReturnValue());
		        	if(component.get("v.probabilities").length > 0){
	        	   
	                   for (var i = 0; i < component.get("v.probabilities").length; i++) {
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Probable' ){
		                         component.set("v.probableData", component.get("v.probabilities")[i]);
		                         
		                         component.set("v.probableMin", component.get("v.probableData").orm_pourcentageMin__c);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Possible' ){
		                         component.set("v.possibleData", component.get("v.probabilities")[i]);
		                         
		                         component.set("v.possibleMin", component.get("v.possibleData").orm_pourcentageMin__c);
		                         component.set("v.possibleMax", component.get("v.possibleData").orm_pourcentageMax__c);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Unlikely' ){
		                         component.set("v.unlikelyData", component.get("v.probabilities")[i]);
		                         
		                         component.set("v.unlikelyMin", component.get("v.unlikelyData").orm_pourcentageMin__c);
		                         component.set("v.unlikelyMax", component.get("v.unlikelyData").orm_pourcentageMax__c);
		                      }
		                      if(component.get("v.probabilities")[i].orm_probability__c == 'Rare' ){
		                         component.set("v.RareData", component.get("v.probabilities")[i]);
		                         
		                         component.set("v.rareMin", component.get("v.RareData").orm_pourcentageMin__c);
		                         component.set("v.rareMax", component.get("v.RareData").orm_pourcentageMax__c);
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
       var showRiskOccurrence = component.get("v.showRiskOccurrence");
       
       if(showProbilityRanking == true){
           //component.set("v.showBtnSave", false);
           component.set("v.showBusinessImpactsRanking", true);
	       component.set("v.showProbilityRanking", false);
	       document.getElementById("bir").style.display = "block";
           document.getElementById("probility").style.display = "none";
           
	       if(!document.getElementById("sliderCostProjectVeryHigh").classList.contains("noUi-target")){
	            
	            var actionGetBusinessImpacts = component.get('c.findBusinessImpactsByAssessment');
	            actionGetBusinessImpacts.setParams({ "assessment": component.get("v.idAssessment") });
	            actionGetBusinessImpacts.setCallback(this, function(response) {
				        if(response.getState() == 'SUCCESS'){
				        
				        	component.set("v.businessImpacts", response.getReturnValue());
				        	console.log('*******Size business impact********')
				        	console.log(component.get("v.businessImpacts").length);
				        	console.log(JSON.stringify(component.get("v.businessImpacts")));
				        	if(component.get("v.businessImpacts").length > 0){
				        	
			        	       for (var i = 0; i < component.get("v.businessImpacts").length; i++) {
			        	       
			                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'VeryHigh' ){
			                         component.set("v.businessImpVeryHighData", component.get("v.businessImpacts")[i]);
			                         
			                         component.set("v.costProjectVeryHighMin", component.get("v.businessImpVeryHighData").orm_costProjectBudgetMin__c );
			                         component.set("v.costProjectVeryHighMax", component.get("v.businessImpVeryHighData").orm_costProjectBudgetMax__c );
			                         component.set("v.scheduleProjectVeryHighMin", component.get("v.businessImpVeryHighData").orm_scheduleProjectBaselineMin__c );
			                         component.set("v.scheduleProjectVeryHighMax", component.get("v.businessImpVeryHighData").orm_scheduleProjectBaselineMax__c );
			                      
			                      }
			                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'High' ){
			                         component.set("v.businessImpHighData", component.get("v.businessImpacts")[i]);
			                         
			                         component.set("v.costProjectHighMin", component.get("v.businessImpHighData").orm_costProjectBudgetMin__c );
			                         component.set("v.costProjectHighMax", component.get("v.businessImpHighData").orm_costProjectBudgetMax__c );
			                         component.set("v.scheduleProjectHighMin", component.get("v.businessImpHighData").orm_scheduleProjectBaselineMin__c );
			                         component.set("v.scheduleProjectHighMax", component.get("v.businessImpHighData").orm_scheduleProjectBaselineMax__c );
			                         component.set("v.ProductionLossHighMin", component.get("v.businessImpHighData").orm_productionLossMin__c );
			                         component.set("v.ProductionLossHighMax", component.get("v.businessImpHighData").orm_productionLossMax__c );
			                      }
			                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'Medium' ){
			                         component.set("v.businessImpMediumData", component.get("v.businessImpacts")[i]);
			                         
			                         component.set("v.costProjectMediumMin", component.get("v.businessImpMediumData").orm_costProjectBudgetMin__c );
			                         component.set("v.costProjectMediumMax", component.get("v.businessImpMediumData").orm_costProjectBudgetMax__c );
			                         component.set("v.scheduleProjectMediumMin", component.get("v.businessImpMediumData").orm_scheduleProjectBaselineMin__c );
			                         component.set("v.scheduleProjectMediumMax", component.get("v.businessImpMediumData").orm_scheduleProjectBaselineMax__c );
			                         component.set("v.ProductionLossMediumMin", component.get("v.businessImpMediumData").orm_productionLossMin__c );
			                         component.set("v.ProductionLossMediumMax", component.get("v.businessImpMediumData").orm_productionLossMax__c );
			                      }
			                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'Low' ){
			                         component.set("v.businessImpLowData", component.get("v.businessImpacts")[i]);
			                         
			                         component.set("v.costProjectLowMin", component.get("v.businessImpLowData").orm_costProjectBudgetMin__c );
			                         component.set("v.costProjectLowMax", component.get("v.businessImpLowData").orm_costProjectBudgetMax__c );
			                         component.set("v.scheduleProjectLowMin", component.get("v.businessImpLowData").orm_scheduleProjectBaselineMin__c );
			                         component.set("v.scheduleProjectLowMax", component.get("v.businessImpLowData").orm_scheduleProjectBaselineMax__c );
			                         component.set("v.ProductionLossLowMin", component.get("v.businessImpLowData").orm_productionLossMin__c );
			                         component.set("v.ProductionLossLowMax", component.get("v.businessImpLowData").orm_productionLossMax__c );
			                      }
		                        }
					        }	
				        	
				        	helper.jsLoaded2(component, event, helper);
				        	
				        } else {
				        	alert("ERROR")	
				        }
	               });
	               $A.enqueueAction(actionGetBusinessImpacts);
	         
	         }
	       
       }
       
       if(showBusinessImpactsRanking == true){
           //component.set("v.showBtnSave", false);
	       component.set("v.showBusinessImpactsRanking", false);
           component.set("v.showHsseImpactsRanking", true);
           
           document.getElementById("hir").style.display = "block";
           document.getElementById("bir").style.display = "none";
           
           helper.getHsseImpacts(component, event, helper);
       }
       
       if(showHsseImpactsRanking == true){
           //component.set("v.showBtnSave", false);
	       component.set("v.showHsseImpactsRanking", false);
           component.set("v.showRiskOccurrence", true);
           
           document.getElementById("ro").style.display = "block";
           document.getElementById("hir").style.display = "none";
           //helper.getHsseImpacts(component, event, helper);
       }
      
    },
    
    PrevPage : function(component, event, helper) {
       var showProbilityRanking = component.get("v.showProbilityRanking");
       var showHsseImpactsRanking = component.get("v.showHsseImpactsRanking");
       var showBusinessImpactsRanking = component.get("v.showBusinessImpactsRanking");
       var showRiskOccurrence = component.get("v.showRiskOccurrence");
       
       if(showBusinessImpactsRanking == true){
           
	       component.set("v.showProbilityRanking", true);
           component.set("v.showBusinessImpactsRanking", false);
           
           document.getElementById("probility").style.display = "block";
           document.getElementById("bir").style.display = "none";
           
       } 
       
       if(showHsseImpactsRanking == true){
          // component.set("v.showBtnSave", false);
           component.set("v.showBusinessImpactsRanking", true);
	       component.set("v.showHsseImpactsRanking", false);
	       
	       document.getElementById("bir").style.display = "block";
           document.getElementById("hir").style.display = "none";
       }
       
       if(showRiskOccurrence == true){
           //component.set("v.showBtnSave", false);
           component.set("v.showHsseImpactsRanking", true);
	       component.set("v.showRiskOccurrence", false);
	       
	       document.getElementById("hir").style.display = "block";
           document.getElementById("ro").style.display = "none";
       }
        
    },
    
    createProbilityRanking : function(component, event, helper) {
          var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	      evtShowSpinner.fire();
	      
          var probabilities = [];
          var newItemProbable = component.get("v.probableData");
          newItemProbable.orm_assessment__c = component.get("v.idAssessment");
          newItemProbable.orm_pourcentageMin__c = component.get("v.probableMin");
          newItemProbable.orm_pourcentageMax__c = component.get("v.probableMax");
          probabilities.push(newItemProbable);
          
          var newItemPossible = component.get("v.possibleData");
          newItemPossible.orm_assessment__c = component.get("v.idAssessment");
          newItemPossible.orm_pourcentageMin__c = component.get("v.possibleMin");
          newItemPossible.orm_pourcentageMax__c = component.get("v.possibleMax");
          probabilities.push(newItemPossible);
          
          var newItemUnlikely = component.get("v.unlikelyData");
          newItemUnlikely.orm_assessment__c = component.get("v.idAssessment");
          newItemUnlikely.orm_pourcentageMin__c = component.get("v.unlikelyMin");
          newItemUnlikely.orm_pourcentageMax__c = component.get("v.unlikelyMax");
          probabilities.push(newItemUnlikely);
          
          var newItemRare = component.get("v.RareData");
          newItemRare.orm_assessment__c = component.get("v.idAssessment");
          newItemRare.orm_pourcentageMin__c = component.get("v.rareMin");
          newItemRare.orm_pourcentageMax__c = component.get("v.rareMax");
          probabilities.push(newItemRare);
          
	      var addProbabilityAction = component.get('c.addProbabilities');
		  addProbabilityAction.setParams({ "items": probabilities });
		  addProbabilityAction.setCallback(this, function(response) {
		         if(response.getState() == 'SUCCESS'){
			            component.set("v.showBtnUpdate", false);
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
		        }else{
		        
		        	alert("ERROR")	
		        }
		   });
		   $A.enqueueAction(addProbabilityAction);
   },
   
   cancelUpdateProbility : function(component, event, helper) {
      component.set("v.showBtnUpdate", false);
      helper.cancelModifProbabiliy(component, event, helper);
   },
   
   cancelUpdateHsseImpact : function(component, event, helper) {
      component.set("v.showBtnUpdate", false);
      helper.getHsseImpacts(component, event, helper);
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
          
    	  var actionAddHSSE = component.get('c.addHsseImpacts');
	      actionAddHSSE.setParams({ "items": hsseImpacts });
	      actionAddHSSE.setCallback(this, function(response) {
	      
		        if(response.getState() == 'SUCCESS'){	
		            console.log('******Size if click on create button******')
		            console.log(JSON.stringify(response.getReturnValue().length))
		            component.set("v.showBtnUpdate", false);
		        	component.set("v.hsseImpacts", response.getReturnValue());
					
					if(component.get("v.hsseImpacts").length > 0){
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
					
		       }else{
		       
		          alert("ERROR create")	
			   }
	     });
	     $A.enqueueAction(actionAddHSSE);
   },
   
   onChangeVeryHighHS : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeVeryHighSecurity : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeVeryHighEnvCom : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeHighHS : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeHighSecurity : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeHighEnvCom : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeMediumHS : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeMediumSecurity : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeMediumEnvCom : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeLowHS : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeLowSecurity : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   onChangeLowEnvCom : function(component, event, helper) {
      component.set("v.showBtnUpdate", true);
   },
   
   createBusinessImpactsRanking : function(component, event, helper) {
          var evtShowSpinner = $A.get("e.c:OrmShowSpinnerEvt");
	      evtShowSpinner.fire();
	                  
          var businessImpacts = [];
          var newItemVeryHigh = component.get("v.businessImpVeryHighData");
          newItemVeryHigh.orm_assessment__c = component.get("v.idAssessment");
          newItemVeryHigh.orm_costProjectBudgetMin__c = component.get("v.costProjectVeryHighMin");
          newItemVeryHigh.orm_costProjectBudgetMax__c = component.get("v.costProjectVeryHighMax");
          newItemVeryHigh.orm_scheduleProjectBaselineMin__c = component.get("v.scheduleProjectVeryHighMin");
          newItemVeryHigh.orm_scheduleProjectBaselineMax__c = component.get("v.scheduleProjectVeryHighMax");
          businessImpacts.push(newItemVeryHigh);
          
          var newItemHigh = component.get("v.businessImpHighData");
          newItemHigh.orm_assessment__c = component.get("v.idAssessment");
          newItemHigh.orm_costProjectBudgetMin__c = component.get("v.costProjectHighMin");
          newItemHigh.orm_costProjectBudgetMax__c = component.get("v.costProjectHighMax");
          newItemHigh.orm_scheduleProjectBaselineMin__c = component.get("v.scheduleProjectHighMin");
          newItemHigh.orm_scheduleProjectBaselineMax__c = component.get("v.scheduleProjectHighMax");
          newItemHigh.orm_productionLossMin__c = component.get("v.ProductionLossHighMin");
          newItemHigh.orm_productionLossMax__c = component.get("v.ProductionLossHighMax");
          businessImpacts.push(newItemHigh);
          
          var newItemMedium = component.get("v.businessImpMediumData");
          newItemMedium.orm_assessment__c = component.get("v.idAssessment");
          newItemMedium.orm_costProjectBudgetMin__c = component.get("v.costProjectMediumMin");
          newItemMedium.orm_costProjectBudgetMax__c = component.get("v.costProjectMediumMax");
          newItemMedium.orm_scheduleProjectBaselineMin__c = component.get("v.scheduleProjectMediumMin");
          newItemMedium.orm_scheduleProjectBaselineMax__c = component.get("v.scheduleProjectMediumMax");
          newItemMedium.orm_productionLossMin__c = component.get("v.ProductionLossMediumMin");
          newItemMedium.orm_productionLossMax__c = component.get("v.ProductionLossMediumMax");
          businessImpacts.push(newItemMedium);
          
          var newItemLow = component.get("v.businessImpLowData");
          newItemLow.orm_assessment__c = component.get("v.idAssessment");
          newItemLow.orm_costProjectBudgetMin__c = component.get("v.costProjectLowMin");
          newItemLow.orm_costProjectBudgetMax__c = component.get("v.costProjectLowMax");
          newItemLow.orm_scheduleProjectBaselineMin__c = component.get("v.scheduleProjectLowMin");
          newItemLow.orm_scheduleProjectBaselineMax__c = component.get("v.scheduleProjectLowMax");
          newItemLow.orm_productionLossMin__c = component.get("v.ProductionLossLowMin");
          newItemLow.orm_productionLossMax__c = component.get("v.ProductionLossLowMax");
          businessImpacts.push(newItemLow);
          
          var addBusinessImpactAction = component.get('c.addBusinessImpacts');
	      addBusinessImpactAction.setParams({ "items": businessImpacts });
	      addBusinessImpactAction.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	            //component.set("v.showBtnUpdate", false);
	        	component.set("v.businessImpacts", response.getReturnValue());
	        	console.log('******after create business impact********')
	        	console.log(response.getReturnValue())
	        	if(component.get("v.businessImpacts").length > 0){
		        	
	        	         for (var i = 0; i < component.get("v.businessImpacts").length; i++) {
	        	       
		                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'VeryHigh' ){
		                         component.set("v.businessImpVeryHighData", component.get("v.businessImpacts")[i]);
		                      }
		                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'High' ){
		                         component.set("v.businessImpHighData", component.get("v.businessImpacts")[i]);
		                      }
		                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'Medium' ){
		                         component.set("v.businessImpMediumData", component.get("v.businessImpacts")[i]);
		                      }
		                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'Low' ){
		                         component.set("v.businessImpLowData", component.get("v.businessImpacts")[i]);
		                      }
                         }
			     }
	        	
	        	//Hide the Spinner
                var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
	            evtHideSpinner.fire(); 
	        	
	        	var toast = $A.get('e.force:showToast');
				toast.setParams({
					'message' : "Business Impact Ranking was successfully saved",
					'type' : 'success',
					'mode' : 'dismissible'
				});      
				toast.fire(); 	
				
	        } else {
	        	alert("ERROR")	
	        }
	     });
	     $A.enqueueAction(addBusinessImpactAction);
   },
   
   cancelUpdateBusinessImpact : function(component, event, helper) {
       component.set("v.showBtnUpdate", false);
       helper.cancelModifBusinessImpact(component, event, helper);
   },
   
   onChangeVeryHighRepution : function(component, event, helper) {
       component.set("v.showBtnUpdate", true);
   },
   
   onChangeHighRepution : function(component, event, helper) {
       component.set("v.showBtnUpdate", true);
   },
   
   onChangeMediumRepution : function(component, event, helper) {
       component.set("v.showBtnUpdate", true);
   },
   
   onChangeLowRepution : function(component, event, helper) {
       component.set("v.showBtnUpdate", true);
   },
})