({
	refreshList : function(component, event, helper) {
		//alert(event.getParam('idAssessmentRisk'));
		component.set("v.idAssessmentRisk", event.getParam('idAssessmentRisk'));
		helper.getAllMeasuresByAssessmentRisk(component, event);
	},
	
	save: function(component, event, helper) {
	
	},
	
	filterMeasure : function (component, event, helper){
    	
    	var measures = component.get('v.measures');
    	var data = measures;
    	var key = component.get('v.key');
    	var regex;    	
    	
    	if ($A.util.isEmpty(key)) {    	
    		helper.getAllMeasuresByAssessmentRisk(component, event);    		      
         } else {
        	key = "^" + key;
        	try {
        	 		regex = new RegExp(key, "i");
        	 		// filter checks each row, constructs new array where function returns true
        	 		data = data.filter(row => regex.test(row.Name)|| regex.test(row.Description));
		        } catch (e) {
		    	   
		        }
		   component.set("v.measures", data);
         }        	
    },
    
    openNewMeasureCmp : function (component, event, helper){
        var evt = $A.get("e.c:OrmNewMeasureClickedEvt");
		evt.fire();
    },
    sendDescriptionFieldMeasure : function (component, event, helper){
    
    },
    openModalDeleteMeasure : function (component, event, helper){
    
    },
    cancel : function(component,event,helper) {
       
    },
})