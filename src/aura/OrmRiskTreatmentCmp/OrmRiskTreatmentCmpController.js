({
	doInit : function(component, event, helper) {
		var measureId = event.getParam('MeasureId');
		component.set("v.idMeasure" ,measureId);
        var idAsssessmentRisk = component.get("v.idMeasure");
        alert(idAsssessmentRisk);
			}
})