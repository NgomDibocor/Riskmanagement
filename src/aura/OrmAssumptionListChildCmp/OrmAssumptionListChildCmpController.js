({
	inlineEditName : function(component, event, helper) {
		// show the name edit field
		component.set("v.nameEditMode", true);
		// after the 100 millisecond set focus to input field
		setTimeout(function() {
			component.find("inputId").focus();
		}, 100);
		var evt = $A.get("e.c:OrmSendValuesFieldDescriptionEvt");
		evt.setParams({
			"nomField" : $A.get("$Label.c.orm_name_assumption"),
			"descriptionField" : $A
			.get("$Label.c.orm_description_title_assumption")
		});
		evt.fire();
	},
	onNameChange : function(component, event, helper) {
		// if edit field value changed and field not equal to blank,
		// then show save and cancel button by set attribute to true
		if (event.getSource().get("v.value").trim() != '') {
			component.set("v.showSaveCancelBtn", true);
		}
	},
	closeNameBox : function(component, event, helper) {

		// on focus out, close the input section by setting the 'nameEditMode'
		// att. as false
		component.set("v.nameEditMode", false);

	},
	/**
	 * 
	 * @author Salimata NGOM
	 * @version 1.0
	 * @description method for delete selected records assumption
	 * @history 2018-09-05 : Salimata NGOM - Implementation
	 */
	deleteSelected : function(component, event, helper) {

		// create var for store record id's for selected checkboxes
		var delId = [];
		// get all checkboxes
		var getAllId = component.find("boxAssumption");
		// If the local ID is unique[in single record case], find() returns the
		// component. not array
		if (!Array.isArray(getAllId)) {
			if (getAllId.get("v.value") == true) {
				delId.push(getAllId.get("v.text"));
			}
		} else {
			// play a for loop and check every checkbox values
			// if value is checked(true) then add those Id (store in Text
			// attribute on checkbox) in delId var.
			for (var i = 0; i < getAllId.length; i++) {
				if (getAllId[i].get("v.value") == true) {
					delId.push(getAllId[i].get("v.text"));
				}
			}
		}

		// call the helper function and pass all selected record id's.
		helper.deleteSelectedHelper(component, event, delId);

	},

})