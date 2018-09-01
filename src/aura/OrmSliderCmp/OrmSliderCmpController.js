({
    jsLoaded : function(component, event, helper) {
        //start first slider
        var slider = component.find('slider').getElement();
        slider = helper.createSlider(component, event, helper, slider);
        
		slider.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valCostmin", range[0].replace('%', ''))
		    component.set("v.valCostmax", range[1].replace('%', ''))
        }));
        //end first slider
        
        //start second slider
        var slider2 = component.find('slider2').getElement();
        slider2 = helper.createSlider(component, event, helper, slider2);
        
        slider2.noUiSlider.on('change', $A.getCallback(function(range) {
		    component.set("v.valpourcentagemin", range[0].replace('%', ''))
		    component.set("v.valpourcentagemax", range[1].replace('%', ''))
        }));
        //end first slider
    },
   
})