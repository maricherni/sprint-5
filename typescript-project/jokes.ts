const url = 'https://icanhazdadjoke.com/';
let joke = document.querySelector('#joke');
const nextJokeButton = document.getElementById("nextJokeBtn");
let reportJokes: {joke: string, score: number, date: string} [] = []; //Para asignar tipo object inside array. 
let day = new Date();
let today = day.toISOString();
//let today = day.getDate() + " / " + (day.getMonth()+1) + " / " +  day.getFullYear()

//--Llamada a la API--
function nextJoke() {
  fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(function (res) { return res.json(); })
        .then(function (jokeOnScreen) { return joke!.innerHTML = jokeOnScreen.joke; }) // El chiste que aparecerá por pantalla
        .then(function(data2) {reportJokes.push({joke: data2, score: 1, date: today})}) // Añadir los datos del chiste como un objeto en el reportJokes array
        .catch(function (err) {return console.error('Solicitud fallida', err); });
}

nextJokeButton!.addEventListener("click", nextJoke, false);

/**
 * Añade la puntuación a la propiedad "score" del chiste que aparece en pantalla
 * 
 * @ param election - la elección del botón 
 * @ param jokeOnScreen - el chiste que aparece en este momento por pantalla 
 * 
 */

function addScore(election: string, jokeOnScreen: string) {
    switch (election){
        case "score1":
            let findJoke = reportJokes.find(joke=> joke.joke === jokeOnScreen)
            findJoke!.score = 1;
            break;
        case "score2":
            let findJoke1 = reportJokes.find(joke=> joke.joke === jokeOnScreen)
            findJoke1!.score = 2;
            break;
        case "score3":
            let findJoke2 = reportJokes.find(joke=> joke.joke === jokeOnScreen)
            findJoke2!.score = 3;
            break;
    }
    console.clear(); //Para no sobrecargar la consola y que únicamente se imprima la última actualización del array.
    console.log(reportJokes);
}

/**
 * Tras pulsar uno de los 3 botones de score se llama a la función evaluateJoke(), que llamará a la función addScore() con los argumentos necesarios.
 */

function evaluateJoke1() {
        addScore("score1", joke!.innerHTML);
}
function evaluateJoke2() {
    addScore('score2', joke!.innerHTML);
}
function evaluateJoke3() {
    addScore('score3', joke!.innerHTML);
} 

var score1 = document.getElementById("score1")!.addEventListener("click", evaluateJoke1, false);
var score2 = document.getElementById("score2")!.addEventListener("click", evaluateJoke2, false);
var score3 = document.getElementById("score3")!.addEventListener("click", evaluateJoke3, false);
