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
	
        //start second slider
        var slider2 = component.find('slider2').getElement();
        slider2 = this.createSlider(component, event, helper, slider2, 25, 75);        
        
        slider2.noUiSlider.on('change', $A.getCallback(function(range) {
            
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider
        
        //start first slider
        var slider = component.find('slider').getElement();
        slider = this.createSlider(component, event, helper, slider, 75, 100);
        var origins = slider.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
		slider.noUiSlider.on('change', $A.getCallback(function(range) {
				 
			//console.log(slider.noUiSlider.get()[0].replace('%', ''))
			//console.log(slider2.noUiSlider.get()[1].replace('%', ''))
			   
		    component.set("v.valCostmin", range[0].replace('%', ''))
		    component.set("v.valCostmax", range[1].replace('%', ''))
        }));
        
        //Locking slider and slider2 together
        slider.noUiSlider.on('slide', $A.getCallback(function(range){
			slider2.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));
		slider2.noUiSlider.on('slide', $A.getCallback(function(range){
			slider.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			
		}));
        //Locking slider and slider2 together
        
        //start second slider
        var slider3 = component.find('slider3').getElement();
        slider3 = this.createSlider(component, event, helper, slider3, 5, 25);  
        
        slider3.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        slider2.noUiSlider.on('slide', $A.getCallback(function(range){
			slider3.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));  
		slider3.noUiSlider.on('slide', $A.getCallback(function(range){
			slider2.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			
		}));
        
        //start second slider
        var slider4 = component.find('slider4').getElement();
        slider4 = this.createSlider(component, event, helper, slider4, 0, 5);  
        var origins = slider4.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        slider4.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider   
        
        slider3.noUiSlider.on('slide', $A.getCallback(function(range){
			slider4.noUiSlider.set([null, Number(range[0].replace('%', ''))]);
			
		}));  
		slider4.noUiSlider.on('slide', $A.getCallback(function(range){
			slider3.noUiSlider.set([Number(range[1].replace('%', '')), null]);
			
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