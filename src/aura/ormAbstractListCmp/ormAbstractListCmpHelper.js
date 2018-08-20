({
	next : function(component, event){
	        var sObjectList = component.get("v.items");
	        var end = component.get("v.endPage");
	        var start = component.get("v.startPage");
	        var pageSize = component.get("v.pageSize");
	        var Paginationlist = [];
	        var counter = 0;
	        for(var i=end+1; i<end+pageSize+1; i++){
	            if(sObjectList.length > i){
	                Paginationlist.push(sObjectList[i]);
	            }
	            counter ++ ;
	        }
	        start = start + counter;
	        end = end + counter;
	        var valueOfEnd = end +1;
	        if( valueOfEnd == sObjectList.length){
	           component.set("v.hideNext", true);
	        }
	        component.set("v.startPage",start);
	        component.set("v.endPage",end);
	        component.set('v.PaginationList', Paginationlist);
	    },
	 
	    previous : function(component, event){
	        var sObjectList = component.get("v.items");
	        var end = component.get("v.endPage");
	        var start = component.get("v.startPage");
	        var pageSize = component.get("v.pageSize");
	        var Paginationlist = [];
	        var counter = 0;
	        for(var i= start-pageSize; i < start ; i++){
	            if(i > -1){
	                Paginationlist.push(sObjectList[i]);
	                counter ++;
	            }else{
	                start++;
	            }
	        }
	        start = start - counter;
	        end = end - counter;
	        var lastValueOfEnd = end - counter;
	        if( lastValueOfEnd < sObjectList.length){
	           component.set("v.hideNext", false);
	        }
	        component.set("v.startPage",start);
	        component.set("v.endPage",end);
	        component.set('v.PaginationList', Paginationlist);
	    },
	    
	    paginationFilter : function(component, event) {
	    //alert(JSON.stringify(component.get("v.filterPagination")))
       // start pagination
            var pageSize = component.get("v.pageSize");
            // get size of all the records and then hold into an attribute "totalRecords"
            component.set("v.totalRecords", component.get("v.items").length);
            // set star as 0
            component.set("v.startPage",0);
            var totalRecords = component.get("v.items").length;
		    //var div = Math.trunc(totalRecords / pageSize);
            if(totalRecords === pageSize){
              component.set("v.hideNext", true);
              component.set("v.endPage", pageSize - 1);
            }else{
              component.set("v.hideNext", false);
              component.set("v.endPage", pageSize - 1);
            }
            var PaginationList = [];
            for(var i=0; i< pageSize; i++){
                if(component.get("v.items").length> i)
                    PaginationList.push(component.get("v.items")[i]);    
            }
            component.set('v.PaginationList', PaginationList);
        //end pagination
	}
})