({
/**
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description dissociate contacts selected to workshop
 * @history 
 * 2018-08-13 : Salimata NGOM - Implementation
 */
  deleteContactWorkshop : function(component,row) {
  alert("delete "+row.Id+''+component.get('v.workshop').Id);
	//get contact workshop
	var contactworkshop=component.get('c.getContactWorkshop');
	contactworkshop.setParams({
	"item":component.get('v.workshop').Id,
	"contact":row.Id
	});
	contactworkshop.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {
            //getdeleteWorkShopContact
            var contactworkshopItem=response.getReturnValue();
            var action=component.get('c.deleteContactWorkshop');
            action.setParams({
	"item":contactworkshopItem});
	action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {
            //fire toast event
            var toastEvent = $A.get('e.force:showToast');
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "The record has been delete successfully.",
                            'type' : 'success',
                            'mode' : 'dismissible'
                        });

		                toastEvent.fire();
           //refresh workshop list
           
            
            } else {
                alert("failed deleted");
            }
        });
        $A.enqueueAction(action);
            
            } else {
                alert("failed getContactworkshop");
            }
        });
        $A.enqueueAction(contactworkshop);
        	component.set("v.isOpenModalContactWorkshop", false);
      
	},
	
})