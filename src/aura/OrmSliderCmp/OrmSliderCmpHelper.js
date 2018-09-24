({
	createSlider : function(component, event, helper, slider, start, end) {
	     var min = parseInt(component.get("v.min"), 10);
         var max = parseInt(component.get("v.max"), 10);
         var step = parseInt(component.get("v.step"), 10);
	
		 noUiSlider.create(slider, {
            start: [start, end],
            connect: true,
            tooltips: true,
            step: step,
            format: {
                to: function (value ) {
					return Math.round(value) + '%';
                },
                from: function ( value ) {
                    return value;
                }
            },
            range: {
                'min': min,
                'max': max
            }
        });
        return slider;
	},
	
	createSliderProduction : function(component, event, helper, slider, start, end) {
	     var min = parseInt(component.get("v.min"), 10);
         var max = parseInt(component.get("v.maxProductionLoss"), 10);
         var step = parseInt(component.get("v.step"), 10);
	
		 noUiSlider.create(slider, {
            start: [start, end],
            connect: true,
            tooltips: true,
            step: step,
            format: {
                to: function (value ) {
					return Math.round(value) + 'weeks';
                },
                from: function ( value ) {
                    return value;
                }
            },
            range: {
                'min': min,
                'max': max
            }
        });
        return slider;
	},
	
	jsLoaded : function(component, event, helper) {
	
        //start sliderPossible
        var sliderPossible = component.find('sliderPossible').getElement();
        if(component.get("v.probabilities").length == 0){
            sliderPossible = this.createSlider(component, event, helper, sliderPossible, 25, 75);
        }else{
           sliderPossible = this.createSlider(component, event, helper, sliderPossible, parseInt(component.get("v.possibleData").orm_pourcentageMin__c, 10), parseInt(component.get("v.possibleData").orm_pourcentageMax__c, 10) );
          
        }
       
        sliderPossible.noUiSlider.on('change', $A.getCallback(function(range) {
        //update probableMin attribute
        component.set("v.showBtnUpdate", true);
	    component.set("v.possibleMin", parseInt(range[0].replace('%', ''), 10)) 
	    component.set("v.possibleMax", parseInt(range[1].replace('%', ''), 10))
	    component.set("v.probableMin", component.get("v.possibleMax"))
	    component.set("v.unlikelyMax", component.get("v.possibleMin"))
        }));
        
        
        var sliderProbable = component.find('sliderProbable').getElement();
        if(component.get("v.probabilities").length == 0){
            sliderProbable = this.createSlider(component, event, helper, sliderProbable, 75, 100);
        }else{
           sliderProbable = this.createSlider(component, event, helper, sliderProbable, parseInt(component.get("v.probableData").orm_pourcentageMin__c, 10), parseInt(component.get("v.probableData").orm_pourcentageMax__c, 10) );
          
        }
        
        
        var origins = sliderProbable.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
		sliderProbable.noUiSlider.on('change', $A.getCallback(function(range) {
	    //update probableMin attribute
	    component.set("v.showBtnUpdate", true);
		component.set("v.probableMin", parseInt(range[0].replace('%', ''), 10))
		component.set("v.possibleMax", parseInt(range[0].replace('%', ''), 10))
		    
        }));
        
        //Locking slider and slider2 together
        sliderProbable.noUiSlider.on('slide', $A.getCallback(function(range){
            if(Number(range[0].replace('%', '')) >= component.get("v.possibleMin")){
               sliderPossible.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
            }else{
               sliderProbable.noUiSlider.set([component.get("v.possibleMin"), null]);
            }
						
		}));
		sliderPossible.noUiSlider.on('slide', $A.getCallback(function(range){
		
		    if(Number(range[0].replace('%', '')) >= component.get("v.unlikelyMin")){
               sliderProbable.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			   sliderUnlikely.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
            }else{
               sliderPossible.noUiSlider.set([component.get("v.unlikelyMin"), null]);
            }
            
			
			
		}));
        //Locking slider and slider2 together
        
        //start sliderUnlikely
        var sliderUnlikely = component.find('sliderUnlikely').getElement();
        if(component.get("v.probabilities").length == 0){
             sliderUnlikely = this.createSlider(component, event, helper, sliderUnlikely, 5, 25); 
        }else{
           sliderUnlikely = this.createSlider(component, event, helper, sliderUnlikely, parseInt(component.get("v.unlikelyData").orm_pourcentageMin__c, 10), parseInt(component.get("v.unlikelyData").orm_pourcentageMax__c, 10) );
        }
        
        sliderUnlikely.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.unlikelyMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.unlikelyMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.possibleMin", component.get("v.unlikelyMax"));
	        component.set("v.rareMax", component.get("v.unlikelyMin"));
	        
        }));
        //end sliderUnlikely
        
		sliderUnlikely.noUiSlider.on('slide', $A.getCallback(function(range){
			//sliderPossible.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			//sliderRare.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		   if(Number(range[1].replace('%', '')) <= component.get("v.possibleMax") ){
		      sliderPossible.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		      sliderRare.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
		   }else{
		      sliderUnlikely.noUiSlider.set([null, component.get("v.possibleMax")]);
		   }
			
		})); 
        
        //start sliderRare
        var sliderRare = component.find('sliderRare').getElement();
        if(component.get("v.probabilities").length == 0){
             sliderRare = this.createSlider(component, event, helper, sliderRare, 0, 5); 
        }else{
           sliderRare = this.createSlider(component, event, helper, sliderRare, parseInt(component.get("v.RareData").orm_pourcentageMin__c, 10), parseInt(component.get("v.RareData").orm_pourcentageMax__c, 10) );
        }
        
        var origins = sliderRare.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderRare.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.rareMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.rareMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.unlikelyMin", component.get("v.rareMax"));
        }));
        //end sliderRare  
        
		sliderRare.noUiSlider.on('slide', $A.getCallback(function(range){
		   if(Number(range[1].replace('%', '')) <= component.get("v.unlikelyMax") ){
		      sliderUnlikely.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		   }else{
		      sliderRare.noUiSlider.set([null, component.get("v.unlikelyMax")]);
		   }
			
		})); 
		
		//Hide the Spinner
        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
        evtHideSpinner.fire();
    },
    
    jsLoaded2 : function(component, event, helper) {
	    	    
        var sliderCostProjectVeryHigh = component.find('sliderCostProjectVeryHigh').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderCostProjectVeryHigh = this.createSlider(component, event, helper, sliderCostProjectVeryHigh, 60, 100);
        }else{
            sliderCostProjectVeryHigh = this.createSlider(component, event, helper, sliderCostProjectVeryHigh, parseInt(component.get("v.businessImpVeryHighData").orm_costProjectBudgetMin__c, 10), parseInt(component.get("v.businessImpVeryHighData").orm_costProjectBudgetMax__c, 10) );
          
        }
        
		sliderCostProjectVeryHigh.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.showBtnUpdate", true);
		    component.set("v.costProjectVeryHighMin", parseInt(range[0].replace('%', ''), 10))
		    component.set("v.costProjectHighMax", parseInt(range[0].replace('%', ''), 10))
        }));  
        
        var sliderScheduleProjectVeryHigh = component.find('sliderScheduleProjectVeryHigh').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderScheduleProjectVeryHigh = this.createSlider(component, event, helper, sliderScheduleProjectVeryHigh, 60, 100);
        }else{
            sliderScheduleProjectVeryHigh = this.createSlider(component, event, helper, sliderScheduleProjectVeryHigh, parseInt(component.get("v.businessImpVeryHighData").orm_scheduleProjectBaselineMin__c, 10), parseInt(component.get("v.businessImpVeryHighData").orm_scheduleProjectBaselineMax__c, 10) );
          
        }
                
        sliderScheduleProjectVeryHigh.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.scheduleProjectVeryHighMin", parseInt(range[0].replace('%', ''), 10))
		    component.set("v.scheduleProjectHighMax", parseInt(range[0].replace('%', ''), 10))
        }));
        
        var sliderCostProjectHigh = component.find('sliderCostProjectHigh').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderCostProjectHigh = this.createSlider(component, event, helper, sliderCostProjectHigh, 15, 60);
        }else{
            sliderCostProjectHigh = this.createSlider(component, event, helper, sliderCostProjectHigh, parseInt(component.get("v.businessImpHighData").orm_costProjectBudgetMin__c, 10), parseInt(component.get("v.businessImpHighData").orm_costProjectBudgetMax__c, 10) );
          
        }
          
        sliderCostProjectHigh.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.costProjectHighMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.costProjectHighMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.costProjectVeryHighMin", component.get("v.costProjectHighMax"))
	        component.set("v.costProjectMediumMax", component.get("v.costProjectHighMin"))
        }));
        
        var sliderScheduleProjectHigh = component.find('sliderScheduleProjectHigh').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderScheduleProjectHigh = this.createSlider(component, event, helper, sliderScheduleProjectHigh, 15, 60);
        }else{
            sliderScheduleProjectHigh = this.createSlider(component, event, helper, sliderScheduleProjectHigh, parseInt(component.get("v.businessImpHighData").orm_scheduleProjectBaselineMin__c, 10), parseInt(component.get("v.businessImpHighData").orm_scheduleProjectBaselineMax__c, 10) );
          
        }
          
        sliderScheduleProjectHigh.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.showBtnUpdate", true);
		    component.set("v.scheduleProjectHighMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.scheduleProjectHighMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.scheduleProjectVeryHighMin", component.get("v.scheduleProjectHighMax"))
	        component.set("v.scheduleProjectMediumMax", component.get("v.scheduleProjectHighMin"))
        }));
        
        var sliderProductionHigh = component.find('sliderProductionHigh').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderProductionHigh = this.createSliderProduction(component, event, helper, sliderProductionHigh, 12, 26);  
        }else{
            sliderProductionHigh = this.createSliderProduction(component, event, helper, sliderProductionHigh, parseInt(component.get("v.businessImpHighData").orm_productionLossMin__c, 10), parseInt(component.get("v.businessImpHighData").orm_productionLossMax__c, 10) );
          
        }
        
        sliderProductionHigh.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.ProductionLossHighMin", parseInt(range[0].replace('weeks', ''), 10))
		    component.set("v.ProductionLossHighMax", parseInt(range[1].replace('weeks', ''), 10))
		    component.set("v.ProductionLossMediumMax", parseInt(range[0].replace('weeks', ''), 10))
        }));
        
        var sliderCostProjectMedium = component.find('sliderCostProjectMedium').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderCostProjectMedium = this.createSlider(component, event, helper, sliderCostProjectMedium, 5, 15);
        }else{
            sliderCostProjectMedium = this.createSlider(component, event, helper, sliderCostProjectMedium, parseInt(component.get("v.businessImpMediumData").orm_costProjectBudgetMin__c, 10), parseInt(component.get("v.businessImpMediumData").orm_costProjectBudgetMax__c, 10) );
          
        }
          
        sliderCostProjectMedium.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.costProjectMediumMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.costProjectMediumMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.costProjectHighMin", component.get("v.costProjectMediumMax"));
	        component.set("v.costProjectLowMax", component.get("v.costProjectMediumMin"));
        }));
        
        var sliderScheduleProjectMedium = component.find('sliderScheduleProjectMedium').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderScheduleProjectMedium = this.createSlider(component, event, helper, sliderScheduleProjectMedium, 5, 15);  
        }else{
            sliderScheduleProjectMedium = this.createSlider(component, event, helper, sliderScheduleProjectMedium, parseInt(component.get("v.businessImpMediumData").orm_scheduleProjectBaselineMin__c, 10), parseInt(component.get("v.businessImpMediumData").orm_scheduleProjectBaselineMax__c, 10) );
          
        }
        
        sliderScheduleProjectMedium.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.scheduleProjectMediumMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.scheduleProjectMediumMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.scheduleProjectHighMin", component.get("v.scheduleProjectMediumMax"));
	        component.set("v.scheduleProjectLowMax", component.get("v.scheduleProjectMediumMin"));
        }));
        
        var sliderProductionMedium = component.find('sliderProductionMedium').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderProductionMedium = this.createSliderProduction(component, event, helper, sliderProductionMedium, 4, 12);  
        }else{
            sliderProductionMedium = this.createSliderProduction(component, event, helper, sliderProductionMedium, parseInt(component.get("v.businessImpMediumData").orm_productionLossMin__c, 10), parseInt(component.get("v.businessImpMediumData").orm_productionLossMax__c, 10) );
          
        }
          
        sliderProductionMedium.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.ProductionLossMediumMin", parseInt(range[0].replace('weeks', ''), 10)) 
	        component.set("v.ProductionLossMediumMax", parseInt(range[1].replace('weeks', ''), 10))
	        component.set("v.ProductionLossHighMin", component.get("v.ProductionLossMediumMax"))
	        component.set("v.ProductionLossLowMax", component.get("v.ProductionLossMediumMin"))
        }));
        
        var sliderCostProjectLow = component.find('sliderCostProjectLow').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderCostProjectLow = this.createSlider(component, event, helper, sliderCostProjectLow, 0, 5);  
        }else{
            sliderCostProjectLow = this.createSlider(component, event, helper, sliderCostProjectLow, parseInt(component.get("v.businessImpLowData").orm_costProjectBudgetMin__c, 10), parseInt(component.get("v.businessImpLowData").orm_costProjectBudgetMax__c, 10) );
          
        }
          
        sliderCostProjectLow.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.costProjectLowMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.costProjectLowMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.costProjectMediumMin", component.get("v.costProjectLowMax"));
        }));
        
        var sliderScheduleProjectLow = component.find('sliderScheduleProjectLow').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderScheduleProjectLow = this.createSlider(component, event, helper, sliderScheduleProjectLow, 0, 5);  
        }else{
            sliderScheduleProjectLow = this.createSlider(component, event, helper, sliderScheduleProjectLow, parseInt(component.get("v.businessImpLowData").orm_scheduleProjectBaselineMin__c, 10), parseInt(component.get("v.businessImpLowData").orm_scheduleProjectBaselineMax__c, 10) );
          
        }
          
        sliderScheduleProjectLow.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.scheduleProjectLowMin", parseInt(range[0].replace('%', ''), 10)) 
	        component.set("v.scheduleProjectLowMax", parseInt(range[1].replace('%', ''), 10))
	        component.set("v.scheduleProjectMediumMin", component.get("v.scheduleProjectLowMax"));
        }));
        
        var sliderProductionLow = component.find('sliderProductionLow').getElement();
        if(component.get("v.businessImpacts").length == 0){
            sliderProductionLow = this.createSliderProduction(component, event, helper, sliderProductionLow, 0, 4);
        }else{
            sliderProductionLow = this.createSliderProduction(component, event, helper, sliderProductionLow, parseInt(component.get("v.businessImpLowData").orm_productionLossMin__c, 10), parseInt(component.get("v.businessImpLowData").orm_productionLossMax__c, 10) );
          
        }
          
        sliderProductionLow.noUiSlider.on('change', $A.getCallback(function(range) {
            component.set("v.showBtnUpdate", true);
		    component.set("v.ProductionLossLowMin", parseInt(range[0].replace('weeks', ''), 10)) 
	        component.set("v.ProductionLossLowMax", parseInt(range[1].replace('weeks', ''), 10))
	        component.set("v.ProductionLossMediumMin", component.get("v.ProductionLossLowMax"));
        }));
        
        //----cost----------------------
        
        var origins = sliderCostProjectVeryHigh.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
        sliderCostProjectVeryHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[0].replace('%', '')) >= component.get("v.costProjectHighMin")){
               sliderCostProjectHigh.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
            }else{
               sliderCostProjectVeryHigh.noUiSlider.set([component.get("v.costProjectHighMin"), null]);
            }			
			
		}));
		
		sliderCostProjectHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[0].replace('%', '')) >= component.get("v.costProjectMediumMin")){
               sliderCostProjectVeryHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			   sliderCostProjectMedium.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
            }else{
               sliderCostProjectHigh.noUiSlider.set([component.get("v.costProjectMediumMin"), null]);
            }
			
		}));
		
		sliderCostProjectMedium.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[1].replace('%', '')) <= component.get("v.costProjectHighMax") ){
		      sliderCostProjectHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			  sliderCostProjectLow.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
		   }else{
		      sliderCostProjectMedium.noUiSlider.set([null, component.get("v.costProjectHighMax")]);
		   }
			
		}));
		
		var origins = sliderCostProjectLow.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderCostProjectLow.noUiSlider.on('slide', $A.getCallback(function(range){
            if(Number(range[1].replace('%', '')) <= component.get("v.costProjectMediumMax") ){
            
		      sliderCostProjectMedium.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		      
		    }else{
		      sliderCostProjectLow.noUiSlider.set([null, component.get("v.costProjectMediumMax")]);
		    }
			
		})); 
		//---------end cost----------
		//----------------------schedule--------------------
		
		var origins = sliderScheduleProjectVeryHigh.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
        sliderScheduleProjectVeryHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[0].replace('%', '')) >= component.get("v.scheduleProjectHighMin")){
               sliderScheduleProjectHigh.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
            }else{
               sliderScheduleProjectVeryHigh.noUiSlider.set([component.get("v.scheduleProjectHighMin"), null]);
            }			
			
		}));
		
		sliderScheduleProjectHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[0].replace('%', '')) >= component.get("v.scheduleProjectMediumMin")){
               sliderScheduleProjectVeryHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			   sliderScheduleProjectMedium.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
            }else{
               sliderScheduleProjectHigh.noUiSlider.set([component.get("v.scheduleProjectMediumMin"), null]);
            }
			
		}));
		
		sliderScheduleProjectMedium.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[1].replace('%', '')) <= component.get("v.scheduleProjectHighMax") ){
		       sliderScheduleProjectHigh.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			   sliderScheduleProjectLow.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
		   }else{
		       sliderScheduleProjectMedium.noUiSlider.set([null, component.get("v.scheduleProjectHighMax")]);
		   }
			
		}));
		
		var origins = sliderScheduleProjectLow.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderScheduleProjectLow.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[1].replace('%', '')) <= component.get("v.scheduleProjectMediumMax") ){
		       sliderScheduleProjectMedium.noUiSlider.set([Number(range[1].replace('%', '')), null]);
		    }else{
		       sliderScheduleProjectLow.noUiSlider.set([null, component.get("v.scheduleProjectMediumMax")]);
		    }
		    
		})); 
		//----------------end schedule--------------------
		
		//----------------Production--------------------
		
		sliderProductionHigh.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[0].replace('weeks', '')) >= component.get("v.ProductionLossMediumMin")){
               sliderProductionMedium.noUiSlider.set([null, Number(range[0].replace('weeks', ''))]);
            }else{
               sliderProductionHigh.noUiSlider.set([component.get("v.ProductionLossMediumMin"), null]);
            }
			
		}));
		
		sliderProductionMedium.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[1].replace('weeks', '')) <= component.get("v.ProductionLossHighMax") ){
		      sliderProductionHigh.noUiSlider.set([Number(range[1].replace('weeks', '')), null]);
			  sliderProductionLow.noUiSlider.set([null, Number(range[0].replace('weeks', ''))]);
		    }else{
		      sliderProductionMedium.noUiSlider.set([null, component.get("v.ProductionLossHighMax")]);
		    }
			
		}));
		
		var origins = sliderProductionLow.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderProductionLow.noUiSlider.on('slide', $A.getCallback(function(range){
			
			if(Number(range[1].replace('weeks', '')) <= component.get("v.ProductionLossMediumMax") ){
            
		      sliderProductionMedium.noUiSlider.set([Number(range[1].replace('weeks', '')), null]);
		      
		    }else{
		      sliderProductionLow.noUiSlider.set([null, component.get("v.ProductionLossMediumMax")]);
		    }
			
		})); 
		//--------------end Production--------------------
        
        //Hide the Spinner
        var evtHideSpinner = $A.get("e.c:OrmHideSpinnerEvt");
        evtHideSpinner.fire();
    },
    
    cancelModifProbabiliy : function(component, event, helper){
            console.log('*********dans cancelMofProba***********');
        	console.log('Size: '+ component.get("v.probabilities").length);
        	
        	if(component.get("v.probabilities").length > 0){
    	   
               for (var i = 0; i < component.get("v.probabilities").length; i++) {
                      if(component.get("v.probabilities")[i].orm_probability__c == 'Probable' ){
                         component.set("v.probableData", component.get("v.probabilities")[i]);
                         
                         var sliderProbable = component.find('sliderProbable').getElement();
                         sliderProbable.noUiSlider.set([component.get("v.probableData").orm_pourcentageMin__c, null]);
                      }
                      if(component.get("v.probabilities")[i].orm_probability__c == 'Possible' ){
                         component.set("v.possibleData", component.get("v.probabilities")[i]);
                         
                         var sliderPossible = component.find('sliderPossible').getElement();
                         sliderPossible.noUiSlider.set([component.get("v.possibleData").orm_pourcentageMin__c, component.get("v.possibleData").orm_pourcentageMax__c]);
                      }
                      if(component.get("v.probabilities")[i].orm_probability__c == 'Unlikely' ){
                         component.set("v.unlikelyData", component.get("v.probabilities")[i]);
                         
                         var sliderUnlikely  = component.find('sliderUnlikely').getElement();
                         sliderUnlikely.noUiSlider.set([component.get("v.unlikelyData").orm_pourcentageMin__c, component.get("v.unlikelyData").orm_pourcentageMax__c]);
                      }
                      if(component.get("v.probabilities")[i].orm_probability__c == 'Rare' ){
                         component.set("v.RareData", component.get("v.probabilities")[i]);
                         
                         var sliderRare   = component.find('sliderRare').getElement();
                         sliderRare.noUiSlider.set([component.get("v.RareData").orm_pourcentageMin__c, component.get("v.RareData").orm_pourcentageMax__c]);
                      }
                   }
	        	}	
		        	
    },
    
    cancelModifBusinessImpact : function(component, event, helper){
    
        if(component.get("v.businessImpacts").length > 0){
		console.log(JSON.stringify(component.get("v.businessImpacts")));
			 for (var i = 0; i < component.get("v.businessImpacts").length; i++) {
			        	        
                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'VeryHigh' ){
                         component.set("v.businessImpVeryHighData", component.get("v.businessImpacts")[i]);
                          
                         var sliderCostProjectVeryHigh = component.find('sliderCostProjectVeryHigh').getElement();
                         sliderCostProjectVeryHigh.noUiSlider.set([component.get("v.businessImpVeryHighData").orm_costProjectBudgetMin__c, null]);
                         
                         var sliderScheduleProjectVeryHigh = component.find('sliderScheduleProjectVeryHigh').getElement();
                         sliderScheduleProjectVeryHigh.noUiSlider.set([component.get("v.businessImpVeryHighData").orm_scheduleProjectBaselineMin__c, component.get("v.businessImpVeryHighData").orm_scheduleProjectBaselineMax__c]);
                           
                      }
                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'High' ){
                         component.set("v.businessImpHighData", component.get("v.businessImpacts")[i]);
                         
                         var sliderCostProjectHigh = component.find('sliderCostProjectHigh').getElement();
                         sliderCostProjectHigh.noUiSlider.set([component.get("v.businessImpHighData").orm_costProjectBudgetMin__c, component.get("v.businessImpHighData").orm_costProjectBudgetMax__c]);

                         var sliderScheduleProjectHigh = component.find('sliderScheduleProjectHigh').getElement();
                         sliderScheduleProjectHigh.noUiSlider.set([component.get("v.businessImpHighData").orm_scheduleProjectBaselineMin__c, component.get("v.businessImpHighData").orm_scheduleProjectBaselineMax__c]);

                         var sliderProductionHigh = component.find('sliderProductionHigh').getElement();
                         sliderProductionHigh.noUiSlider.set([component.get("v.businessImpHighData").orm_productionLossMin__c, component.get("v.businessImpHighData").orm_productionLossMax__c]);
                        
                      }
                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'Medium' ){
                         component.set("v.businessImpMediumData", component.get("v.businessImpacts")[i]);
                         
                         var sliderCostProjectMedium = component.find('sliderCostProjectMedium').getElement();
                         sliderCostProjectMedium.noUiSlider.set([component.get("v.businessImpMediumData").orm_costProjectBudgetMin__c, component.get("v.businessImpMediumData").orm_costProjectBudgetMax__c]);


                         var sliderScheduleProjectMedium = component.find('sliderScheduleProjectMedium').getElement();
                         sliderScheduleProjectMedium.noUiSlider.set([component.get("v.businessImpMediumData").orm_scheduleProjectBaselineMin__c, component.get("v.businessImpMediumData").orm_scheduleProjectBaselineMax__c]);


                         var sliderProductionMedium = component.find('sliderProductionMedium').getElement();
                         sliderProductionMedium.noUiSlider.set([component.get("v.businessImpMediumData").orm_productionLossMin__c, component.get("v.businessImpMediumData").orm_productionLossMax__c]);
                         
                      }
                      if(component.get("v.businessImpacts")[i].orm_rating__c == 'Low' ){
                         component.set("v.businessImpLowData", component.get("v.businessImpacts")[i]);
                         
                         var sliderCostProjectLow = component.find('sliderCostProjectLow').getElement();
                         sliderCostProjectLow.noUiSlider.set([component.get("v.businessImpLowData").orm_costProjectBudgetMin__c, component.get("v.businessImpLowData").orm_costProjectBudgetMax__c]);


                         var sliderScheduleProjectLow = component.find('sliderScheduleProjectLow').getElement();
                         sliderScheduleProjectLow.noUiSlider.set([component.get("v.businessImpLowData").orm_scheduleProjectBaselineMin__c, component.get("v.businessImpLowData").orm_scheduleProjectBaselineMax__c]);


                         var sliderProductionLow = component.find('sliderProductionLow').getElement();
                         sliderProductionLow.noUiSlider.set([component.get("v.businessImpLowData").orm_productionLossMin__c, component.get("v.businessImpLowData").orm_productionLossMax__c]);
                         
                      }
		       }
		}
    },
    
    getHsseImpacts : function(component, event, helper) {
    	  var action = component.get('c.findHsseImpactsByAssessment');
	      action.setParams({ "assessment": component.get("v.idAssessment") });
	      action.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	            
	        	component.set("v.hsseImpacts", response.getReturnValue());	
	        	console.log('*****want to see the size******')
	            console.log(component.get("v.hsseImpacts").length) 
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
	                    
	        	  }else{
	        	  
	        	      var newItemHsseVeryHigh = component.get("v.hsseVeryHighData");
	        	      newItemHsseVeryHigh.orm_healthAndSafety__c = "Fatality";
	        	      newItemHsseVeryHigh.orm_security__c = "Security breach with major property damage and loss";
	        	      newItemHsseVeryHigh.orm_environmentAndCommunity__c = "Uncontained spill or event with severe environmental or community impact.  Mandatory obligation to Regulator";
	        	      component.set("v.hsseVeryHighData", newItemHsseVeryHigh);
	        	      
	        	      var newItemHsseHigh = component.get("v.hsseHighData");
	        	      newItemHsseHigh.orm_healthAndSafety__c = "Lost Time Incident";
	        	      newItemHsseHigh.orm_security__c = "Security breach with serious property damage and loss";
	        	      newItemHsseHigh.orm_environmentAndCommunity__c = "Uncontained spill or event with serious environmental or community impact. Necessary to obtain directive from Regulator";
	        	      component.set("v.hsseHighData", newItemHsseHigh);
	        	      
	        	      var newItemHsseMedium = component.get("v.hsseMediumData");
	        	      newItemHsseMedium.orm_healthAndSafety__c = "Medical Treatment Case";
	        	      newItemHsseMedium.orm_security__c = "Security breach with moderate property damage and loss";
	        	      newItemHsseMedium.orm_environmentAndCommunity__c = "Uncontained spill  or event with minor environmental or community impact. Recommended engagement with Regulator";
	        	      component.set("v.hsseMediumData", newItemHsseMedium);
	        	      
	        	      var newItemHsseLow = component.get("v.hsseLowData");
	        	      newItemHsseLow.orm_healthAndSafety__c = "First Aid Case";
	        	      newItemHsseLow.orm_security__c = "Security breach with minor property damage and/or loss";
	        	      newItemHsseLow.orm_environmentAndCommunity__c = "Local contained spill or event with no environmental or community impact. No need to engage Regulator";
	        	      component.set("v.hsseLowData", newItemHsseLow);
	        	  
	        	  }
	        	
	        } else {
	        	alert("ERROR getHsseImpacts")	
	        }
	     });
	     $A.enqueueAction(action);
    },
     
})