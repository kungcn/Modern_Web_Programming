window.onload = function() {
    
    //  record the times clicking Start/Stop button
	var flag = 0;
	//  record to clear interval
	var clear = 0;
	//  get buttons
	var button = document.getElementsByTagName("button");

    //  set the beginning
	button[0].onclick = function() {
		//  clicking odd times means start games, clicking even times means game is end
		if (!(flag%2)) {
			document.getElementById("showTips").innerHTML = "Playing";
			buttonchanges();
			document.getElementById("time").value = "30";
			document.getElementById("score").value = "0";
			clear = setInterval(timer,1000);
		}
		else if (flag%2 && flag != 0) {
			over();
		}
        flag++;
	}

	//  timer to show time
	function timer() {
		if (document.getElementById("time").value == "0") {
			flag = 0;
			over();
		} else {
			document.getElementById("time").value--;
		}
	}

    //  button changes its class
	function buttonchanges() {
		var x = Math.ceil(Math.random() * 59);
        
        //  var x = Math.ceil(Math.random() * 60); -> 0 <= x <= 60  61;
        //  1 <= i <= 60  60;
        //  x = x == 0? 1 : x;
        //  not bad but not the best
        
        //  two for cycle must be divided
        //  first is to give class to each button, the second is to decide whether click is correct or not
        for (var i = 0; i < button.length; i++) {
        	i == x+1? button[i].className = "only" : button[i].className = "error";
        }
		
		for (var i = 1; i < button.length; i++) {
            if (i == x + 1) {
            	button[i].onclick = function() {
            		document.getElementById("score").value++;
            		event.target.className = "";
            		buttonchanges();
            	}
            } else {
            	button[i].onclick = function() {
            		event.target.className = "";
                    document.getElementById("score").value--;
            	}
            }
		}
	}
    
    //  set over state
    function over() {
    	document.getElementById("showTips").innerHTML = "Game Over";
			for (var i = 1; i < button.length; i++)
				button[i].className = "";
		alert("Game Over.\nYour score is : " + document.getElementById("score").value);
		clearInterval(clear);
    }

}
