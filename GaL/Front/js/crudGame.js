
const params = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

fetch('api/games', params)
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
            addRowWithGame(data.recordset[k]);
        }
    })
    .catch(err => {
        console.log(err)
    })


function addRowWithGame(recordset){
    var tr = document.createElement("tr");
    var tdId = document.createElement("td");
    var tdImg = document.createElement("td");

    tr.id = "specificRow" + recordset.Id;

    tdId.className += " td-cls hide-mobile show-desktop";
    tdId.innerHTML = recordset.Id;
    tr.appendChild(tdId);

    tdImg.className +=" td-cls";
    var img = document.createElement("img");
    img.className += " default-img";
    img.src = "images/server.png";
    tdImg.appendChild(img);
    tr.appendChild(tdImg);

    var tdName = document.createElement("td");
    tdName.className +=" td-cls";
    tdName.innerHTML += recordset.Name;
    tr.appendChild(tdName);

    var tdOptions = document.createElement("td");
    tdOptions.className += " td-cls hide-mobile show-desktop";

    var btnDetails = document.createElement("a");
    btnDetails.href ="#";
    btnDetails.innerHTML = "Details";
    btnDetails.setAttribute("href", `details-game/${recordset.Id}`);
    tdOptions.appendChild(btnDetails);

    var btnEdit = document.createElement("a");
    btnEdit.href ="#";
    btnEdit.innerHTML = "Edit";
    btnEdit.setAttribute("href", `edit-game/${recordset.Id}`);
    tdOptions.appendChild(btnEdit);

    var btnDelete = document.createElement("a");
    btnDelete.href ="#";
    btnDelete.innerHTML = "Delete";
    //btnDelete.onclick = deleteSpecificRow(recordset.Id);
    btnDelete.setAttribute("onclick", `deleteSpecificRow(${recordset.Id})`);
    tdOptions.appendChild(btnDelete);

    tr.appendChild(tdOptions);

    crudGameRows.appendChild(tr);
}

function deleteSpecificRow(id){
    var idForDelete = "specificRow" + id;
    var elementForDelete = document.getElementById(idForDelete);
    elementForDelete.parentNode.removeChild(elementForDelete);

    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`api/games/${id}`, params)
    .catch(err => {
        console.log(err)
    })
}
