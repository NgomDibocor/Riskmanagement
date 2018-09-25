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
})