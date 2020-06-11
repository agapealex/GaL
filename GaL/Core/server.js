
var http = require("http");
var settings = require("../settings");
var httpMsgs = require("./httpMsgs");
var apiGame = require("../API/apiGame");
var loadFs = require("../Modules/loadFs");
var jwt = require("jsonwebtoken");
var apiTest = require("../API/apiTest");
var apiLeaderBoard = require("../API/apiLeaderBoard");
var apiProfile = require("../API/apiProfile");


http.createServer(async function (req, resp) {
    //console.log(req.headers.cookie);
    var cook = req.headers.cookie;
    var cs = cook.split('=');
    var token;
    if (!cs[2]) {
        token = cs[1];
    } else {
        token = cs[2];
    }
    
    //const token = null;//req.headers.cookie.;
    //resp.setHeader('Set-Cookie', `auth-token = null`);
    if (!token || token==0) {

        switch (req.method) {
            case "GET":
                if (req.url.indexOf('/login') != -1) {
                    httpMsgs.showLogin(req, resp);
                }
                else if (req.url.indexOf('/create-account') != -1) {
                    httpMsgs.showCreateAccount(req, resp);
                }
                else if (req.url.indexOf('/account-created') != -1) {
                    httpMsgs.AccountCreated(req, resp);
                }
                else if (req.url.indexOf('.css') != -1
                    || req.url.indexOf('.js') != -1
                    || req.url.indexOf('.png') != -1
                    || req.url.indexOf('.svg') != -1
                    || req.url.indexOf('.jpg') != -1
                    || req.url.indexOf('.html') != -1
                ) {
                    loadFs.loadFsFunc(req, resp);
                }
                else {
                    httpMsgs.show403(req, resp);
                }
                break;
            case "POST":
                if (req.url.indexOf('/account-created') != -1) {
                    httpMsgs.AccountCreated(req, resp);
                } else if (req.url.indexOf('/Home') != -1) {
                    await httpMsgs.showHomeFistLog(req, resp);
                }
                break;
            default:
                httpMsgs.show500(req, resp);
                break;
        }

    }
    else {
        try {
            const verified = jwt.verify(token, "secretkey");
            req.user = verified;

            if (req.url.indexOf('details-game/api/games') != -1) {
                if (req.url === "/details-game/api/games") {
                    apiGame.apiGameFunc(req, resp);
                }
                else {
                    apiGame.apiGameDetails(req, resp);
                }

            }
            else if (req.url.indexOf('api/games') != -1) {
                apiGame.apiGameFunc(req, resp);
            }
            else {
                switch (req.method) {
                    case "GET":
                        if (req.url === "/") {
                            httpMsgs.showHome(req, resp);
                        }
                        else if (req.url.indexOf('/login') != -1) {
                            //resp.cookie.expires=false;//.setHeader('Set-Cookie', `auth-token = expires: ${Date.now()}`);
                            resp.setHeader('Set-Cookie', `auth-token = 0`);
                            httpMsgs.showLogin(req, resp);
                        }
                        else if (req.url.indexOf('/Home') != -1) {
                            httpMsgs.showHome(req, resp);
                        }
                        else if (req.url.indexOf('/contact') != -1) {
                            httpMsgs.showContact(req, resp);
                        }
                        else if (req.url.indexOf('api/leader-board') != -1) {
                            apiLeaderBoard.apiLeaderBoardFunc(req, resp);
                        }
                        else if (req.url === '/leader-board') {
                            httpMsgs.showLeaderBoard(req, resp);
                        }
                        else if (req.url.indexOf('/myUserProfile') != -1) {
                            apiProfile.apiProfileFunc(req, resp);
                        }
                        else if (req.url.indexOf('/my-profile') != -1) {
                            httpMsgs.showProfile(req, resp);
                        }
                        else if (req.url.indexOf('/api/test') != -1) {
                            apiTest.apiTestFunc(req, resp);
                        }
                        else if (req.url.indexOf('/difficultyQuestions') != -1) {
                            apiTest.apiTestFunc(req, resp);
                        }
                        else if (req.url.indexOf('/test') != -1) {
                            httpMsgs.showTest(req, resp);
                        }
                        else if (req.url === '/list-games') {
                            if (req.user.admin === true) {
                                httpMsgs.showListGames(req, resp);
                            } else {
                                httpMsgs.show403(req, resp);
                            }
                        }
                        else if (req.url.indexOf('/edit-game') != -1) {
                            if (req.user.admin === true) {
                                httpMsgs.showEditGame(req, resp);
                            } else {
                                httpMsgs.show403(req, resp);
                            }        
                        }
                        else if (req.url.indexOf('/add-game') != -1) {
                            if (req.user.admin === true) {
                                httpMsgs.showAddGame(req, resp);
                            } else {
                                httpMsgs.show403(req, resp);
                            }
                        }
                        else if (req.url === '/documentation') {
                            httpMsgs.showDocumentation(req, resp);
                        }
                        else if (req.url.indexOf('/details-game') != -1) {
                            var gameIdPatt = "[0-9]+";
                            var patt = new RegExp("/details-game/" + gameIdPatt);
                            if (patt.test(req.url)) {
                                patt = new RegExp(gameIdPatt);
                                var gameId = patt.exec(req.url);
                                httpMsgs.showDetailsGame(req, resp, gameId);//, gameId
                            }
                            else {
                                httpMsgs.show404(req, resp);
                            }
                        }
                        else if (req.url.indexOf('/create-account') != -1) {
                            httpMsgs.showCreateAccount(req, resp);
                        }
                        else if (req.url.indexOf('/account-created') != -1) {
                            httpMsgs.AccountCreated(req, resp);
                        }
                        else if (req.url.indexOf('.css') != -1
                            || req.url.indexOf('.js') != -1
                            || req.url.indexOf('.png') != -1
                            || req.url.indexOf('.svg') != -1
                            || req.url.indexOf('.jpg') != -1
                            || req.url.indexOf('.html') != -1
                        ) {
                            loadFs.loadFsFunc(req, resp);
                        }
                        break;
                    case "POST":
                        if (req.url.indexOf('/account-created') != -1) {
                            httpMsgs.AccountCreated(req, resp);
                        }
                        else if (req.url.indexOf('/Home') != -1) {
                            httpMsgs.showHomeFistLog(req, resp);
                        }
                        else if (req.url.indexOf('/game-edited') != -1) {
                            if (req.user.admin === true) {
                                apiGame.apiGameFunc(req, resp);
                            } else {
                                httpMsgs.show403(req, resp);
                            }
                        }
                        else if (req.url.indexOf('/game-added') != -1) {
                            if (req.user.admin === true) {
                                apiGame.apiGameFunc(req, resp);
                            } else {
                                httpMsgs.show403(req, resp);
                            }
                        }
                        break;
                    case "PUT":
                        break;
                    case "DELETE":
                        break;
                    default:
                        httpMsgs.show405(req, resp);
                        break;
                }
            }
        }
        catch (err) {
            httpMsgs.show405(req, resp);
        }
    }
 


}).listen(settings.webPort, function () {
    console.log("Started listening at : " + settings.webPort);
})