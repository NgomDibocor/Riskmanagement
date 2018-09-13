({
	doInit : function(component, event, helper) {
	
		helper.refreshList(component, event);
		
		
	},
		/**
	 * @author: Salimata NGOM
	 * @date: Creation: 31/08/2018
	 * @description: method for fire event and open form upload file attachment
	 *               
	 */
	showformfileUploadNew:function(component,event,helper){
	//fire event OrmOpenAttachmentNewEvent
	var evt = $A.get("e.c:OrmOpenAttachmentNewEvent");
			evt.setParams({
			   "parentId" :component.get('v.parentId'),
			   "isOpenfileUploadNewCmp":true
			});
			evt.fire();
},
	/**
	 * @author: Salimata NGOM
	 * @date: Creation: 31/08/2018
	 * @description: method for open attachment
	 *               
	 */
openSingleFile : function (component,event, helper){  
  var eltselected= helper.getSelectedItem(component,event);
          
        var fireEvent = $A.get("e.lightning:openFiles");
        fireEvent.fire({
            recordIds: [eltselected.Id]
        });      
    },
    	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description search filter
	 * @history 2018-09-07: Salimata NGOM - Implementation
	 */
	filter : function (component, event, helper){
		var ListAttachment= component.get('v.itemsTemp');
		var data = ListAttachment;
		var key = component.get('v.key');
		var regex;    	

		if ($A.util.isEmpty(key)) {    	
			helper.refreshList(component, event);    		      
		} else {
			key = "^" + key;
			try {
				regex = new RegExp(key, "i");

				// filter checks each row, constructs new array where
				// function returns true
				data=ListAttachment.filter(row => regex.test(row.Name));
			} catch (e) {
				alert(e)
			}

			component.set("v.items", data);
		}        	
	},
	
	sendDescriptionSearchToFD : function(component, event, helper) {
        var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
        evt.setParams({
            "nomField": "Attachment",
            "descriptionField": "Description"
        });
        evt.fire();
    },


})