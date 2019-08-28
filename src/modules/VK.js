const Config = require('electron-store');
const PresenceModule = require('./PresenceModule');

const userSettings = new Config({
    name: "SMSettings"
});

var vk = new (require('vk-io'));
vk.setToken("51b1623b51b1623b51b1623b6e51daa9c7551b151b1623b0c822e2a6ff26d2799c767bc");

async function checkId(ID)
{
    ID = Number(ID);

    if (!ID || ID === 0) {
        return false;
    }

    let state;

    try {
      const [
        {
          deactivated
        }
      ] = await vk.api.users.get({
        user_ids: ID
      });
  
      state = deactivated ? false : true;
    } catch (e) {
      state = false;
    }
  
    return state;
}

var artist, title;

async function run()
{
    USERID = userSettings.get('VK_User_Id');
    const state = await checkId(USERID);

    if (!state || !userSettings.get("VK") || lastaction == 1) {
        await PresenceModule.deleteRPC('VK');

        return;
    }

    const [response] = await vk.api.users.get({
        user_ids: USERID,
        fields: "status"
    })

    if (!response.status_audio) {
        await PresenceModule.deleteRPC('VK');

        return;
    }

    artist = response.status_audio.artist
    title = response.status_audio.title

    const template = {
        details: "Автор - " + artist,
        state: "Название - " + title,
        largeImageKey: 'logo',
        largeImageText: 'Слушает музыку',
        smallImageKey: 'ava',
        smallImageText: 'SM Discord',
        instance: false,
    }

    await PresenceModule.setRPC('VK', `602133205197258795`, template);
}

module.exports = {
    run,
    checkId
}