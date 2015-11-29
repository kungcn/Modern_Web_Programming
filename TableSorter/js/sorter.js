$(document).ready(function() {

	$("th").click(clickodd);

});

//  initial function and changes photos by recording titles, 
//  so you can see how many times you have clicked continuously as well
function init(event) {
	$(event.target).siblings().removeClass("thclick");

    //  use siblings only don't work,omitting event.target itself
	$(event.target).parent().children().children("img").remove();
	event.target.title++;
	$(event.target).siblings().each(function() {
		this.title = 0;
	});

	//  changes photos
    if (event.target.title%2 != 0)
    	$(event.target).append("<img src='images/ascend.png' alt='up'>");
    else if (!(event.target.title%2))
    	$(event.target).append("<img src='images/descend.png' alt='down'>");
}

//  click odd times
function clickodd() {
    init(event);
	$(event.target).addClass("thclick");
    
    var order = getOrderToSort(event);
    var index = $(event.target).index();

    order.sort(function(a,b){
    	return a > b ? 1 : -1;
    });
    setNewArray(order, index);

	$(event.target).click(clicktheven);
}

//  click even times and reverse the order
function clicktheven(event) {
	var order = getOrderToSort(event);
	var index = $(event.target).index();

    order.reverse();
    setNewArray(order, index);
}

//  get th.index and get all td[index] from the table
function getOrderToSort(event) {
    var row = $(event.target).parent().parent().next().children("tr").length;
    var arr = $(event.target).parent().parent().next().children("tr").children("td");
    var td = [];

    for (var i = 0, j = 0; i < arr.length, j < arr.length / row; i++)
    	if (arr.length / row * i + $(event.target).index() < arr.length) {
    		td[i] = $(arr[arr.length / row * i + $(event.target).index()]).html();
    		j++;
    	}
    return td;
}

//  set sorted array
function setNewArray(arr, index) {
	var tr = $(event.target).parent().parent().next().children("tr");
	
	for (var i = 0; i < arr.length; i++)
	    for (var j = 0; j < tr.length; j++)
	    	if (arr[i] == $(tr[j]).children("td")[index].innerHTML) {
	    		var temp = $(tr[i]).html();
	    		$(tr[i]).html($(tr[j]).html());
	    		$(tr[j]).html(temp);
	    	}
}