//2

var sqlDb = require("mssql");
var settings = require("../settings");

exports.executeSql = async function (sql, callback) {

    var conn = await new sqlDb.ConnectionPool(settings.DbConfig);

    await conn.connect()
        .then(async function () {
            var req = await new sqlDb.Request(conn);

            await req.query(sql)
                .then(async function (recordset) {
                    await callback(recordset);
                })
                .catch(async function (err) {
                    console.log(err);
                    await callback(null, err);
                })
        })
        .catch(async function (err) {
            console.log(err);
            await callback(null, err);
        })
}