({
	createSlider : function(component, event, helper, slider) {
	     var min = parseInt(component.get("v.min"), 10);
         var max = parseInt(component.get("v.max"), 10);
         var step = parseInt(component.get("v.step"), 10);
	
		 noUiSlider.create(slider, {
            start: [min, max],
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
        slider2 = this.createSlider(component, event, helper, slider2);        
        
        slider2.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider
        
        //start first slider
        var slider = component.find('slider').getElement();
        slider = this.createSlider(component, event, helper, slider);
        var origins = slider.getElementsByClassName('noUi-origin');
        origins[1].setAttribute('disabled', true);
		slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    slider2.noUiSlider.set(parseInt(range[1].replace('%', ''), 10));
		    component.set("v.valCostmin", range[0].replace('%', ''))
		    component.set("v.valCostmax", range[1].replace('%', ''))
        }));
        //end first slider
        
        //start second slider
        var slider3 = component.find('slider3').getElement();
        slider3 = this.createSlider(component, event, helper, slider3);  
        
        slider3.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider   
        
        //start second slider
        var slider4 = component.find('slider4').getElement();
        slider4 = this.createSlider(component, event, helper, slider4);  
        var origins = slider4.getElementsByClassName('noUi-origin');
        origins[0].setAttribute('disabled', true);
        
        slider4.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider    
    },
    
    jsLoaded2 : function(component, event, helper) {
	
	    //start first slider
        var slider = component.find('slider5').getElement();
        slider = this.createSlider(component, event, helper, slider);
        
		slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valCostmin", range[0].replace('%', ''))
		    component.set("v.valCostmax", range[1].replace('%', ''))
        }));
        //end first slider
        

        //start second slider
        var slider = component.find('slider6').getElement();
        slider = this.createSlider(component, event, helper, slider);        
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider
        
        //start second slider
        var slider = component.find('slider7').getElement();
        slider = this.createSlider(component, event, helper, slider);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider   
        
        //start second slider
        var slider = component.find('slider8').getElement();
        slider = this.createSlider(component, event, helper, slider);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider   
        
        //start second slider
        var slider = component.find('slider9').getElement();
        slider = this.createSlider(component, event, helper, slider);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        //start second slider
        var slider = component.find('slider10').getElement();
        slider = this.createSlider(component, event, helper, slider);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider    
        
        //start second slider
        var slider = component.find('slider11').getElement();
        slider = this.createSlider(component, event, helper, slider);  
        
        slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        //start second slider
        var slider12 = component.find('slider12').getElement();
        slider12 = this.createSlider(component, event, helper, slider12);  
        
        slider12.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        //start second slider
        var slider13 = component.find('slider13').getElement();
        slider13 = this.createSlider(component, event, helper, slider13);  
        
        slider13.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider 
        
        //start second slider
        var slider14 = component.find('slider14').getElement();
        slider14 = this.createSlider(component, event, helper, slider14);  
        
        slider14.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider  
        
        //start second slider
        var slider15 = component.find('slider15').getElement();
        slider15 = this.createSlider(component, event, helper, slider15);  
        
        slider15.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end second slider  
    },
    
    
    
   
})