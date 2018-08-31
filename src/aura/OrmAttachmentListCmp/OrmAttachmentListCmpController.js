({
	
	showformfileUploadNew:function(component,event,helper){
	//fire event OrmOpenAttachmentNewEvent
	var evt = $A.get("e.c:OrmOpenAttachmentNewEvent");
	//idassessment=a051H00000ZoUVQQA3
			evt.setParams({
			   "parentId" :'a051H00000ZoUVQQA3',
			   "isOpenfileUploadNewCmp":true
			});
			evt.fire();
	//var eltselected= helper.getSelectedItem(component,event);
	//component.set('v.parentId',eltselected.Id);
}

})