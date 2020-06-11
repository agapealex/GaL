var httpMsgs = require("../Core/httpMsgs");
var leaderBoardModule = require("../Modules/leaderBoardModule");

//apiLeaderBoardFunc(req, resp);


exports.apiLeaderBoardFunc = function (req, resp) {

    switch (req.method) {
        case "GET":
            if (req.url.indexOf('api/leader-board') != -1) {

                leaderBoardModule.getListLeaders(req, resp);
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

