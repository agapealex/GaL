var db = require("../Core/db");
var httpMsgs = require("../Core/httpMsgs");

exports.getProfile = function (req, resp) {
    db.executeSql(`SELECT UserName, FirstName,LastName, Locality, TestResult FROM Users Where Id=` + req.user.id, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);

        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
}