var http = require("http");
var fs = require("fs");
var url = require("url");
var queryString = require("querystring");

http.createServer(function(request, response) {
    if (request.method == "GET")
	    readHtmls(request,response);

	if (request.method == "POST")
		save(request, response);

}).listen(8000);

console.log("index.html is read.\nindex.css is read.\nindex.js is read.\nAll is ready.");

//  tell css, js and html
function readHtmls(request, response) {
	var pathName = url.parse(request.url).pathname;

	//  get the suffix of files
    var suffix = pathName.match(/(\.[^.]+|)$/)[0];

    //  read html(with userName or not), css and js
    switch(suffix) {
    	case".css":
    	case".js":
	    	readCss(request, response, suffix);
    		break;

    	default:
    	    readIsExist(request,response);
    }
}

//  read css and js
function readCss(request, response, suffix) {
	var data = fs.readFileSync(".." + request.url, "utf-8");
	response.writeHead(200, {"Content-Type": {
		".css":"text/css",
		".js":"application/javascript",
	}[suffix]
    });
	response.write(data);
	response.end();
}

//  replace {{}}
function readIsExist(request,response) {
	
    var infomation = queryString.parse(url.parse(request.url).query);
    var isRegistered = 0;
    var userInfo = fs.readFileSync("../user.txt", "utf-8");
    var users = userInfo.split("#");  //  save info as JSON before

    for (var i = 0; i < users.length - 1; i++) {  // length error
    	var tmp = JSON.parse(users[i]);

    	if (tmp["userName"] == infomation.userName) {
    		var userInformation = fs.readFileSync("../information.html", 'utf-8');

    		userInformation = userInformation.replace("{{userName}}", tmp.userName).replace("{{studentID}}", tmp.studentID).replace("{{phoneNumber}}", tmp.phoneNumber).replace("{{Email}}", tmp.Email);
    		response.write(userInformation);
            isRegistered = 1;
            break;
    	}
    }
    if (isRegistered == 0) {
	    var data = fs.readFileSync("../index.html", "utf-8");
    	response.writeHead(200, {"Content-Type": "text/html"});
    	response.write(data);
    	response.end();
    }
    flag = 0;
}

//  save data from signin website
function save(request, response) {

	var fromPost = "";
    request.on("data", function(block) {fromPost += block;});
    
    request.on("end", function() {isRegister(request, response, fromPost)});
}

//  check if repeated or write in the txt
function isRegister(request, response, fromPost) {
	fromPost = queryString.parse(fromPost);
        var userInfo = fs.readFileSync("../user.txt", "utf-8");
    	var users = userInfo.split("#");  //  save info as JSON before

        var isExisted = 0;
        for (var i = 0; i < users.length - 1; i++) {
        	var tmp = JSON.parse(users[i]);

        	if (tmp.userName == fromPost["userName"]) {
        		fromPost.status = "name";
                isExisted = 1;
                break;
        	}
        	if (tmp.studentID == fromPost["studentID"]) {
        		fromPost.status = "stdID";
        		isExisted = 1;
        		break;
        	}
            if (tmp.phoneNumber == fromPost["phoneNumber"]) {
            	fromPost.status = "phoneNumber";
            	isExisted = 1;
            	break;
            }
            if (tmp.Email == fromPost["Email"]) {
            	fromPost.status = "email";
            	isExisted = 1;
            	break;
            }
            
        }

        if (isExisted == 0) {
        	var fd = fs.openSync("../user.txt", "a");
        	var writeBuffer = new Buffer(JSON.stringify(fromPost) + "#");
        	fs.write(fd, writeBuffer, 0, writeBuffer.length, null, function () {});

        }
        isExisted = 0;
        response.end(JSON.stringify(fromPost));

}
