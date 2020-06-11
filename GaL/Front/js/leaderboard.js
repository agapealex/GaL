
var leaderBoardRows = document.getElementById("leaderBoardRows");

const params = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}
fetch("api/leader-board", params)
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
        for (let k = 0; k < data.recordset.length; k++) {
            // console.log(data.recordset[k].Name);
             addRow(data.recordset[k],k+1);
        }
    })
    .catch(err => {
        console.log(err)
    })

function addRow(recordset,NO) {
    var tr = document.createElement("tr");
    var tdNO = document.createElement("td");
    var tdFName = document.createElement("td");
    var tdLName = document.createElement("td");
    var tdLocality = document.createElement("td");
    var tdResult = document.createElement("td");

    tdNO.className += " td-cls ";
    tdNO.innerHTML += NO;
    tr.appendChild(tdNO);

    tdFName.className += " td-cls ";
    tdFName.innerHTML += recordset.FirstName;
    tr.appendChild(tdFName);

    tdLName.className += " td-cls ";
    tdLName.innerHTML += recordset.LastName;
    tr.appendChild(tdLName);

    tdLocality.className += " td-cls";
    tdLocality.innerHTML += recordset.Locality;
    tr.appendChild(tdLocality);

    tdResult.className += " td-cls ";
    tdResult.innerHTML += recordset.TestResult;
    tr.appendChild(tdResult);

    leaderBoardRows.appendChild(tr);

    //tdImg.className += " td-cls";
    //var img = document.createElement("img");
    //img.className += " default-img";
    //img.src = "images/server.png";
    //tdImg.appendChild(img);
    //tr.appendChild(tdImg);

    //var tdName = document.createElement("td");
    //tdName.className += " td-cls";
    //tdName.innerHTML += recordset.Name;
    //tr.appendChild(tdName);

    //var tdOptions = document.createElement("td");
    //tdOptions.className += " td-cls hide-mobile show-desktop";

    //var btnDetails = document.createElement("a");
    //btnDetails.href = "#";
    //btnDetails.innerHTML = "Details";
    //btnDetails.setAttribute("href", `details-game/${recordset.Id}`);
    //tdOptions.appendChild(btnDetails);

    //var btnEdit = document.createElement("a");
    //btnEdit.href = "#";
    //btnEdit.innerHTML = "Edit";
    //tdOptions.appendChild(btnEdit);

    //var btnDelete = document.createElement("a");
    //btnDelete.href = "#";
    //btnDelete.innerHTML = "Delete";
    ////btnDelete.onclick = deleteSpecificRow(recordset.Id);
    //btnDelete.setAttribute("onclick", `deleteSpecificRow(${recordset.Id})`);
    //tdOptions.appendChild(btnDelete);

    //tr.appendChild(tdOptions);

    //crudGameRows.appendChild(tr);
}