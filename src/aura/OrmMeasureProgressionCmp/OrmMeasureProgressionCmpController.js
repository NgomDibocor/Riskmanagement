({
/**
 *
 * @author David diop
 * @version 1.0
 * @description method doInit
 * @history 
 * 2018-08-31 : David diop - Implementation
 */
    measureProgression: function(component, event, helper) {
       // helper.fetchPicklist(component, event, event.getParam('MeasureId'));
        alert(event.getParam('MeasureId'));
        component.set("v.idMeasure", event.getParam('MeasureId'));
		helper.getAllMeasuresByAssessmentRisk(component, event);
    },
})