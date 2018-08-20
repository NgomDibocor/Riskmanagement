({
doInit : function(component, event, helper)
    {
       helper.refreshList(component, event);
    },
showAssessmentRisk : function(component, event, helper) 
    {
	     var measureId = event.target.id;
         var idAssessment = document.getElementById( measureId ).getElementsByTagName( 'span' ).item(0).id;
	},
})