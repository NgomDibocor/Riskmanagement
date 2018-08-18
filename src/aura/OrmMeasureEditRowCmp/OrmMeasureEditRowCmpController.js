({
	inlineEditName : function(component, event, helper) {
		// show the name edit field popup 
        component.set("v.nameEditMode", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("idName").focus();
        }, 100);
	},
	
	inlineEditDescription : function(component, event, helper){   
        // show the rating edit field popup 
        component.set("v.descriptionEditMode", true);        
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("idDescription").focus();
        }, 100);
    },
    
    closeNameBox : function(component, event, helper){ 
    	// on focus out, close the input section by setting the 'nameEditMode' att. as false   
        component.set("v.nameEditMode", false); 
        // check if change/update Name field is blank, then add error class to column -
        // by setting the 'showErrorClass' att. as True , else remove error class by setting it False   
        if(event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass", true);
        } else {
            component.set("v.showErrorClass", false);
        }
    },
    
    closeDescriptionBox : function(component, event, helper){ 
    	// on focus out, close the input section by setting the 'nameEditMode' att. as false   
        component.set("v.descriptionEditMode", false); 
        // check if change/update Name field is blank, then add error class to column -
        // by setting the 'showErrorClass' att. as True , else remove error class by setting it False   
        if(event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass", true);
        } else {
            component.set("v.showErrorClass", false);
        }
    },
    
    
    onNameChange : function(component, event, helper){ 
    	// if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
    
    onDescriptionChange : function(component, event, helper){ 
    	// if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
    
    deleteSelected : function(component, event, helper) {
    	var idAssessmentRisk = event.getParam('idAssessmentRisk');
    	console.log('idAssessmentRisk '+ idAssessmentRisk);
    	// create var for store record id's for selected checkboxes  
    	var delId = [];
    	// get all checkboxes 
    	var getAllId = component.find("boxPack");
    	// If the local ID is unique[in single record case], find() returns the component. not array
    	if(! Array.isArray(getAllId)){
    		if (getAllId.get("v.value") == true) {
    			delId.push(getAllId.get("v.text"));
    		}
    	} else {
    		// play a for loop and check every checkbox values 
    		// if value is checked(true) then add those Id (store in Text attribute on checkbox) in delId var.
    		for (var i = 0; i < getAllId.length; i++) {
    			if (getAllId[i].get("v.value") == true) {
    				delId.push(getAllId[i].get("v.text"));
    			}
    		}
    	}   
    	// call the helper function and pass all selected record id's.    
    	helper.deleteSelectedHelper(component, event, delId, idAssessmentRisk);
    },
    
    checkboxSelect : function(component, event, helper) { 
     
    	var showButtonDelete = false;
    	var checkboxSelecteds = component.find("boxPack");
    	var selectedBooleans = [];
    	selectedBooleans = component.get('v.selectedBooleans');
    	if(!Array.isArray(checkboxSelecteds)) {
    		if (checkboxSelecteds.get("v.value") == true) {
    			//showButtonDelete = true; 
    			   			
    			selectedBooleans.push(1);
    			component.set('v.selectedBooleans', selectedBooleans);
    		} else {
    			if(component.get('v.selectedBooleans').length != null && component.get('v.selectedBooleans').length > 0){
    				selectedBooleans.splice(0,1);
    				component.set('v.selectedBooleans', selectedBooleans);
    			}
			}
    	} else {
			checkboxSelecteds.forEach(function(element){
				if(element.get('v.value') == true) {
					//showButtonDelete = true;
					//break;
					selectedBooleans.push(1);
					
					component.set('v.selectedBooleans', selectedBooleans);
				} else {
					if(component.get('v.selectedBooleans').length != null && component.get('v.selectedBooleans').length > 0){
						selectedBooleans.splice(0,1);
						component.set('v.selectedBooleans', selectedBooleans);
					}
				}
			});
		}
		
		var index = component.get('v.selectedBooleans').indexOf(1);
		if(index != -1){
			showButtonDelete = true;
		}
		/*component.get('v.selectedBooleans').forEach(function(element){
			console.log('elememt '+ element);
			if(element){
				showButtonDelete = true;
				return;
			}
		});*/
		//console.log('declenche event '+ showButtonDelete);		
		var evt = $A.get('e.c:OrmShowButtondeleteMeasureEvt');
		evt.setParams({'showButtonDelete': showButtonDelete});
		evt.fire();
    }
})