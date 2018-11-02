({
    doInit: function(component, event, helper) { 
    	 helper.refreshList(component, event );
    },
    
    getIdMeasure : function(component, event, helper){
      var idMeasure = event.target.id;
      var evt = $A.get("e.c:OrmActiveRiskTraitementCmpEvt");
          evt.setParams({
            "idMeasure": idMeasure
          });
      evt.fire();
    }
})