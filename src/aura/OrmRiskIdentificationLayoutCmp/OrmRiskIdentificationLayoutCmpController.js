({
	 openModalNewRisk : function(component, event, helper){
        var evt = $A.get("e.c:OrmOpenNewRiskCmpEvt");
		evt.fire();
    },
     doInit : function(component, event, helper) {
       helper.fetchPicklist(component, event);
	},
})