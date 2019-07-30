var webSocket = new WebSocket('ws://localhost:8080/');
//GLOBAL VARIABLES
var anime = document.querySelectorAll('[itemprop=name]')[2].textContent;
var series = document.querySelectorAll('[itemprop=name]')[3].textContent;
//HANDLERS
var player = document.getElementById('my-player_html5_api');

player.addEventListener('play', onPlay);
player.addEventListener('pause', onPause);
window.onbeforeunload = onExit;

//Event When Play started and changed duration of video
function onPlay(event) {
    //Timeout for duration loading:*
    setTimeout(() => {
        //CHANGEABLE VARIABLES
        var time = document.getElementsByClassName('vjs-current-time-display')[0].textContent;
        var duration = document.getElementsByClassName('vjs-duration-display')[0].textContent;

        var message = `{
            "action": 1,
            "type": "JutSu",
            "name": "${anime}",
            "options": "${series}",
            "time": "${time}",
            "totTime": "${duration}"
        }`

        webSocket.send(message);
    }, 1200);
}

// Event on Paused video
function onPause(event) {
    var message = `{
        "action": 2,
        "type": "JutSu",
        "name": "${anime}",
        "options": "${series}",
        "time": null,
        "totTime": null
    }`

    webSocket.send(message);
}

//Event on exit page
function onExit(event) {
    var clearMessage = '{"action":0, "type": "JutSu"}';
    webSocket.send(clearMessage);
}