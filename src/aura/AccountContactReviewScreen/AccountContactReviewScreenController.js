({
	backToContact : function(component, event, helper) {
$A.createComponent(
"singhforce:CreateNewContact",
{
"accRec":component.get("v.accRec"),
"conRec":component.get("v.conRec")
},
function(newComp) {
var content = component.find("body");
content.set("v.body", newComp);
}
);
},
submit : function(component, event, helper) {
// submit logic
}
})