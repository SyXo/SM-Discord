const path = require('path')
const { Tray, Menu, Notification, ico } = require('electron')

const Config = require('electron-store');

const userSettings = new Config({
  name: "SMSettings"
});

var configVK = () => require('../other/ConfigModule').newUserId();
var checkUpdate = () => require('./checkUpdate').check();

exports.run = () => {
  TRAY = new Tray(path.join(__dirname, "../assets/img/icon.png"))
  var contextMenu = Menu.buildFromTemplate([
    {
      label: "SM Discord v0.1",
      enabled: false,
    },
    {
      type: 'separator'
    },
    {
      label: "Settings",
      submenu: [
        {
          label: 'Anime',
          submenu: [{
            label: 'AniMedia.tv',
            type: 'checkbox',
            checked: userSettings.get('AniMedia') == true ? true : false,
            click: function (item) {
              checkBoxChange(item, 'AniMedia', 'AniMedia')
            }
          },
          {
            label: 'MangaLib.me',
            type: 'checkbox',
            checked: userSettings.get('MangaLib') == true ? true : false,
            click: function (item) {
              checkBoxChange(item, 'MangaLib', 'Mangalib')
            }
          }]
        },
        {
          label: 'NSFW',
          submenu: [
            {
              label: 'PornHub',
              type: 'checkbox',
              checked: userSettings.get('PornHub') == true ? true : false,
              click: function (item) {
                checkBoxChange(item, 'PornHub', 'Порнхаба')
              }
            }
          ]
        },
        {
          label: 'Music',
          submenu: [{
            label: 'ВКонтакте',
            submenu: [
              {
                label: 'Включить',
                type: 'checkbox',
                checked: userSettings.get('VK') == true ? true : false,
                click: function (item) {
                  checkBoxChange(item, 'VK', 'ВКонтакте')
                }
              },
              {
                label: 'ID страницы',
                click: configVK
              }
            ]
          }]
        }
      ]
    },
    {
      click: checkUpdate,
      label: "Check for updates"
    },
    {
      role: 'quit'
    }
  ]);

  TRAY.setToolTip(`Xuli smotrish`)
  TRAY.setContextMenu(contextMenu)
}

function checkBoxChange(item, ConfigItem, Label) {
  userSettings.set(ConfigItem, item.checked)
  new Notification({
    title:"SM Discord",
    body:`Вы ${item.checked == true ? "включили" : "отключили"} поддержку ${Label}!`,
    icon: path.join(__dirname, "../assets/img/logo.png"),
    silent: true
  }).show()
}