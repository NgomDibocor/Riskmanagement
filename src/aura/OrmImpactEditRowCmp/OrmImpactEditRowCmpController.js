({
doInit: function(component, event, helper) {
        helper.fetchPickListVal(component, 'orm_categorie_impact__c', 'statusPicklistOpts');
    },
	inlineEditCategorieImpact : function(component, event, helper) {
		// show the name edit field popup 
        component.set("v.categorieImpactEditMode", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("categorieImpact").focus();
        }, 100);
	},
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
     onDescriptionChange : function(component,event,helper) { 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
    oncategorieImpactChange : function(component,event,helper) { 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
    onNameChange : function(component,event,helper) { 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
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
     selectAll : function (component, event, helper) {    	
    		
    	var selectedHeaderCheck = event.getParam("selectAllCheckbox");
    	// get all checkbox on table with "boxPack" aura id (all iterate value have same Id)
    	// return the List of all checkboxs element 
    	var getAllId = component.find("boxPack");
    	// If the local ID is unique[in single record case], find() returns the component. not array   
    	if(! Array.isArray(getAllId)) {
    		if(selectedHeaderCheck == true){ 
    			component.find("boxPack").set("v.value", true);
    			//component.set("v.selectedCount", 1);
    		} else {
    			component.find("boxPack").set("v.value", false);
    			//component.set("v.selectedCount", 0);
    		}
    	} else {
    		// check if select all (header checkbox) is true then true all checkboxes on table in a for loop  
    		// and set the all selected checkbox length in selectedCount attribute.
    		// if value is false then make all checkboxes false in else part with play for loop 
    		// and select count as 0 
    		if (selectedHeaderCheck == true) {
    			 for (var i = 0; i < getAllId.length; i++) {
    				component.find("boxPack")[i].set("v.value", true);
    				//component.set("v.selectedCount", getAllId.length);
    			 }
    		} else {
    			for (var i = 0; i < getAllId.length; i++) {
    				component.find("boxPack")[i].set("v.value", false);
    				component.set("v.selectedCount", 0);
    			}
    		} 
    	}
    },
    
    checkboxSelect : function (component, event, helper) {
    
    },
     deleteSelected : function (component, event, helper) {
    	var idAssessmentRisk = event.getParam('idAssessmentRisk');
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
    
})