const { BrowserWindow } = require('electron');

let win;

async function newUserId() {
    if (win != null) return;
    win = new BrowserWindow({
        center: true,
        maximizable: false,
        minimizable: false,
        width: 270,
        height: 140,
        show:true,
        webPreferences: {
            nodeIntegration:true
        }
    })

    win.on('closed', () => {
        win = null
    })

    win.setMenu(null);
    win.loadURL(`file://${__dirname}/windows/VK_ID.html`)
}

module.exports = {
    newUserId
}