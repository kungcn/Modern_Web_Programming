$(document).ready(function() {

	$("#sub").click(clickToPostCheck);

});

//  click to execute
function clickToPostCheck(event) {
	event.preventDefault();
    var isCor = isCorrect(getInputs());

    //  is legal
    if (isCor == 1)
    	$.post("/", {"userName":$("#userName").val(), "studentID":$("#studentID").val(), "phoneNumber":$("#phoneNumber").val(), "Email":$("#Email").val()}, function(data,status) {connectBackEnd(data,status);});

}

//  get inputs from html
function getInputs() {
	var arr = [];

    for (var i = 0; i < $("input").length; i++) {
    	if ($($("input")[i]).val() == "") {
    		alert("all must be finished. Check again please.");
    		break;
    	}
    	else {
    	    arr[i] = $($("input")[i]).val();
    	}
	}
	return arr;
}

//  decide whether all inputs are correct
function isCorrect(arr) {

	//  RegExpress
	var corEmail = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
    var corStuNum = /^[1-9]\d{7}$/;
    var corName = /^[a-zA-Z][0-9a-zA-Z_]{5,17}$/;
    var corPhone =  /^[1-9]\d{10}$/;

    //  data is legal?
    if (!arr[0].match(corName)) {
    	alert("User name is wrong, please check it again.");
    	return 0;
    }

    if (!arr[1].match(corStuNum)) {
    	alert("Student ID is wrong, please check it again.");
    	return 0;
    }
    
    if (!arr[2].match(corPhone)) {
    	alert("Mobile phone number is wrong, please check it again.");
    	return 0;
    }

    if (!arr[3].match(corEmail)) {
    	alert("Email address is wrong, please check it again.");
    	return 0;
    } else {  //  is legal
    	return 1;
    }

}

//  check whether is existed
function connectBackEnd(data,status) {

	var user = JSON.parse(data);

    //  is Registered?
	switch(user.status) {
		case "email":
		    alert("The Email has already been registered.");
		    break;
		case "name":
		    alert("The name has already been registered.");
		    break;
		case "phoneNumber" :
		    alert("The phone number has already been registered.");
		    break;
		case "stdID":
		    alert("The stdID has already been registered.");
		    break;

		//  unregister will load other pages
		default:
		    window.location.href = "/?userName=" + user.userName;
	}
}