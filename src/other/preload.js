const { remote } = require('electron');
const Config = require('electron-store');
const { join } = require('path');
const folder = join(__dirname, '../')
const VK = require(join(folder, '../modules/VK'))

const userSettings = new Config({
    name: "SMSettings"
});
//const window = remote.getCurrentWindow();

document.getElementById('message').innerHTML = `Подключенный аккаунт: ${(userSettings.get("VK_User_Id") === undefined || userSettings.get("VK_User_Id") == 0) ? `Не указан` : userSettings.get("VK_User_Id")}`;

document.getElementById("button_save").onclick = async (event) =>
{
    const id = document.getElementById("id_page").value
    const state = await VK.checkId(id);

    if (!state) return document.getElementById('message').innerHTML = "Произошла ошибка";
    else userSettings.set('VK_User_Id', id);

    //window.close();
}

document.getElementById("button_cancel").onclick = (event) =>
{
    window.close();
}

