var db = require("../Core/db");
var httpMsgs = require("../Core/httpMsgs");

exports.getListLeaders = async function (req, resp) {
    try {
        await db.executeSql("SELECT TOP 5 * FROM Users ORDER BY TestResult  desc ", function (data, err) {
            if (err) {
                httpMsgs.show500(req, resp, err);

            } else {
                httpMsgs.sendJson(req, resp, data);
            }

        });
    }
    catch (err) {
        console.log(err);
    }

};