({
	
	showformfileUploadNew:function(component,event,helper){
	//fire event OrmOpenAttachmentNewEvent
	var evt = $A.get("e.c:OrmNewAssumptionClickedEvt");
			evt.setParams({
			   "parentId" : component.get("v.assessmentData"),
			   "isOpenfileUploadNewCmp":true
			});
			evt.fire();
	//var eltselected= helper.getSelectedItem(component,event);
	//component.set('v.parentId',eltselected.Id);
}

})