({
	/**
	 * @author: Salimata NGOM
	 * @date: Creation: 31/08/2018
	 * @description: method for save the file
	 *               
	 */
    doSave: function(component, event, helper) {
        if (component.find("file").get("v.files").length > 0) {
            helper.save(component, event);
            
        } else {
            alert('Please Select a Valid File');
        }
    },
 	/**
	 * @author: Salimata NGOM
	 * @date: Creation: 31/08/2018
	 * @description: method for check selected file
	 *               
	 */
    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
       
    },
   /**
	 * @author: Salimata NGOM
	 * @date: Creation: 31/08/2018
	 * @description: method for close modal form
	 *               
	 */
    closeModelfileUploadCmp: function(component,event,helper){
	// for Hide/Close Model,set the "isOpen" attribute to "Fasle"
		component.set("v.isOpenfileUploadNewCmp", false);
	}
})