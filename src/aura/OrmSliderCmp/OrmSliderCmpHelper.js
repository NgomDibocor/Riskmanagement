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
	
	/*getProbability : function(component, event, helper, probability) {
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
	},*/
	
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
    
    getHsseImpacts : function(component, event, helper) {
          console.log('in ')
    	  var action = component.get('c.findHsseImpactsByAssessment');
	      action.setParams({ "assessment": component.get("v.idAssessment") });
	      action.setCallback(this, function(response) {
	        if(response.getState() == 'SUCCESS'){
	            
	        	component.set("v.hsseImpacts", response.getReturnValue());	
	        	console.log('*****want to see the size******')
	            console.log(component.get("v.hsseImpacts").length) 
	            //console.log(JSON.stringify(component.get("v.hsseImpacts")))
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
    }
    
    
   
})