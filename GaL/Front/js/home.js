var selectGame = document.getElementById('games');
var readMoreCurrentGame = document.getElementById('read-more-currentGame');
var historyCurrentGame = document.getElementById('history-current-game'); 
var rulesCurrentGame = document.getElementById('rules-current-game'); 
var aboutCurrentGame = document.getElementById('about-current-game'); 
const getStarted = document.getElementById('getStarted');

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

function getValuesGame(gameId) {
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
            console.log(data);
            currentGame = data.recordset[0];
            console.log(currentGame);
            readMoreCurrentGame.setAttribute('href', 'details-game/' + currentGame.Id);
            readMoreCurrentGame.innerHTML = "Read more...";
            aboutCurrentGame.innerHTML = currentGame.About.substring(0, 200) + "...";
            rulesCurrentGame.innerHTML = currentGame.Rules.substring(0, 200) + "...";
            historyCurrentGame.innerHTML = currentGame.History.substring(0, 200) + "...";
        })
        .catch(err => {
            console.log(err)
        })


}

function EnableGetStarted(nivelDif) {
    getStarted.href = `/test/${nivelDif}`;
    getStarted.classList.remove('cursorOff');
}