const Config = require('electron-store');
const PresenceModule = require('./PresenceModule');

const userSettings = new Config({
    name: "SMSettings"
});

var vk = new (require('vk-io'));
vk.setToken("51b1623b51b1623b51b1623b6e51daa9c7551b151b1623b0c822e2a6ff26d2799c767bc");

//IDK, what with this FUNCTION (BUGGED)
var state = true;
async function checkId(ID) {
    if (ID == 0 || ID == undefined) return await state;
    await vk.api.call("users.get", {
        user_ids: Number(ID),
    }).then(async (res) => {
        if (res[0].deactivated) return await state;
        state = false;
    }).catch(async err => {
        state = true;
    })
    return await state;
}

var artist, title;

async function run() {
    USERID = userSettings.get('VK_User_Id');
    await checkId(USERID).then(async (state) => {
        if (state || !userSettings.get("VK") || lastaction == 1) return await PresenceModule.deleteRPC('VK');
        await vk.api.call("users.get", {
            user_ids: USERID,
            fields: "status"
        }).then(async (r) => {
            if (!r[0].status_audio) return await PresenceModule.deleteRPC('VK');

            artist = r[0].status_audio.artist
            title = r[0].status_audio.title

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
        })
    })
}

module.exports = {
    run,
    checkId
}