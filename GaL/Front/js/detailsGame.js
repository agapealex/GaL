var detailsAbout = document.getElementById('details-about');
var detailsRules = document.getElementById('details-rules');
var detailsHistory = document.getElementById('details-history');
var rightSide = document.getElementById('right-side');
var rigthSideParagraph = document.getElementById('right-side-prgh');
var selectGame = document.getElementById('games');

var pattern = new RegExp('[0-9]+');
var gameId = pattern.exec(window.location.pathname);

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
        
        //currentGame = JSON.stringify(data); 
        //console.log(currentGame);
        currentGame = data;
    })
    .catch(err => {
        console.log(err)
    })

const params2 = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}
fetch('api/games', params2)
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
            //<option value="mario">Mario</option>
            // console.log(data.recordset[k].Name);
           //data.recordset[k]
            var option = document.createElement('option');
            option.value = data.recordset[k].Id;
            option.innerHTML = data.recordset[k].Name;
            //option.setAttribute("href", "details-game/" + data.recordset[k].Id);
            selectGame.appendChild(option);
        }
    })
    .catch(err => {
        console.log(err)
    })


detailsRules.addEventListener('click', function () {
    detailsAbout.classList.remove('actual');
    detailsHistory.classList.remove('actual');
    detailsRules.classList.add('actual');

    var rules = currentGame.Rules;
    rigthSideParagraph.innerHTML = rules;
})

detailsAbout.addEventListener('click', function () {
    detailsAbout.classList.add('actual');
    detailsHistory.classList.remove('actual');
    detailsRules.classList.remove('actual');

    var about = currentGame.About;
    rigthSideParagraph.innerHTML = about;
})

detailsHistory.addEventListener('click', function () {
    detailsAbout.classList.remove('actual');
    detailsHistory.classList.add('actual');
    detailsRules.classList.remove('actual');

    var history = currentGame.History;
    rigthSideParagraph.innerHTML = history;
})