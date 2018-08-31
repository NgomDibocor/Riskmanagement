({
	doInit : function(component, event, helper) {
		if ($A.util.isEmpty(component.get('v.items'))) {
			helper.refreshList(component, event);
		}
		
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
	//idassessment=a051H00000ZoUVQQA3
			evt.setParams({
			   "parentId" :'a051H00000ZoUVQQA3',
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
    }


})