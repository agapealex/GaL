var settings = require("../settings");
var fs = require("fs");
var loadFs = require("../Modules/loadFs");
var userModule = require("../Modules/userModule");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");


exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(500, "Internal Error occurred", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
    }
    else {
        resp.writeHead(500, "Internal Error occurred", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "ERROR occurred: " + err }));
    }
    resp.end();
};

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
};

function show400(req, resp, msg) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(400, "Email already exists", { "Content-Type": "text/html" });
        resp.write(`<html><head><title>400</title></head><body>400:${msg}</body></html>`);
    }
    else {
        resp.writeHead(400, "Email already exists", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Email already exists" }));
    }
    resp.end();
};

exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    }
    else {
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported" }));
    }
    resp.end();
};

exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found</body></html>");
    }
    else {
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource not found" }));
    }
    resp.end();
};
exports.show403 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(403, "Access denied", { "Content-Type": "text/html" });
        resp.write("<html><head><title>403</title></head><body>403: Access denied</body></html>");
    }
    else {
        resp.writeHead(403, "Access denied", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Access denied" }));
    }
    resp.end();
};

 function show403AccesDenied(req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(403, "Access denied", { "Content-Type": "text/html" });
        resp.write("<html><head><title>403</title></head><body>403: Access denied</body></html>");
    }
    else {
        resp.writeHead(403, "Access denied", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Access denied" }));
    }
    resp.end();
};

exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request Entity too large", { "Content-Type": "text/html" });
        resp.write("<html><head><title>413</title></head><body>413: Request Entity too large</body></html>");
    }
    else {
        resp.writeHead(413, "Request Entity too large", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Request Entity too large" }));
    }
    resp.end();
};


exports.send200 = function (req, resp) {
  
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
};
exports.showHome = async function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });
    if (req.user.admin === true) {
        await fs.readFile('./Front/admin-index.html', null, async function (err, data) {

            if (err) {
                console.log(err);
                resp.writeHead(404);
                resp.write("File not found!");
            }
            else {
                await resp.write(data);
            }
            resp.end();
        });
    }
    else {
        await fs.readFile('./Front/user/index.html', null, async function (err, data) {

            if (err) {
                console.log(err);
                resp.writeHead(404);
                resp.write("File not found!");
            }
            else {
                await resp.write(data);
            }
            resp.end();
        });
    }


}
////////////////////////////////////////////////////////////////////
exports.showHomeFistLog = async function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {


        var reqBody = '';
        await req.on("data", function (data) {
            reqBody += data;
            if (reqBody.length > 1e7)//10mb
            {
                httpMsgs.show413(req, resp);
            }
        });
        var emailExists;

        await req.on("end", async function () {
            var vect = reqBody.split(/=|&/);
            var json = {
                email: `${vect[1]}`,
                psw: `${vect[3]}`,
            };

           //console.log(json.email);
           // console.log(json.psw);
            emailExists = await userModule.checkEmailExists(req, resp, json.email);
            if (emailExists === true) {

                json.psw = vect[3];
                var accountOk = await userModule.checkPassword(req, resp, json);
                resp.writeHead(200, { "Content-Type": "text/html" });

                if (accountOk === true) {

                    var user = await userModule.getUser(req, resp, json.email);
                    if (user.Role === true) {
                        await fs.readFile('./Front/admin-index.html', null, async function (err, data) {

                            if (err) {
                                console.log(err);
                                resp.writeHead(404);
                                resp.write("File not found!");
                            }
                            else {
                                await resp.write(data);
                            }
                            resp.end();
                        });
                    }
                    else {
                        await fs.readFile('./Front/user/index.html', null, async function (err, data) {

                            if (err) {
                                console.log(err);
                                resp.writeHead(404);
                                resp.write("File not found!");
                            }
                            else {
                                await resp.write(data);
                            }
                            resp.end();
                        });
                    }
                }
                else {
                    show400(req, resp, "Password is not correct");
                }
            } else {
                try {
                    show400(req, resp, "Email doesn't exist");
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
    else {
        resp.writeHead(200,  { "Content-Type": "application/json" });
        resp.write(JSON.stringify([
            { url: "/games", operation: "GET", description: "To List all Games" },
            { url: "/games/gameId", operation: "GET", description: "To List all Games" }
        ]));
        resp.end();
    }
};

exports.showListGames = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });
    if (req.user.admin === true) {
        var fileHtml = "list-games.html";
    }
    else {
        show403AccesDenied(req, resp);
    }
    loadFs.loadFsHtml(req, resp, fileHtml);
};

exports.showDetailsGame = function (req, resp, gameId) {

    resp.writeHead(200, { "Content-Type": "text/html" });
    if (req.user.admin === false) {
        var fileHtml = "user/details-game.html";
    }
    else {
        var fileHtml = "details-game.html";
    }    
    loadFs.loadFsHtmlDetailsGame(req, resp, fileHtml, gameId);
};

exports.showDocumentation = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });

    var fileHtml = "index.html";

    loadFs.loadFsHtml(req, resp, fileHtml);
};

exports.showEditedGame = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });

    var fileHtml = "game-edited.html";

    loadFs.loadFsHtml(req, resp, fileHtml);
};
exports.showAddedGame = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });

    var fileHtml = "game-added.html";

    loadFs.loadFsHtml(req, resp, fileHtml);
};

exports.showAddGame = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });

    var fileHtml = "add-game.html";

    loadFs.loadFsHtml(req, resp, fileHtml);
};


exports.showCreateAccount = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });

    var fileHtml = "create-account.html";
    loadFs.loadFsHtml(req, resp, fileHtml);
};

exports.showTest = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });

    if (req.user.admin === false) {
        var fileHtml = "user/htmlTest.html";
    }
    else {
        var fileHtml = "htmlTest.html";
    }

    loadFs.loadFsHtml(req, resp, fileHtml);
}
exports.showContact = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });
    if (req.user.admin === false) {
        var fileHtml = "user/contact.html";
    }
    else {
        var fileHtml = "contact.html";
    }

    loadFs.loadFsHtml(req, resp, fileHtml);
}
exports.showProfile = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });
    if (req.user.admin === false) {
        var fileHtml = "user/my-profile.html";
    }
    else {
        var fileHtml = "my-profile.html";
    }

    loadFs.loadFsHtml(req, resp, fileHtml);
}
exports.showEditGame = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });

    var fileHtml = "edit-game.html";
    loadFs.loadFsHtml(req, resp, fileHtml);
}

exports.showLeaderBoard = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });
    if (req.user.admin === false) {
        var fileHtml = "user/leader-board.html";
    }
    else {
        var fileHtml = "leader-board.html";
    }

    loadFs.loadFsHtml(req, resp, fileHtml);
}



exports.AccountCreated = async function (req, resp) {
        
    var reqBody = '';
    await req.on("data", function (data) {
        reqBody += data;
        if (reqBody.length > 1e7)//10mb
        {
            httpMsgs.show413(req, resp);
        }
    });

    var emailExists;

    req.on("end", async  function () {
        var vect = reqBody.split(/=|&/);
        var json = {
            uname: `${vect[1]}`,
            fname: `${vect[3]}`,
            lname: `${vect[5]}`,
            locality: `${vect[7]}`,
            email: `${vect[9]}`,
        };
        emailExists = await userModule.checkEmailExists(req, resp, json.email);
        if (emailExists === false) {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(vect[11], salt);
            json.psw = hashedPassword;

            await userModule.addUser(req, resp, json);
           
            resp.writeHead(200, { "Content-Type": "text/html" });

            var fileHtml = "account-created.html";
            loadFs.loadFsHtml(req, resp, fileHtml);
            
        } else {
            try {
                show400(req, resp, "Email already exists");
            }
            catch (e) {
                console.log(e);
            }
        }
    });
};

exports.showLogin = function (req, resp) {

    resp.writeHead(200, { "Content-Type": "text/html" });
    var fileHtml = "login.html";
    loadFs.loadFsHtml(req, resp, fileHtml);
};

exports.SendResp = function (req, resp, type) {
    try {
        var path = "./Front" + req.url.toString();
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err);
            }
            resp.writeHead(200, { 'Content-Type': type });
            resp.write(data);
            resp.end();
        });
    } catch (err) {
        console.log(err);
    }
}