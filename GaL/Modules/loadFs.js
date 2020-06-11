var httpMsgs = require("../Core/httpMsgs");
var fs = require("fs");
var HTMLParser = require('node-html-parser');
var gameModule = require("./gameModule");
const util = require('util');
//const readFile = util.promisify(fs.readFile);


exports.loadFsFunc = function (req, resp) {

    if (req.url.indexOf('.css') != -1) { 

        contentType = "text/css";
        httpMsgs.SendResp(req, resp, contentType);
    }
    else if (req.url.indexOf('.png') != -1) {

        contentType = "image/png";
        httpMsgs.SendResp(req, resp, contentType);
    }
    else if (req.url.indexOf('.jpg') != -1) {

        contentType = "image/jpg";
        httpMsgs.SendResp(req, resp, contentType);
    }
    else if (req.url.indexOf('.svg') != -1) { 

        contentType = "image/svg+xml";
        httpMsgs.SendResp(req, resp, contentType);
    }

    else if (req.url.indexOf('.js') != -1) {

        contentType = "application/javascript";
        httpMsgs.SendResp(req, resp, contentType);
    }
}

exports.loadFsHtml = function (req, resp, fileHtml) {

    fs.readFile(`./Front/${fileHtml}`, null, function (err, data) {

        if (err) {
            console.log(err);
            resp.writeHead(404);
            resp.write("File not found!");
        }
        else {
            resp.write(data);
        }
        resp.end();
    });
}

exports.loadFsHtmlDetailsGame =  async  function (req, resp, fileHtml, gameId) {

    var game = await gameModule.getGame2(gameId);

     fs.readFile(`./Front/${fileHtml}`, null, function (err, data) {

        if (err) {
            console.log(err);
            resp.writeHead(404);
            resp.write("File not found!");
            resp.end();
        }
        else {
            var html = HTMLParser.parse(data.toString());

            html.querySelector(".right-side").insertAdjacentHTML("afterbegin", `<h2>${game.Name}</h2><br><p id="right-side-prgh">${game.About}</p>`);
            var buf = Buffer.from(html.toString());
            resp.write(buf);
            resp.end();

        }

        
    });
}