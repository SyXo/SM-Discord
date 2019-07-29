const { Notification } = require('electron');
const { autoUpdater }=   require('electron-updater');

const path = require('path')

const request = require("request")

async function check() {
    request({
        url: 'https://api.github.com/repos/DivineGSocketUser/SM-Discord/releases/latest',
        json: true,
        headers: {'user-agent':'node.js'}
    }, (err, res, body) => {
        if(err) {
            return new Notification({
                title: 'SM Discord',
                body: 'Ошибка при проверке обновления',
                icon: path.join(__dirname, "../img/logo.png"),
                silent: true
            }).show();
        }
        
        var version = body.tag_name.replace('v', '');
        if(version > PVERSION){
            autoUpdater.checkForUpdates()
        } else {
            new Notification({
                title: 'SM Discord',
                body: 'У вас установлена последняя версия!',
                icon: path.join(__dirname, "../assets/img/logo.png"),
                silent: true
            }).show();
        }
    })
}

autoUpdater.on('update-downloaded', (info) => {
    // Wait 5 seconds, then quit and install
    // In your application, you don't need to wait 5 seconds.
    // You could call autoUpdater.quitAndInstall(); immediately
    setTimeout(function() {
      autoUpdater.quitAndInstall();  
    },5000)
  })

module.exports = {
    check
}