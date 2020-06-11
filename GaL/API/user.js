//var gameModule = require("../Modules/gameModule");
var httpMsgs = require("../Core/httpMsgs");

exports.userFunc = function (req, resp) {

    switch (req.method) {

        case "POST":
            if (req.url.indexOf('/account-created') != -1) {
                //var reqBody = '';
                //req.on("data", function (data) {
                //    reqBody += data;
                //    if (reqBody.length > 1e7)//10mb
                //    {
                //        httpMsgs.show413(req, resp);
                //    }
                //});

                //req.on("end", function () {
                //    gameModule.addGame(req, resp, reqBody);
                //});
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