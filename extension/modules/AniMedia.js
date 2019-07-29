var webSocket = new WebSocket('ws://localhost:8080/');
var paused = false;
var anime = document.title.split('Серия ').length >= 2 ? document.title.split('Серия ') : document.title.split('ОВА ');
var typeofseries = document.title.split('Серия ').length >= 2 ? "Серия" : "ОВА";

function onPlay() {
    paused = false;
    if (document.title.includes('Аниме')) {
        setTimeout(() => {
            for (let index = 0; index < document.getElementsByTagName('pjsdiv').length; index++) {
                const element = document.getElementsByTagName('pjsdiv')[index].innerHTML;
                console.log(element)
                if (index == 42) var time = element;
                if (index == 46) var totTime = element.replace('/ ', '');
            }

            var series = typeofseries + " " + anime[1].trim().split(" ")[0].toString() + " из " + document.getElementsByClassName('swidget__new-series__item__title')[0].innerHTML.toString().split(" из ")[1].trim();
            var message = `{"action":1, "type": "AniMedia", "name": "${anime[0].replace("Аниме ", "").trim()}","options": "` + series + `", "time": "${time}", "totTime": "${totTime}"}`;
            
            webSocket.send(message);
        }, 2000);
    }
}

function onPause(event) {
    var message
    if (document.title.includes('Аниме')) {
        var series = "Серия " + anime[1].trim().split(" ")[0].toString() + " из " + document.getElementsByClassName('swidget__new-series__item__title')[0].innerHTML.toString().split(" из ")[1].trim();
        message = `{"action":2, "type": "AniMedia", "name": "${anime[0].replace("Аниме ", "").trim()}","options": "` + series + `", "time": null, "totTime": null}`;
    }
    paused = true;
    webSocket.send(message);
}

function onBeforeUnload(event) {
    var clearMessage = '{"action":0, "type": "AniMedia"}';
    webSocket.send(clearMessage);
}

function changeDuration(event) {
    if (document.title.includes('Аниме') && !paused) {
        setTimeout(() => {
            for (let index = 0; index < document.getElementsByTagName('pjsdiv').length; index++) {
                const element = document.getElementsByTagName('pjsdiv')[index].innerHTML;
                if (index == 42) var time = element;
                if (index == 46) var totTime = element.replace('/ ', '');
            }

            var series = "Серия " + anime[1].trim().split(" ")[0].toString() + " из " + document.getElementsByClassName('swidget__new-series__item__title')[0].innerHTML.toString().split(" из ")[1].trim();
            var message = `{"action":1, "type": "AniMedia", "name": "${anime[0].replace("Аниме ", "").trim()}","options": "` + series + `", "time": "${time}", "totTime": "${totTime}"}`;
            
            webSocket.send(message);
        }, 2000);
    }
}

document.getElementById("player").addEventListener("play", onPlay)
document.getElementById("player").addEventListener("pause", onPause)
document.getElementsByTagName("pjsdiv")[17].addEventListener('click', changeDuration)

window.onload = (event) => {
    document.getElementById('playlist-d').click()
}
window.onbeforeunload = onBeforeUnload;