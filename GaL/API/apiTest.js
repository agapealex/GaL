var questionModule = require("../Modules/questionModule");
var httpMsgs = require("../Core/httpMsgs");

exports.apiTestFunc = function (req, resp) {

    switch (req.method) {
        case "GET":
            if (req.url.indexOf('/difficultyQuestions') != -1) {
                var nivDiffPatt = "[1-3]";
                var patt = new RegExp("difficultyQuestions/" + nivDiffPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(nivDiffPatt);
                    var nivelDif = patt.exec(req.url);
                    questionModule.getListQuestions(req, resp, nivelDif);
                }
                else {
                    httpMsgs.show404(req, resp);
                }


            }
            else if (req.url.indexOf('/api/test') != -1) {
                var resultTestPatt = "[0-9]+";
                var patt = new RegExp("api/test/" + resultTestPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(resultTestPatt);
                    var result = patt.exec(req.url);
                    questionModule.setResultTest(req, resp, result);
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

