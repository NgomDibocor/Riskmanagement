({
    doInit: function(component, event, helper) {
     
    
    },
    	getSelectedItem : function(component, event) {

		var index = event.target.dataset.index;
		var items = component.get("v.items");
		var selectedItem = items[index];
		
		return selectedItem;
	},
     removeItem: function(component, event, helper) {
        component.set('v.currentIndex', event.target.dataset.index);
        helper.openDeleteConfirmationModel(component);

    },
    confirmDeletion: function(component, event, helper) {
        var self = this; // safe reference
        var items = component.get("v.items");
        itemToRemove = items[component.get('v.currentIndex')];
        if (itemToRemove) {
            helper.showSpinner(component);
            var cc = component.getConcreteComponent();
            var removeAction = cc.get("c.remove");
            removeAction.setParam("item", itemToRemove);
            removeAction.setCallback(this, function(response) {
                var deleteState = response.getState();

                if (deleteState == "SUCCESS") {
                    cc.getDef().getHelper().refreshList(cc,
                        event);
                    helper.hideSpinner(component);
                    helper.closeDeleteConfirmationModel(component);
                    helper.showToast('Success', itemToRemove.Name + " supprimé avec succés ", 'success'); } else { helper.showToast('Error',
                        "Echec suppression " + itemToRemove.Name, 'error');
                }

            });
            $A.enqueueAction(removeAction);
        } else {
            helper.showToast('Warning',
                "Aucun élement selectionné pour la suppression !",
                'warning');
        }
    },
	  openDeleteConfirmationModel: function(component) {
      // for Display Modal,set the "isOpen" attribute to "true"
      component.set("v.isDeleteConfirmationOpen", true);
   },
 
   closeDeleteConfirmationModel: function(component) {
      // for Hide/Close Modal,set the "isOpen" attribute to "Fasle"  
      component.set("v.isDeleteConfirmationOpen", false);
   },
 /**
 * getFieldLabels
 *
 * @author Salimata NGOM
 * @version 1.0
 * @description get custom label field defined
 * @history 
 * 2018-07-27 : Salimata NGOM - Implementation
 */
   
      getFieldLabels: function(component, event){
        var getFieldsLabelAction=component.get('c.getObjectFields');
        getFieldsLabelAction.setCallback(this, function(response){
            if(response.getState()=='SUCCESS'){
                component.set('v.fields',response.getReturnValue()); 
                var fieldLabels=component.get('v.fields');
            alert(''+JSON.stringify(fieldLabels));
            } else {
                    alert('Une erreur est survenues lors de la récuperation des champs'); }
        });
        $A.enqueueAction(getFieldsLabelAction);
    }
})