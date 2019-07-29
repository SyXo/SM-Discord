const PresenceModule = require('./PresenceModule');

module.exports = (data) => {
    const template = {
        details: data.name,
        state: data.options,
        startTimestamp: new Date(),
        largeImageKey: 'logo',
        largeImageText: 'Читает мангу',
        smallImageKey: 'ava',
        smallImageText: 'Someone',
        instance: false
    }

    PresenceModule.setRPC(data.type, `603359097877692427`, template);
}