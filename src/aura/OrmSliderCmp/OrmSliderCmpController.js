({
    doInit : function(component, event, helper) {
         var action = component.get('c.findAllProbabilitiesByAssessment');
	      action.setParams({ "assessment": component.get("v.idAssessment") });
	      action.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	        	component.set("v.probabilities", response.getReturnValue());	
	        } else {
	        	alert("ERROR")	
	        }
	     });
	     $A.enqueueAction(action); 
    },
    
    jsLoaded : function(component, event, helper) {
        document.getElementById("bir").style.display = "none";
        document.getElementById("hir").style.display = "none";
        helper.jsLoaded(component, event, helper);

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
           
           component.set("v.showBusinessImpactsRanking", true);
	       component.set("v.showHsseImpactsRanking", false);
	       
	       document.getElementById("bir").style.display = "block";
           document.getElementById("hir").style.display = "none";
           
       }
        
    },
    
    createProbilityRanking : function(component, event, helper) {
    
      if(component.get("v.probabilities").length == 0){
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
          newItemProbable.orm_assessment__c = component.get("v.idAssessment");
          newItemPossible.orm_probability__c = 'Possible';
          newItemPossible.orm_pourcentageMin__c = component.get("v.possibleMin");
          newItemPossible.orm_pourcentageMax__c = component.get("v.possibleMax");
          probabilities.push(newItemPossible);
          
          var newItemUnlikely = {};
          newItemUnlikely.sobjectType = 'Macro';
          newItemUnlikely.Name = "XXXX";
          newItemProbable.orm_assessment__c = component.get("v.idAssessment");
          newItemUnlikely.orm_probability__c = 'Unlikely';
          newItemUnlikely.orm_pourcentageMin__c = component.get("v.unlikelyMin");
          newItemUnlikely.orm_pourcentageMax__c = component.get("v.unlikelyMax");
          probabilities.push(newItemUnlikely);
          
          var newItemRare = {};
          newItemRare.sobjectType = 'Macro';
          newItemRare.Name = "XXXX";
          newItemProbable.orm_assessment__c = component.get("v.idAssessment");
          newItemRare.orm_probability__c = 'Rare';
          newItemRare.orm_pourcentageMin__c = component.get("v.rareMin");
          newItemRare.orm_pourcentageMax__c = component.get("v.rareMax");
          probabilities.push(newItemRare);
          
          //console.log(JSON.stringify(probabilities))
          
          var action = component.get('c.addProbabilities');
	      action.setParams({ "items": probabilities });
	      action.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
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
	 }
   }
   
})