const { Notification, shell } = require('electron');

const path = require('path')

const request = require("request")

async function check(notifyEnable = false) {
    request({
        url: 'https://api.github.com/repos/DivineGSocketUser/SM-Discord/releases/latest',
        json: true,
        headers: { 'user-agent': 'node.js' }
    }, (err, res, body) => {
        if (err) {
            return new Notification({
                title: 'SM Discord',
                body: 'Ошибка при проверке обновления',
                icon: path.join(__dirname, "../assets/img/logo.png"),
                silent: true
            }).show();
        }

        var version = body.tag_name.replace('v', '');
        if (version > PVERSION) {
            if (notifyEnable) {
                var notify = new Notification({
                    title: 'SM Discord',
                    body: 'Нажмите на оповещение, чтобы скачать новое обновление!',
                    icon: path.join(__dirname, '../assets/img/logo.png')
                })

                notify.show();
                notify.on('click', () => {
                    shell.openExternal(`https://github.com/DivineGSocketUser/SM-Discord/releases/tag/${body.tag_name}`)
                })
            } else {
                new Notification({
                    title:'SM Discord',
                    body: 'Открываем браузер для скачки!'
                }).show();
                shell.openExternal(`https://github.com/DivineGSocketUser/SM-Discord/releases/tag/${body.tag_name}`)
            }
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

module.exports = {
    check
}