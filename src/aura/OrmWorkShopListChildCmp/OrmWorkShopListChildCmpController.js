({
	    inlineEditName : function(component,event,helper){   
        // show the name edit field 
        component.set("v.nameEditMode", true); 
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("inputId").focus();
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
    
    inlineEditMessage : function(component,event,helper){   
        // show the status edit field 
        component.set("v.messageEditMode", true); 
        
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("accMessage").focus();
        }, 100);
    },
      inlineEditInvitation : function(component,event,helper){   
        // show the status edit field 
        component.set("v.invitationEditMode", true);
        // after the 100 millisecond set focus to input field   
        setTimeout(function(){ 
            component.find("invitationid").focus();
        }, 100);
    },
    onNameChange : function(component,event,helper){ 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
      onDataChange : function(component,event,helper){ 
        // if date  start or end change,
        // then show save and cancel button by set attribute to true
        component.set("v.showSaveCancelBtn",true);
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
       closePeriodBox : function (component, event, helper) {
  
      // on focus out, close the input section by setting the 'periodEditMode' att. as false   
        component.set("v.periodEditMode", false); 
      
    }, 
     closeMessageBox : function (component, event, helper) {
  
      // on focus out, close the input section by setting the 'messageEditMode' att. as false   
        component.set("v.messageEditMode", false); 
      
    }, 
     closeInvitationBox : function (component, event, helper) {
  
      // on focus out, close the input section by setting the 'messageEditMode' att. as false   
        component.set("v.invitationEditMode", false); 
      
    },
})