var db = require("../Core/db");
var httpMsgs = require("../Core/httpMsgs");
var util = require("util");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.addUser =async function (req, resp, data) {
    try {
        if (!data) { throw new Error("Input not valid"); }

        var isAdmin = false;
        if (data) {
            var sql = "INSERT INTO Users (UserName, FirstName, LastName, Locality, Email, Password, Role) Values ";
            sql += util.format("('%s','%s','%s','%s','%s','%s','%s')",
                data.uname, data.fname, data.lname, data.locality, data.email, data.psw, isAdmin);
            await db.executeSql(sql, function (data, err) {

                if (err) {
                    httpMsgs.show500(req, resp, err);

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

//db.executeSql("SELECT * FROM Games WHERE Id=" + gameId, function (data, err) {

//    if (err) {
//        httpMsgs.show500(req, resp, err);

//    } else {
//        httpMsgs.sendJson(req, resp, data);
//    }
//});

exports.getUser =async  function (req, resp, email) {
    try {
        if (!email) { throw new Error("Email not valid"); }

        var value;
        if (email) {
            await db.executeSql(`SELECT * FROM Users WHERE Email like '${email}'` , function (data, err) {

                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                //console.log(data);
                //return JSON.stringify(data);
                 value = data.recordset[0];
            });
        } else {
            throw new Error("Input not valid");
        }

        return value;
    }
    catch (ex) {
        console.log(ex);
        httpMsgs.show500(req, resp, ex);
    }
};

exports.checkPassword = async function (req, resp, account) {
    try {
        if (!account) { throw new Error("Input not valid"); }
        else {
            var sql = `select * from Users where  Email like '${account.email}' ;`;

            var accountOk;

            await db.executeSql(sql, async function (data, err) {

                if (err) {
                    httpMsgs.show500(req, resp, err);

                }
                else if (data.recordset.length !== 0) {
                    var user = data.recordset[0];
                    const validPsw = await bcrypt.compare(account.psw, user.Password);
                    if (!validPsw) {
                        accountOk = false;
                    } else {
                        accountOk = true;
                        //create token
                        const token = jwt.sign({ id: user.Id, admin: user.Role }/*payload*/, "secretkey");
                        console.log(token);
                        //console.log(token);
                        try {
                            //resp.setHeader('auth-token', token);
                            resp.setHeader('Set-Cookie', `auth-token = ${token}`);//; expires=`+ new Date(new Date().getTime() + 60000).toUTCString()
                        }
                        catch (err) {
                            console.log(err);
                        }

                    }
                }
            
            });
            return accountOk;
        } 
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.checkEmailExists = async function (req, resp, email) {
    try {
        if (!email) { throw new Error("Input not valid"); }

        if (email) {
            var sql = `Select * from  Users u where u.Email like '${email}';` ;

            var emailExists;
            await db.executeSql(sql, function (data, err) {

                if (err) {
                    httpMsgs.show500(req, resp, err);

                }
                else if (data.recordset.length !== 0) {
                    //httpMsgs.show400(req, resp);
                    emailExists =  true;
                }
                else {
                    //httpMsgs.send200(req, resp);
                    emailExists = false;
                }
            });
            return emailExists;
        } else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};