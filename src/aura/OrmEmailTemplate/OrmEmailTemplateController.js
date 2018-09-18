({
 
  /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method close modal email template
 * @history 
 * 2018-09-11 : Salimata NGOM - Implementation
 */
	closeMailTemplate : function(component, event, helper) {
                         
		component.set("v.emailTemplate",false);
	},
  /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method to get Email template on load component
 * @history 
 * 2018-09-11 : Salimata NGOM - Implementation
 */
     loadComponent : function(component, event, helper) {
          helper.getSelctedContacts(component, event);
        helper.getEmailTempaltes(component, event);
      
    },
 /**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description method to get Email template details selected
 * @history 
 * 2018-09-11 : Salimata NGOM - Implementation
 */
    loadTemplate : function(component, event, helper) {
        helper.getTemplate(component, event);
        
    },
    
      // function for clear the Record Selection 
    clear :function(component,event,heplper){
        var selectedPillId = event.getSource().get("v.name");
        var AllPillsList = component.get("v.contactListSelected"); 
        
        for(var i = 0; i < AllPillsList.length; i++){
            if(AllPillsList[i].Id == selectedPillId){
                AllPillsList.splice(i, 1);
                component.set("v.contactListSelected", AllPillsList);
            }  
        }
        //component.set("v.SearchKeyWord",null);
        //component.set("v.listOfSearchRecords", null );      
    },
      sendEmailAction : function(component, event, helper) {

        helper.sendEmails(component, event);
        
    },
    
})