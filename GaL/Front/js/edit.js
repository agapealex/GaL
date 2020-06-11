var pattern = new RegExp('[0-9]+');
var gameId = pattern.exec(window.location.pathname);


var editName = document.getElementById("edit-name");
var editAbout = document.getElementById("edit-about");
var editRules = document.getElementById("edit-rules");
var editHistory = document.getElementById("edit-history");
var editId = document.getElementById("edit-id");

var currentGame;

const params = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

fetch(`api/games/${gameId}`, params)
    .then(response => {
        if (response == null) {
            console.log("NULLLLLLLLL")
        }
        else {
            var obj = response.json();
            return obj;
        }
    })
    .then(data => {

        //currentGame = data.recordset[0];
        editName.setAttribute("value", data.recordset[0].Name);
        editId.setAttribute("value", data.recordset[0].Id);
        editAbout.innerHTML = data.recordset[0].About;
        editRules.innerHTML = data.recordset[0].Rules;
        editHistory.innerHTML = data.recordset[0].History;
    })
    .catch(err => {
        console.log(err)
    })