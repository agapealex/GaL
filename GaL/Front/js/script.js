const questions = [];

//{
//    intrebare: "In ce an sunt nascut ?",
//        varianta1 : "2000",
//            varianta2 : "1996",
//                varianta3 : "1980",
//                    corect : "B",
//                        imagine : "img/add.jpg"
//}

var url = window.location.pathname;
var diff = url.substr(url.length - 1);


async function getQuestion() {
    const paramsQuest = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(`../difficultyQuestions/${diff}`, paramsQuest)
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
                var quest = {
                    intrebare: data.recordset[k].Question,
                    varianta1: data.recordset[k].AnswerA,
                    varianta2: data.recordset[k].AnswerB,
                    varianta3: data.recordset[k].AnswerC,
                    corect: data.recordset[k].CorrectAnswer
                }
                questions.push(quest);
            }
        })
        .catch(err => {
            console.log(err)
        })
}



const range = document.querySelector('#range');
const ramainingTime = document.querySelector('#ramainingTime');
const startTestClass =document.querySelector('.test');
const start = document.querySelector('.start');
const btnStart = document.querySelector('#btn_start');
const btnRasp = document.querySelectorAll('.btnRasp');
const percentDiv = document.querySelector('#percent');
const score = document.querySelector('.score');
const emoticon = document.querySelector('#emoticon');
//const imageForQuestion = document.querySelector('.image');
const progress= document.getElementById('progress');
const elemProg = document.getElementsByClassName('elemProg');


let question = document.querySelector('#question');
let answer1 = document.querySelector('#answer1');
let answer2 = document.querySelector('#answer2');
let answer3 = document.querySelector('#answer3');

let tenSeconds = 100;//va fi egal cu 10 secunde initial, iar la fiecare iteratie din loop scade cu 100 milisec 
let secondsRemained = 10;

let iteratieTimeLoop = 0;
let stop = 0;
let raspuns = '-';
let raspunsuri = [];
let nrRaspunsuriCorecte=0;
let numberOfCurrentQuestion = 0;


buttonsPressed();
Initial();
async function Initial() {
    await getQuestion();
    StartTest();
    addElemProgress();
}


function StartTest(){
    btnStart.addEventListener('click',function(){
        start.classList.add('hide');
        startTestClass.classList.remove('hide');
        TimeLoop();
    })
}


function addElemProgress(){
     for(let y=0 ; y<questions.length;y++)
     {
        let div = document.createElement("div");
        div.classList.add('elemProg');
        progress.appendChild(div);
    }
}

function buttonsPressed(){
    for(let i = 0; i<btnRasp.length;i++)
    {
        btnRasp[i].addEventListener('click',function(){
            let valAtribut = btnRasp[i].getAttribute('data-num');
            raspuns += valAtribut;
             ResetValues();
        })
    }
}

function ResetValues(){
    tenSeconds = 0;
    secondsRemained = 0;
}

function TimeLoop(){
    stop = setInterval(foo,100);
}

function foo(){

    if(iteratieTimeLoop < questions.length)
    {
        if(tenSeconds === 100)
        {
            numberOfCurrentQuestion = QuestionFunc(numberOfCurrentQuestion);
        }
        if(tenSeconds%10==0)
        {
            ramainingTime.innerHTML = secondsRemained;
            secondsRemained -= 1;
        }
        tenSeconds -= 1;
        if(tenSeconds<1)
        {
            tenSeconds = 100;
            secondsRemained = 10;
            iteratieTimeLoop++;
            if(raspuns ==='-')
            {
                raspunsuri.push('*');
            }
            else{
                raspunsuri.push(raspuns[1]);//punem toate raspunsurile intr-un vector,practic adaugi ca ultim element in raspunsuri
                let last= raspunsuri.length-1; //pozitia ultimului
                if(raspunsuri[last]===questions[last].corect)
                {
                    nrRaspunsuriCorecte ++;
                    elemProg[last].classList.add('colorGreen');
                }
                else{
                    elemProg[last].classList.add('colorRed');
                }
            }
            raspuns = '-';
        }
        range.style.width = tenSeconds + "%";
    }
    else
    {
        rezultat(nrRaspunsuriCorecte);
        clearInterval(stop);
    }
}

function QuestionFunc(numberOfCurrentQuestion){

    question.innerHTML = questions[numberOfCurrentQuestion].intrebare;
    answer1.innerHTML = questions[numberOfCurrentQuestion].varianta1;
    answer2.innerHTML = questions[numberOfCurrentQuestion].varianta2;
    answer3.innerHTML = questions[numberOfCurrentQuestion].varianta3;
    //imageForQuestion.src = questions[numberOfCurrentQuestion].imagine;
    numberOfCurrentQuestion++;
    return numberOfCurrentQuestion;
}

function rezultat(nrRaspunsuriCorecte){

    // for(let i=0; i< questions.length; i++){
    //     if(questions[i].corect === raspunsuri[i])
    //     {
    //         nrRaspunsuriCorecte ++;
    //     }
    // }
    let rezz;
    if(nrRaspunsuriCorecte === 0)
    {
        rezz=0;
    }
    else{
        rezz = (nrRaspunsuriCorecte*100)/questions.length;
    }
    paginaFinala(rezz);
    nrRaspunsuriCorecte = 0;
}

function paginaFinala(percent){

    startTestClass.classList.add('hide');
    score.classList.remove('hide');
    emoticon.src = "../images/smiley.png";
    percentDiv.innerHTML = percent + '%';

    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`../api/test/${percent*diff}`, params)
        .catch(err => {
            console.log(err)
        })
}


