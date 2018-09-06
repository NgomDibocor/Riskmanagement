({
    jsLoaded : function(component, event, helper) {
        //helper.jsLoaded(component, event, helper);
    },
    
    
    nextPage : function(component, event, helper) {
       var showProbilityRanking = component.get("v.showProbilityRanking");
       var showHsseImpactsRanking = component.get("v.showHsseImpactsRanking");
       var showBusinessImpactsRanking = component.get("v.showBusinessImpactsRanking");
       
       if(showProbilityRanking == true){
           component.set("v.showHsseImpactsRanking", true);
	       component.set("v.showProbilityRanking", false);
	       if(!document.getElementById("slider3").classList.contains("noUi-target")){
	           helper.jsLoaded2(component, event, helper);
	       }
	       
       }
       
       if(showHsseImpactsRanking == true){
	       component.set("v.showHsseImpactsRanking", false);
           component.set("v.showBusinessImpactsRanking", true);
       }
      
    },
    
    PrevPage : function(component, event, helper) {
       var showProbilityRanking = component.get("v.showProbilityRanking");
       var showHsseImpactsRanking = component.get("v.showHsseImpactsRanking");
       var showBusinessImpactsRanking = component.get("v.showBusinessImpactsRanking");
       
       if(showBusinessImpactsRanking == true){
	       component.set("v.showHsseImpactsRanking", true);
           component.set("v.showBusinessImpactsRanking", false);
       } 
       
       if(showHsseImpactsRanking == true){
           component.set("v.showProbilityRanking", true);
	       component.set("v.showHsseImpactsRanking", false);
           
       }
        
       
       
       
       
    }
   
})