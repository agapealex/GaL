var httpMsgs = require("../Core/httpMsgs");
var profileModule = require("../Modules/profileModule");

exports.apiProfileFunc = function (req, resp) {

    switch (req.method) {
        case "GET":
            if (req.url.indexOf('api/myUserProfile') != -1) {
                profileModule.getProfile(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    }
}
