({
	refreshList : function(component, event) {
		component.set('v.parentId',"a051H00000ZoUVQQA3");
		var action = component.get("c.findAllContentDocumentByParentId");
		action.setParams({
		'parentId':component.get('v.parentId')
		});
		alert('parentId=='+component.get('v.parentId'));
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state == "SUCCESS") {
					component.set("v.items", response.getReturnValue());
//				$A.enqueueAction(component.get('c.applyDatatable'));
				alert(JSON.stringify(response.getReturnValue()));
			} else {
				alert("Une erreur est survenue lors de la récupération de la liste des pieces jointes");
			}

		});
		$A.enqueueAction(action);
	},
	
	getSelectedItem : function(component, event) {

		var index = event.target.dataset.index;
		var items = component.get("v.items");
		var selectedItem = items[index];
		
		return selectedItem;
	},
})