const { app } = require('electron');

if (!app.isPackaged) process.stdout.write("\u001b[2J\u001b[0;0H");

app.setAppUserModelId('This is a programm with large count of bugs!')
app.requestSingleInstanceLock()

const Config = require('electron-store');

const userSettings = new Config({
  name: "SMSettings"
});

const os = require('os');

global.PLATFORM = os.platform();
global.TRAY = null;
global.lastaction = 0;
global.DIRECTORY = __dirname;
global.USERID = userSettings.get('VK_User_Id');
global.PVERSION = require('./package.json').productVersion;

const appReady = async () => {
  //* Setup MenuBar
  require('./tray/createTray').run();
  require('./tray/autoLaunch').add();
  require('./tray/checkUpdate').check(true);

  /* CHECK VALID USER VK */
  if (userSettings.get('VK_User_Id') == undefined) {
    require('./other/ConfigModule').newUserId();
  }

  if (PLATFORM == "darwin") app.dock.hide()
}

app.on('ready', appReady);
app.on('window-all-closed', () => { });

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  ws.on('message', message => {
    try {
      var data = JSON.parse(message);
      var state = nowStatus(data.action)

      console.log(data);
      require('./TypeChecker')(data, state);

      lastaction = data.action
    } catch (err) {
      console.log(err);
    }
  })
})

function nowStatus(action) {
  switch (action) {
    case 0:
      return "Exit";
    case 1:
      return "Play";
    case 2:
      return "Pause";
    default:
      return "Exit";
  }
}

/* VK SERVICE */
setInterval(() => {
  require('./modules/VK').run()
}, 4000);