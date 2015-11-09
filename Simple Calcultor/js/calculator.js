//  ban Octal 其实我不想禁止的，但是。。为了不让别人说是bug就禁止了吧5555555...
"use strict"

window.onload = function() {
    
    alert("您好！本计算器功能简单，使用方便。对一些常见的错误操作会有温馨提示。若有bug，欢迎发邮件到kcnnow@gmail.com一齐讨论。谢谢使用！")

	//  get all buttons
	var arr = document.getElementsByTagName("button");
	for (var i = 0; i < arr.length; i++)
		//  when clicking the following buttons, innerHTML of input changes
        //  CE,<- and =, although they are in the array, when clicking them, the following codes will be covered
		arr[i].onclick = function() {
			var temp = document.getElementById("input");
			if (temp.value == "")
                temp.value = this.innerHTML + "";
            else
			    temp.value = temp.value + this.innerHTML + "";
		}

	//  when clicking CE, clear all input
	document.getElementById("clearAll").onclick = function() {
		document.getElementById("input").value = "";
    }

    //  when clicking <-, clear the last input
    document.getElementById("clearOne").onclick = function() {
    	document.getElementById("input").value = document.getElementById("input").value.substring(0,document.getElementById("input").value.length - 1);
    }

    //  when clicking =, check and calculate the formula later
    document.getElementById("equality").onclick = function() {

        var left_append = [], right_append = [];
        var opeartor = ["+", "-", "*", "/"];

        for (var i = 0; i < document.getElementById("input").value.length; i++) {
        	//  eval() can not do operation when any operator is omitted
        	if (document.getElementById("input").value.charAt(i) == "(" && !isNaN(document.getElementById("input").value.charAt(i - 1))) {
        		alert("Syntax Error, can not omit opeartors before \"\(\" !");
        		return 0;
        	}

            //  prevent repeated operators, both * and /
        	if (document.getElementById("input").value.charAt(i) == "*") {
        		for (var j = 0; j < opeartor.length; j++)
        			if (document.getElementById("input").value.charAt(i - 1) == opeartor[j]) {
        				alert("Syntax Error, can not input operators repeatedly!");
        				return 0;
        			}
        	}
        	if (document.getElementById("input").value.charAt(i) == "/") {
        		for (var j = 0; j < opeartor.length; j++)
        			if (document.getElementById("input").value.charAt(i - 1) == opeartor[j]) {
        				alert("Syntax Error, can not input operators repeatedly!");
        				return 0;
        			}
        	}

            //  no more than one .
            if (document.getElementById("input").value.charAt(i) == "." && document.getElementById("input").value.charAt(i - 1) == ".") {
                alert("Syntax Error, more than one \".\"!");
                return 0;
            }
        	else if (document.getElementById("input").value.charAt(i) == "(")
        		left_append.push(i);
        	else if (document.getElementById("input").value.charAt(i) == ")")
        		right_append.push(i);
        }

        //  numbers of () is equal or not
        if (left_append.length != right_append.length) {
        	alert("Syntax Error, lose \"(\" or \")\"!");
        } else {
            try  {
                var temp = eval(document.getElementById("input").value).toFixed(8);
            }
            catch(exception) {
                alert("Unknown Syntax Error, check again please!");
                return 0;
            }
            if (temp == "Infinity" || isNaN(temp)) {
                //  math error includes divide by 0
                alert("Math Error, check again please!");
            } else {
                document.getElementById("input").value = temp;
            }
        }
    }
}
