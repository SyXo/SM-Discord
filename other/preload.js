const { remote } = require('electron');
const Config = require('electron-store');
const { join } = require('path');
const folder = join(__dirname, '../')
const VK = require(join(folder, '../modules/VK'))

const userSettings = new Config({
    name: "SMSettings"
});
var window = remote.getCurrentWindow();

document.getElementById('message').innerHTML = `Подключенный аккаунт: ${(userSettings.get("VK_User_Id") == undefined || userSettings.get("VK_User_Id") == 0) ? `Не указан` : userSettings.get("VK_User_Id")}`;

document.getElementById("button_save").onclick = async (event) => {
    var id = document.getElementById("id_page").value
    await VK.checkId(id).then(async(state) => {
        if(state) return document.getElementById('message').innerHTML = "Произошла ошибка";
        
        userSettings.set('VK_User_Id', id);

        window.close();
    })
}

document.getElementById("button_cancel").onclick = (event) => {
    window.close();
}

