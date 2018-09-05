({
    jsLoaded : function(component, event, helper) {
        helper.jsLoaded(component, event, helper);
    },
    
    /*jsLoaded : function(component, event, helper) {
        //start first slider
        var slider = component.find('slider').getElement();
        slider =  helper.createSlider(component, event, helper, slider);
        
		slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valCostmin", range[0].replace('%', ''))
		    component.set("v.valCostmax", range[1].replace('%', ''))
        }));
        //end first slider
        
        //start second slider
        var slider2 = component.find('slider2').getElement();
        slider2 =  helper.createSlider(component, event, helper, slider2);
        
        slider2.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end first slider
    },*/
    
    nextPage : function(component, event, helper) {
       var showProbilityRanking = component.get("v.showProbilityRanking");
       var showHsseImpactsRanking = component.get("v.showHsseImpactsRanking");
       var showBusinessImpactsRanking = component.get("v.showBusinessImpactsRanking");
       
       if(showProbilityRanking == true){
           
	       component.set("v.showProbilityRanking", false);
           component.set("v.showHsseImpactsRanking", true);
           helper.jsLoaded2(component, event, helper);
       } 
       
       if(showHsseImpactsRanking == true){
           //helper.jsLoaded(component, event, helper);
	       component.set("v.showHsseImpactsRanking", false);
           component.set("v.showBusinessImpactsRanking", true);
       }
      
    },
    
    PrevPage : function(component, event, helper) {
       var showProbilityRanking = component.get("v.showProbilityRanking");
       var showHsseImpactsRanking = component.get("v.showHsseImpactsRanking");
       var showBusinessImpactsRanking = component.get("v.showBusinessImpactsRanking");
       
       if(showBusinessImpactsRanking == true){
           //helper.jsLoaded(component, event, helper);
	       component.set("v.showHsseImpactsRanking", true);
           component.set("v.showBusinessImpactsRanking", false);
       } 
       
       if(showHsseImpactsRanking == true){
           component.set("v.showProbilityRanking", true);
	       component.set("v.showHsseImpactsRanking", false);
           
           helper.jsLoaded(component, event, helper);
       }
        
       
       
       
       
    }
   
})