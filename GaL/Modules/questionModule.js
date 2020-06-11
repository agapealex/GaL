var db = require("../Core/db");
var httpMsgs = require("../Core/httpMsgs");

exports.getListQuestions = function (req, resp, nivelDif) {
    db.executeSql(`SELECT * FROM Test Where Difficulty=` + nivelDif, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);

        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.setResultTest = async function (req, resp, result) {

    await db.executeSql(`UPDATE Users SET TestResult = ${result} WHERE Id = ${req.user.id}`, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }

    });
}