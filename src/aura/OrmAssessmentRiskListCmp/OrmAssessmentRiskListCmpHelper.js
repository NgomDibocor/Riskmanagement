({
	refreshList : function(component, event) {
		var action = component.get("c.getRisks");
		action
				.setCallback(
						this,
						function(response) {
							var state = response.getState();
							if (state == "SUCCESS") {
								component.set("v.assessmentRisks", response
										.getReturnValue());
							} else {
								helper
										.showToast(
												'Error',
												"Impossible de recuperer la liste des categories risques dans categorie risque",
												'error');
							}

						});
		$A.enqueueAction(action);

	}
})