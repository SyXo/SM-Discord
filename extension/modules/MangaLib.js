var webSocket = new WebSocket('ws://localhost:8080/');

function SendMessage(event) {
    var message
    if(document.title.includes('Чтение манги')) {
        var manga = document.title.split("манги ")[1].trim();
        var info = "Глава " + manga.split("глава ")[1].trim();
        message = `{"action":1, "type": "MangaLib", "name": "${manga.split(" глава")[0].trim()}","options": "` + info + `"}`;
    }

    webSocket.send(message);
}

function onBeforeUnload(event) {
    var clearMessage = '{"action":0, "type": "MangaLib"}';
    webSocket.send(clearMessage);
}

/*
 * Register event handlers
 */
window.onload = SendMessage;
window.onclick = SendMessage;
window.onbeforeunload = onBeforeUnload;