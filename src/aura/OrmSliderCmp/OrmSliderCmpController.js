({
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
        
       
       
       
       
    }
   
})