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
})