({
    getAllMeasuresProgressionByMeasure: function(component, event) {

        var action = component.get("c.getAllMeasuresProgressionByMeasure");
        action.setParam('idMeasure', component.get("v.idMeasure"));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var pageSize = component.get("v.pageSizeInlineEdit");
                component.set('v.ListData', response.getReturnValue());
                console.log(JSON.stringify(response.getReturnValue()));
                                               //add icon status
                let sObjs =response.getReturnValue();
             let columns=component.get('v.columns');
                for(let row of  sObjs){
               // console.log('row='+JSON.stringify(row));
                	for(let col of columns){
                		if(col.type=='text' && row[col.fieldName]=='open' ){
                			row[col.fieldName+'_chk'] ='action:approval';
                				row[col.class] ='openclass';
                		}else if (col.type=='text' && row[col.fieldName]=='close' ){
                		row[col.fieldName+'_chk'] ='action:close';
                		}else if(col.type=='text' && row[col.fieldName]=='draft' ){
                		row[col.fieldName+'_chk'] ='action:new_note';
                		}
                		}
                		}
                //end add icon status
                // get size of all the records and then hold into an attribute "totalRecords"
                component.set("v.totalRecords", component.get("v.ListData").length);
                //Set the current Page as 0
                component.set("v.currentPage", 0);
                // set star as 0
                component.set("v.startPage", 0);
                var totalRecords = component.get("v.ListData").length;
                if (totalRecords === pageSize) {
                    component.set("v.hideNext", true);
                    component.set("v.endPage", pageSize - 1);
                } else {
                    component.set("v.hideNext", false);
                    component.set("v.endPage", pageSize - 1);
                }
                var PaginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    if (component.get("v.ListData").length > i) {
                        PaginationList.push(response.getReturnValue()[i]);
                    }
                }
                component.set('v.PaginationList', PaginationList);

            } else {
                alert($A.get('$Label.c.orm_not_found'));
            }
        });
        $A.enqueueAction(action);
      
    },
    checkIfMapContentIsEmpty: function(component, event, myMap) {
        console.log("checkIfMapContentIsEmpty start")
        var lengthMap = Object.keys(myMap).length;
        for (var i = 0; i < lengthMap; i++) {
            var page = 'page' + i;
            if (myMap[page].length != 0) {
                component.set("v.isEmptyMap", false);
                console.log("isEmptyMap", component.get("v.isEmptyMap"));
            }
        }
    },
})