var webSocket = new WebSocket('ws://localhost:8080/');
var link = window.location.href;
var title = document.title;

function onLoad(event) {
    setTimeout(() => {
        var message = `{"action": 1, "type":"PornHub", "name": "${getTitle()}", "options": null, "time": ${Time()}, "totTime": ${totTime()}}`
        webSocket.send(message)
    }, 2000);
}

function onPlay(event) {
    setTimeout(() => {
        var message = `{"action": 1, "type":"PornHub", "name": "${getTitle()}", "options": null, "time": ${Time()}, "totTime": ${totTime()}}`
        webSocket.send(message) 
    }, 2000);
}

function onPause(event) {
    var message = `{"action": 2, "type":"PornHub", "name": "${getTitle()}", "options": null, "time": null, "totTime": null}`
    webSocket.send(message)
}

function Clearing(event) {
    var clear = `{"action": 0, "type": "PornHub"}`
    webSocket.send(clear)
}

window.onload = onLoad;
if (link.toLowerCase().includes('pornhub.com/view_video.php?viewkey=')) {
    document.getElementsByTagName('video')[0].addEventListener('pause', onPause)
    document.getElementsByTagName('video')[0].addEventListener('play', onPlay)
}
window.onunload = Clearing;

const Time = () => {
    if (!document.location.href.includes('pornhub.com/view_video.php?viewkey=')) return null;
    let time = document.getElementsByClassName('mhp1138_elapsed')[0].innerHTML
    return `"${time}"`
}

const totTime = () => {
    if (!document.location.href.includes('pornhub.com/view_video.php?viewkey=')) return null;
    let totTime = document.getElementsByClassName('mhp1138_total')[0].innerHTML
    return `"${totTime}"`
}

const getTitle = () => {
    return (link.toLowerCase().includes('pornhub.com/view_video.php?viewkey=')) ? title.substring(0, title.length - 13) : 'Главное меню';
}