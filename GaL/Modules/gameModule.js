var db = require("../Core/db");
var httpMsgs = require("../Core/httpMsgs");
var util = require("util");
//var decoded = require("form-urldecoded");
var qs = require('querystring');

exports.getListGames = function (req, resp) {
    db.executeSql("SELECT * FROM Games", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);

        } else {
            httpMsgs.sendJson(req, resp, data);
        }

    });
};
exports.getGame = function (req, resp, gameId) {
    db.executeSql("SELECT * FROM Games WHERE Id=" + gameId, function (data, err) {

        if (err) {
            httpMsgs.show500(req, resp, err);

        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};
exports.getGame2 = async  function ( gameId) {
    var value;
    await db.executeSql("SELECT * FROM Games WHERE Id=" + gameId, function (data, err) {

        if (err) {
            httpMsgs.show500( err);
            return new Error("problem");

        } else {
            value = data.recordset[0];
        }
        });
    return value;
};

exports.getGameForFetch = async function (req, resp, gameId) {
    try {
        var value;
        await db.executeSql("SELECT * FROM Games WHERE Id=" + gameId, function (data, err) {

            if (err) {
                httpMsgs.show500(err);
                return new Error("problem");

            } else {
                resp.writeHead(200, { "Content-Type": "application/json" });

                value = data.recordset[0];
                var json = JSON.stringify(value);

                resp.write(json);
                resp.end();
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.addGame = function (req, resp, reqBody) {
    try {
        if (!reqBody) { throw new Error("Input not valid"); }

        //var data = JSON.parse(reqBody);
        var data = qs.parse(reqBody);

        if (data) {

            var sql = "INSERT INTO Games (Name, About, Rules, History) Values ";
            sql += util.format("('%s','%s','%s','%s')", data.name, data.about, data.rules, data.history);
            db.executeSql(sql, function (data, err) {

                if (err) {
                    httpMsgs.show500(req, resp, err);

                } else {
                    httpMsgs.showAddedGame(req,resp);
                }
            });
        } else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};
exports.updateGame = function (req, resp, reqBody) {
    try {
        if (!reqBody) { throw new Error("Input not valid"); }

        var data = qs.parse(reqBody);
        //var data = JSON.parse(reqBody);
        if (data) {
            if (!data.id) throw new Error("Id for game not provided");

            var sql = "UPDATE Games SET ";

            if (data.name) {
                sql += " Name = '" + data.name + "',";
            }
            if (data.about) {
                sql += " About = '" + data.about + "',";
            }
            if (data.rules) {
                sql += " Rules = '" + data.rules + "',";
            }
            if (data.history) {
                sql += " History = '" + data.history + "',";
            }

            sql = sql.slice(0, -1);// sterge ultima virgula

            sql += " WHERE Id = " + data.id;

            db.executeSql(sql, function (data, err) {

                if (err) {
                    httpMsgs.show500(req, resp, err);

                } else {
                    httpMsgs.showEditedGame(req, resp);///////////////////////////////////////////////////////
                }
            });
        } else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};
exports.deleteGame = function (req, resp, reqBody) {
    try {
        if (!reqBody) { throw new Error("Input not valid"); }

        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.Id) throw new Error("Id for game not provided");

            var sql = "DELETE FROM Games ";

            sql += "WHERE Id = " + data.Id;

            db.executeSql(sql, function (data, err) {

                if (err) {
                    httpMsgs.show500(req, resp, err);

                } else {
                    httpMsgs.send200(req, resp);
                }
            });
        } else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.deleteGameThroughId = function (req, resp, gameId) {
    try {
        db.executeSql("DELETE FROM Games WHERE Id=" + gameId, function (data, err) {

            if (err) {
                httpMsgs.show500(req, resp, err);

            } 
        });
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};
