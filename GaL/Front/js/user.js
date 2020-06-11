var firstName = document.getElementById("my-profile-fname");
var lastName = document.getElementById("my-profile-lname");
var Locality = document.getElementById("my-profile-locality");
var Result = document.getElementById("my-profile-result");



const params = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

fetch('api/myUserProfile', params)
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

        firstName.innerHTML = data.recordset[0].FirstName;
        lastName.innerHTML = data.recordset[0].LastName;
        Locality.innerHTML = data.recordset[0].Locality;
        Result.innerHTML = data.recordset[0].TestResult;
    })
    .catch(err => {
        console.log(err)
    })