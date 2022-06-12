"use strict";
const urlJokes = 'https://icanhazdadjoke.com/';
const urlChuck = 'https://api.chucknorris.io/jokes/random';
const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona,Spain&units=metric&appid=b7e41953afbba834a5f415cf165fbf22';
let weather = document.querySelector('#icon');
let temperature = document.querySelector('#temperature');
let joke = document.querySelector('#joke');
const nextJokeButton = document.getElementById("nextJokeBtn");
let reportJokes = []; //Para asignar tipo object inside array. 
let day = new Date();
let today = day.toISOString();
//let today = day.getDate() + " / " + (day.getMonth()+1) + " / " +  day.getFullYear()
// --Llamada a la API del tiempo--//
fetch(urlWeather)
    .then(function (res) { return res.json(); })
    .then(function (data) {
    return (weather.innerHTML = data.weather.map((object) => {
        object.description;
        switch (object.description) {
            case "scattered clouds":
                return weather.innerHTML = "☁";
                break;
            case "clear sky":
                return weather.innerHTML = "☀️";
                break;
            case "few clouds":
                return weather.innerHTML = "&#x26C5";
                break;
            case "broken clouds":
                return weather.innerHTML = "&#xU2601";
                break;
            case "shower rain":
                return weather.innerHTML = "&#x1F4A7&#x1F4A7";
                break;
            case "rain":
                return weather.innerHTML = "&#x1F4A7";
                break;
            case "thunderstorm":
                return weather.innerHTML = "&#x26A1";
                break;
            case "snow":
                return weather.innerHTML = "❄️";
                break;
            case "mist":
                return weather.innerHTML = " &#x1f301";
                break;
            default:
                return weather.innerHTML = "&#x1F47D";
                break;
        }
        /* if (object.description === "scattered clouds") {
            return weather!.innerHTML = "&#9729";
        } */
    })) + (temperature.innerHTML = (data.main.temp).toFixed(0) + "ºC");
})["catch"](function (err) { return console.error('Solicitud fallida', err); });
//--Llamada a las API de chistes--
//API icanhazdadjoke.com
function nextJoke() {
    fetch(urlJokes, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(function (res) { return res.json(); })
        .then(function (jokeOnScreen) { return joke.innerHTML = jokeOnScreen.joke; }) // El chiste que aparecerá por pantalla
        .then(function (data2) { reportJokes.push({ joke: data2, score: 1, date: today }); }) // Añadir los datos del chiste como un objeto en el reportJokes array
        .catch(function (err) { return console.error('Solicitud fallida', err); });
}
//API chistes Chuck Norris
function chuckJoke() {
    fetch(urlChuck)
        .then(function (res) { return res.json(); })
        .then(function (jokeOnScreen) { return joke.innerHTML = jokeOnScreen.value; }) // El chiste que aparecerá por pantalla
        .then(function (data2) { reportJokes.push({ joke: data2, score: 1, date: today }); }) // Añadir los datos del chiste como un objeto en el reportJokes array
        .catch(function (err) { return console.error('Solicitud fallida', err); });
}
/**
 *
 *  Cada vez que se clica el botón de "Següent acudit" alterna las llamadas a las diferentes APIs de chistes
 *
 */
onload = alternApi;
function alternApi() {
    let onclick = changeJoke();
    nextJokeButton.addEventListener("click", onclick, false);
}
function changeJoke() {
    var count = 1;
    var next = function () {
        switch (count) {
            case 1:
                nextJoke();
                break;
            case 2:
                chuckJoke();
                break;
        }
        count = (count == 1) ? count + 1 : 1;
    };
    return next;
}
/**
 * Añade la puntuación a la propiedad "score" del chiste que aparece en pantalla
 *
 * @ param election - la elección del botón
 * @ param jokeOnScreen - el chiste que aparece en este momento por pantalla
 *
 */
function addScore(election, jokeOnScreen) {
    switch (election) {
        case "score1":
            let findJoke = reportJokes.find(joke => joke.joke === jokeOnScreen);
            findJoke.score = 1;
            break;
        case "score2":
            let findJoke1 = reportJokes.find(joke => joke.joke === jokeOnScreen);
            findJoke1.score = 2;
            break;
        case "score3":
            let findJoke2 = reportJokes.find(joke => joke.joke === jokeOnScreen);
            findJoke2.score = 3;
            break;
    }
    console.clear(); //Para no sobrecargar la consola y que únicamente se imprima la última actualización del array.
    console.log(reportJokes);
}
/**
 * Tras pulsar uno de los 3 botones de score se llama a la función evaluateJoke(), que llamará a la función addScore() con los argumentos necesarios.
 */
function evaluateJoke1() {
    addScore("score1", joke.innerHTML);
}
function evaluateJoke2() {
    addScore('score2', joke.innerHTML);
}
function evaluateJoke3() {
    addScore('score3', joke.innerHTML);
}
var score1 = document.getElementById("score1").addEventListener("click", evaluateJoke1, false);
var score2 = document.getElementById("score2").addEventListener("click", evaluateJoke2, false);
var score3 = document.getElementById("score3").addEventListener("click", evaluateJoke3, false);
