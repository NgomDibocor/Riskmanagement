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
	
	getProbability : function(component, event, helper, probability) {
	      var actionProba = component.get('c.getProbability');
	      actionProba.setParams({ "assessment" : component.get("v.idAssessment"),
	                              "probability" : probability
	                           });
	      actionProba.setCallback(this, function(response) {
		        if(response.getState() == 'SUCCESS'){
		            var probable = {};
                    probable.sobjectType = 'Macro';
                    probable = response.getReturnValue();
                    console.log(JSON.stringify(probable))
		            //response.getReturnValue();
		        } else {
		        	alert("ERROR")	
		        }
	      });
	      $A.enqueueAction(actionProba);
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
			sliderPossible.noUiSlider.set([null, Number(range[0].replace('%', ''))]);			
			
		}));
		sliderPossible.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderProbable.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			//component.set("v.probableMin", parseInt(range[1].replace('%', ''), 10))
			
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
        
        sliderPossible.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderUnlikely.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));  
		sliderUnlikely.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderPossible.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			
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
        
        sliderUnlikely.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderRare.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));  
		sliderRare.noUiSlider.on('slide', $A.getCallback(function(range){
			sliderUnlikely.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			
		})); 
    },
    
    jsLoaded2 : function(component, event, helper) {
	
	    //start first slider
        var slider = component.find('slider5').getElement();
        slider = this.createSlider(component, event, helper, slider, 0, 100);
        
		slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valCostmin", range[0].replace('%', ''))
		    component.set("v.valCostmax", range[1].replace('%', ''))
        }));
        //end first slider
        

        //start second slider
        var slider = component.find('slider6').getElement();
        slider = this.createSlider(component, event, helper, slider, 0, 100);        
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider
        
        //start second slider
        var slider = component.find('slider7').getElement();
        slider = this.createSlider(component, event, helper, slider, 0, 100);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider   
        
        //start second slider
        var slider = component.find('slider8').getElement();
        slider = this.createSlider(component, event, helper, slider, 0, 100);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider   
        
        //start second slider
        var slider = component.find('slider9').getElement();
        slider = this.createSlider(component, event, helper, slider, 0, 100);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        //start second slider
        var slider = component.find('slider10').getElement();
        slider = this.createSlider(component, event, helper, slider, 0, 100);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider    
        
        //start second slider
        var slider = component.find('slider11').getElement();
        slider = this.createSlider(component, event, helper, slider, 0, 100);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        //start second slider
        var slider12 = component.find('slider12').getElement();
        slider12 = this.createSlider(component, event, helper, slider12, 0, 100);  
        
        slider12.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        //start second slider
        var slider13 = component.find('slider13').getElement();
        slider13 = this.createSlider(component, event, helper, slider13, 0, 100);  
        
        slider13.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        //start second slider
        var slider14 = component.find('slider14').getElement();
        slider14 = this.createSlider(component, event, helper, slider14, 0, 100);  
        
        slider14.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider  
        
        //start second slider
        var slider15 = component.find('slider15').getElement();
        slider15 = this.createSlider(component, event, helper, slider15, 0, 100);  
        
        slider15.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider  
    },
    
    
    deleteProba : function(component, event, helper) {
    
        var actiondeletePrevious = component.get('c.deletePreviousProbalities');
	      actiondeletePrevious.setParams({ "assessment": component.get("v.idAssessment") });
	      actiondeletePrevious.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	        	
	        } else {
	        	alert("ERROR")	
	        }
	     });
	     $A.enqueueAction(actiondeletePrevious); 
    },
    
    /*getProbilities : function(component, event, helper) {
    	  var action = component.get('c.findAllProbabilitiesByAssessment');
	      action.setParams({ "assessment": component.get("v.idAssessment") });
	      action.setCallback(this, function(response) {
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
	        	
	        } else {
	        	alert("ERROR")	
	        }
	     });
	     $A.enqueueAction(action);
    }*/
    
    
   
})