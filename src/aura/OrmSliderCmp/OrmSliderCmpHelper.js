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
	
	jsLoaded : function(component, event, helper) {
	
        //start sliderPossible
        var sliderPossible = component.find('sliderPossible').getElement();
        sliderPossible = this.createSlider(component, event, helper, sliderPossible, 25, 75);        
        
        sliderPossible.noUiSlider.on('change', $A.getCallback(function(range) {
        //update probableMin attribute
	    component.set("v.possibleMin", parseInt(range[0].replace('%', ''), 10)) 
	    component.set("v.possibleMax", parseInt(range[1].replace('%', ''), 10))
	    component.set("v.probableMin", component.get("v.possibleMax"))
	    component.set("v.unlikelyMax", component.get("v.possibleMin"))
        }));
        //end sliderPossible
        
        //start first slider
        var sliderProbable = component.find('sliderProbable').getElement();
        sliderProbable = this.createSlider(component, event, helper, sliderProbable, 75, 100);
        var origins = sliderProbable.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
		sliderProbable.noUiSlider.on('change', $A.getCallback(function(range) {
	    //update probableMin attribute
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
        sliderUnlikely = this.createSlider(component, event, helper, sliderUnlikely, 5, 25);  
        
        sliderUnlikely.noUiSlider.on('change', $A.getCallback(function(range) {
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
        sliderRare = this.createSlider(component, event, helper, sliderRare, 0, 5);  
        var origins = sliderRare.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        sliderRare.noUiSlider.on('change', $A.getCallback(function(range) {
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
    
    
    
   
})