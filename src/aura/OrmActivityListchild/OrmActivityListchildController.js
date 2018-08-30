({
	doInit: function(component, event, helper) {
	 
      // call the apex class method and fetch activity list  
      
      // call the fetchPickListVal(component, field_API_Name, aura_attribute_name_for_store_options) -
      // method for get picklist values dynamic   
        helper.fetchPickListVal(component, 'orm_activityStatus__c', 'statusPicklistOpts');
    },
     inlineEditName : function(component,event,helper){   
        // show the name edit field 
        component.set("v.nameEditMode", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("inputId").focus();
        }, 100);
    },
       inlineEditDescription : function(component,event,helper){   
        // show the name edit field 
        component.set("v.descriptionEditMode ", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("inputIddesc").focus();
        }, 100);
    },
      inlineEditPeriod : function(component,event,helper){   
        // show the period edit field 
        component.set("v.periodEditMode", true); 
        // after the 100 millisecond set focus to input field startDate and endDate
        setTimeout(function(){ 
            component.find("startDateid").focus();
        }, 100);
          setTimeout(function(){ 
            component.find("endDateid").focus();
        }, 100);
    },
    
    inlineEditStatus : function(component,event,helper){   
        // show the status edit field 
        component.set("v.statusEditMode", true); 
        // after set ratingEditMode true, set picklist options to picklist field 
        component.find("accStatus").set("v.options" , component.get("v.statusPicklistOpts"));
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("accStatus").focus();
        }, 100);
    },
    
     onNameChange : function(component,event,helper){ 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
 
    onStatusChange : function(component,event,helper){ 
        // if picklist value change,
        // then show save and cancel button by set attribute to true
        component.set("v.showSaveCancelBtn",true);
    },    
        onStartDateChange : function(component,event,helper){ 
        // if picklist value change,
        // then show save and cancel button by set attribute to true
        component.set("v.showSaveCancelBtn",true);
    },  
    // For count the selected checkboxes. 
 checkboxSelect: function(component, event, helper) {
  // get the selected checkbox value  
  var selectedRec = event.getSource().get("v.value");
  // get the selectedCount attrbute value(default is 0) for add/less numbers. 
  var getSelectedNumber = component.get("v.selectedCount");
  // check, if selected checkbox value is true then increment getSelectedNumber with 1 
  // else Decrement the getSelectedNumber with 1     
  if (selectedRec == true) {
   getSelectedNumber++;
  } else {
   getSelectedNumber--;
  }
  // set the actual value on selectedCount attribute to show on header part. 
  component.set("v.selectedCount", getSelectedNumber);
 },
 
    closeNameBox : function (component, event, helper) {
      // on focus out, close the input section by setting the 'nameEditMode' att. as false   
        component.set("v.nameEditMode", false); 
      // check if change/update Name field is blank, then add error class to column -
      // by setting the 'showErrorClass' att. as True , else remove error class by setting it False   
        if(event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass",true);
        }else{
            component.set("v.showErrorClass",false);
        }
    }, 
     closeDescriptionBox : function (component, event, helper) {
  
      // on focus out, close the input section by setting the 'periodEditMode' att. as false   
        component.set("v.descriptionEditMode", false); 
      
    },
    closeStartDateBox : function (component, event, helper) {
  
      // on focus out, close the input section by setting the 'periodEditMode' att. as false   
        component.set("v.periodEditMode", false); 
      
    }, 
    closeStatusBox : function (component, event, helper) {
       // on focus out, close the input section by setting the 'statusEditMode' att. as false
        component.set("v.statusEditMode", false); 
    },
    // For select all Checkboxes 
 selectAllActivity: function(component, event, helper) {
  //get the header checkbox value  
  var selectedHeaderCheck = event.getSource().get("v.value");
  // get all checkbox on table with "boxPack" aura id (all iterate value have same Id)
  // return the List of all checkboxs element 
  var getAllId = component.find("boxPack");
  // If the local ID is unique[in single record case], find() returns the component. not array   
     if(! Array.isArray(getAllId)){
       if(selectedHeaderCheck == true){ 
          component.find("boxPack").set("v.value", true);
          component.set("v.selectedCount", 1);
       }else{
           component.find("boxPack").set("v.value", false);
           component.set("v.selectedCount", 0);
       }
     }else{
       // check if select all (header checkbox) is true then true all checkboxes on table in a for loop  
       // and set the all selected checkbox length in selectedCount attribute.
       // if value is false then make all checkboxes false in else part with play for loop 
       // and select count as 0 
        if (selectedHeaderCheck == true) {
        for (var i = 0; i < getAllId.length; i++) {
  		  component.find("boxPack")[i].set("v.value", true);
   		 component.set("v.selectedCount", getAllId.length);
        }
        } else {
          for (var i = 0; i < getAllId.length; i++) {
    		component.find("boxPack")[i].set("v.value", false);
   			 component.set("v.selectedCount", 0);
  	    }
       } 
     }  
 
 },
 //For Delete selected records 
 deleteSelected: function(component, event, helper) {

  // create var for store record id's for selected checkboxes  
  var delId = [];
  // get all checkboxes 
  var getAllId = component.find("boxPack");
  // If the local ID is unique[in single record case], find() returns the component. not array
     if(! Array.isArray(getAllId)){
         if (getAllId.get("v.value") == true) {
           delId.push(getAllId.get("v.text"));
         }
     }else{
     // play a for loop and check every checkbox values 
     // if value is checked(true) then add those Id (store in Text attribute on checkbox) in delId var.
     for (var i = 0; i < getAllId.length; i++) {
       if (getAllId[i].get("v.value") == true) {
         delId.push(getAllId[i].get("v.text"));
       }
      }
     } 
   
     // call the helper function and pass all selected record id's.    
      helper.deleteSelectedHelper(component, event, delId);
        
 },
})