var gameModule = require("../Modules/gameModule");
var httpMsgs = require("../Core/httpMsgs");

exports.apiGameFunc = function (req, resp) {

    switch (req.method) {
        case "GET":
            //req.url.indexOf('/Home') != -1
            if (req.url === "/api/games") {

                gameModule.getListGames(req, resp);
            }
            else if (req.url === "/details-game/api/games") {
                gameModule.getListGames(req, resp);
            }
            else {
                var gameIdPatt = "[0-9]+";
                var patt = new RegExp("api/games/" + gameIdPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(gameIdPatt);
                    var gameId = patt.exec(req.url);
                    gameModule.getGame(req, resp, gameId);
                }
                else {
                    httpMsgs.show404(req, resp);
                }
            }
            break;

        case "POST":
            if (req.url === "/api/games") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7)//10mb
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function () {
                    gameModule.addGame(req, resp, reqBody);
                });
            } else if (req.url.indexOf('/game-edited') != -1) {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7)//10mb
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function () {
                    gameModule.updateGame(req, resp, reqBody);
                });
            }
            else if (req.url.indexOf('/game-added') != -1) {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7)//10mb
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function () {
                    gameModule.addGame(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "PUT":
            if (req.url === "/api/games") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7)//10mb
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function () {
                    gameModule.updateGame(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "DELETE":
            if (req.url === "/api/games") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7)//10mb
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function () {
                    gameModule.deleteGame(req, resp, reqBody);
                });
            }
            else if (req.url.indexOf('/api/games') != -1) {
                var gameIdPatt = "[0-9]+";
                var patt = new RegExp("/games/" + gameIdPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(gameIdPatt);
                    var gameId = patt.exec(req.url);
                    gameModule.deleteGameThroughId(req, resp, gameId);
                }
                else {
                    httpMsgs.show404(req, resp);
                }
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    }
}


exports.apiGameDetails = function (req, resp) {

    switch (req.method) {
        case "GET":
            //req.url.indexOf('/Home') != -1
            if (req.url.indexOf("details-game/api/games/" != -1)) {

                var gameIdPatt = "[0-9]+";
                var patt = new RegExp("details-game/api/games/" + gameIdPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(gameIdPatt);
                    var gameId = patt.exec(req.url);
                    gameModule.getGameForFetch(req, resp, gameId);
                }
                else {
                    httpMsgs.show404(req, resp);
                }
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    }
}