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
	document.getElementById("restart").onclick = function() {
		init(blockNum,degree);
	}

	//  click to change degree
	document.getElementById("degree").onclick = function() {
		clickDegree++;
		if (clickDegree%2) {
			degree = "easy";
			init(blockNum, degree);
			document.getElementById("degree").innerHTML = "要挑战自己！";
		}
		else if (!(clickDegree%2)) {
			degree = "difficult";
			init(blockNum, degree);
			document.getElementById("degree").innerHTML = "太难了，简单点？";
		}
	}

    //  click to change blocknumber
    document.getElementById("blNum").onclick = function() {
        clickblNum++;
        if (clickblNum%2) {
        	blockNum = 9;
        	init(blockNum, degree);
        	document.getElementById("blNum").innerHTML = "16块才厉害！";
        }
        else if (!(clickblNum%2)) {
        	blockNum = 16;
        	init(blockNum, degree);
        	document.getElementById("blNum").innerHTML = "9块才过瘾！";
        }
    }

}

//  initial function at anytime
function init(blockNum, degree) {
	if (blockNum == 9)
		arr = document.getElementsByName("mini-puzzle");
	else if (blockNum == 16)
		arr = document.getElementsByName("puzzle");
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
    var times = 2000;
    var block = 0;
    var max = 4;
	var a = [1,4];
	if (blockNum == 9) {
		a = [1, 3];
		max = 3;
	}
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
	var max = 4;
	if (blockNum == 9)
		max = 3;
	var block = 0;
	if (isSuccess(blockNum)) {
		alert("Woo! You win! Congratulations!");
		return 0;
	}
	for (var i = 0; i < arr.length; i++)
		if (arr[i].className == "")
			block = i;
	for (var i = 0; i < arr.length; i++) {
		arr[i].onclick = function(i) {
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
	var arr = [];
    if (blockNum == 9)
        arr = document.getElementsByName("mini-puzzle");
    else if (blockNum == 16)
    	arr = document.getElementsByName("puzzle");
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].id != arr[i].title)
			return false;
	}
	return true;
}
