window.onload = function() {

	//  flag to decide if function is over
	var flag = false;

    //  hovering E before hovering S
    document.getElementById("end").onmouseover = function() {
    	if (!flag) {
            isWin("cheat");
    	}
    }
    
    //  hovering S
	document.getElementById("start").onmouseover = function() {

		//  start game
        flag = true;
        //  reset the maze
        document.getElementById("tips").className = "hidden";

        //  hoveing E, decide win or cheat
		var temp = 0;
		var blank = document.getElementsByName("blank");
		for (var i = 0; i < blank.length; i++) {
			blank[i].onmouseover = function() {
				temp++;
			}
		}
		document.getElementById("end").onmouseover = function() {
			if (flag) {
				if (temp%2 == 1)
					isWin("cheat");
				else
					isWin("win");
				flag = false;
		    }
		}
        
        //  lose
		var arr = document.getElementsByName("wall");
		for (var i = 0; i < arr.length; i++) {

            //  hovering wall, the color of wall changes
			arr[i].onmouseover = function() {
				if (flag) {
					var claName = event.target.className;
					event.target.className = event.target.className + " bgc";
					isWin("lose");

					//  leaving wall, color of wall turn into the original one
					event.target.onmouseout = function() {
						event.target.className = claName;
					}
					flag = false;
			    }
			}
		}

	}

	//  decide what to show in tips
	function isWin(str) {
		if (str == "win")
			document.getElementById("tips").innerHTML = "You Win";
		if (str == "lose")
			document.getElementById("tips").innerHTML = "You Lose";
		if (str == "cheat")
            document.getElementById("tips").innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
        document.getElementById("tips").className = "visibility";
	}

}