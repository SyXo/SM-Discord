const DiscordRPC = require('discord-rpc');

var modulesRPC      = [],
    modulesLogin    = [];

async function deleteRPC(type) {
    var RPC = modulesRPC.find(x => x.Name == type);

    if (RPC) {
        RPC.presence.destroy().then(res => {
            modulesRPC.splice(RPC, 1);
        });
    }
}

async function setRPC(type, moduleID, template) {
    var RPC = modulesRPC.find(x => x.Name == type);

    if (RPC) {
        await RPC.presence.setActivity(template);
    } else {
        await addService(type, moduleID, template);
        modulesLogin.push({ Name: type, intervalID: setInterval(async () => await addService(type, moduleID, template), 10 * 1000) })
    }
}

async function addService(type, moduleID, template) {
    await modulesRPC.push({ presence: new DiscordRPC.Client({ transport: "ipc" }), Name: type });

    var moduleRPC = modulesRPC.find(x => x.Name == type);

    moduleRPC.presence.login({ clientId: moduleID }).catch(err => {
        console.log(err.message)
        deleteRPC(type);
    });

    moduleRPC.presence.on("ready", async () => {
        await clearLogin(type);
        await moduleRPC.presence.setActivity(template);
    })
}

async function clearLogin(type) {
    var moduleLogin = modulesLogin.find(x => x.Name == type);

    await clearInterval(moduleLogin.intervalID);
    await modulesLogin.splice(moduleLogin, 1);
}

module.exports = {
    setRPC,
    deleteRPC
}