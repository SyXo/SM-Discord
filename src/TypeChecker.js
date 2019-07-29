const Config = require('electron-store');
const presenceModule = require('./modules/PresenceModule');

const userSettings = new Config({
  name: "SMSettings"
});

module.exports = (data, state) => {
  if (!userSettings.get(data.type)) state = 'Exit';
  if (state == 'Exit') return presenceModule.deleteRPC(data.type);

  require(`./modules/${data.type}`)(data);
}