window.onload = function() {
	//  times to click degree button
	var clickDegree = 0;
	//  times to click to select block numbers
	var clickblNum = 0;
	//  initial block number
	var blockNum = 16;
	//  initial degree
	degree = "difficult";
	//  initial function with initial parameters
	init(blockNum, degree);

    //  restart game
    $("#restart").click(function() {
		init(blockNum,degree);
	});

	//  click to change degree
	$("#degree").click(function() {
		clickDegree++;
		degree = clickDegree%2? "easy":"difficult";
		init(blockNum, degree);
		$(this).html(clickDegree%2?"要挑战自己！":"太难了，简单点？");
	});

    //  click to change blocknumber
    $("#blNum").click(function() {
        clickblNum++;
    	blockNum = clickblNum%2?9:16;
    	init(blockNum, degree);
    	$(this).html(clickblNum%2?"16块才厉害！":"9块才过瘾！");
    });

}

//  initial function at anytime
function init(blockNum, degree) {
	arr = $(blockNum == 9?"#bl-9":"#bl-16").children().children();
	arr = blockNumber(blockNum, degree, arr);
	arr = changeimages(arr,blockNum);
    move(arr, blockNum);
}

//  select blocks number
function blockNumber(blockNum, degree, arr) {
	var kkk = [];
	if (blockNum == 16) {
		kkk = easyOrDifficult16(degree,arr);
		document.getElementById("bl-" + blockNum).className = "visiable";
		document.getElementById("bl-9").className = "hidden";
	}
	else if (blockNum == 9) {
		kkk = easyOrDifficult9(degree,arr);
		document.getElementById("bl-" + blockNum).className = "visiable";
		document.getElementById("bl-16").className = "hidden";
	}
	return kkk;
}

//  select easy or not
function easyOrDifficult16(degree, arr) {
	for (var i = 0; i < arr.length; i++)
		arr[i].className = "puzzle-blocks " + degree;
	return arr;
}

function easyOrDifficult9(str, arr) {
	var degree = str;
	for (var i = 0; i < arr.length; i++)
		arr[i].className = "mini-puzzle-blocks " + degree + "9";
	return arr;
}

//  simulation to changes images and ensure can win
function changeimages(arr,blockNum) {
	//  initial blank
	arr[arr.length - 1].className = "";
    var times = Math.ceil(Math.random() * 2000);
    times = times == 0? 1: times;
    var block = 0;
    var max = blockNum == 9?3:4;
	var a = blockNum == 9?[1,3]:[1,4];
    while (times--) {
		for (var i = 0; i < arr.length; i++)
			if (arr[i].className == "")
				block = i;  //  check where is the blank one
		var ran = Math.random() > 0.5?1:0;
		for (var i = 0; i < arr.length; i++) {
            if (Math.abs(block - i) == a[ran]) {
            	if (max == 3 && ((block == 3 && i == 2)|| (block == 6 && i == 5))) {
            		continue;
            	}
            	if (max == 4 && ((block == 4 && i == 3)||(block == 8 && i == 7)||(block == 12 && i == 11))) {
            		continue;
            	}
            	var temp = arr[block].id;
            	temp = arr[i].id;
            	arr[i].id = arr[block].id;
            	arr[block].id = temp;
            	temp = arr[i].className;
            	arr[i].className = arr[block].className;
            	arr[block].className = temp;
            }
		}
    }
    return arr;
}

//  click to move
function move(arr, blockNum) {
	var max = blockNum == 9?3:4;
	var block = 0;
	if (isSuccess(blockNum)) {
		alert("Woo! You win! Congratulations!");
		return 0;
	}
	for (var i = 0; i < arr.length; i++)
		if (arr[i].className == "")
			block = i;
	for (var i = 0; i < arr.length; i++) {
		arr[i].onclick = function(i) {  //  感觉闭包要比jQuery要好一些
            if (Math.abs(block - i) == 1 || Math.abs(block - i) == max) {
            	//  抱歉，因为没有想到好的解决办法，所以暂时先这样写。如果想到了好的方法会马上更新的
            	if (max == 3 && ((block == 3 && i == 2)|| (block == 6 && i == 5))) {
            		return 0 ;
            	}
            	if (max == 4 && ((block == 4 && i == 3)||(block == 8 && i == 7)||(block == 12 && i == 11))) {
            		return 0;
            	}
            	return function() {
            		var temp = arr[block].id;
            		temp = event.target.id;
            		event.target.id = arr[block].id;
            		arr[block].id = temp;
            		temp = event.target.className;
            		event.target.className = arr[block].className;
            		arr[block].className = temp;
            		move(arr,blockNum);
            	}
            }
		}(i);
	}
}

//  decide whether it is successful
function isSuccess(blockNum) {
	var arr = blockNum == 9?$("#bl-9").children().children():$("#bl-16").children().children();
	for (var i = 0; i < arr.length; i++)
		if ($(arr[i]).attr("id") != $(arr[i]).attr("title"))
			return false;
	return true;
}