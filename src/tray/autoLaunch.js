const {app} = require('electron')
const AutoLaunch = require('auto-launch')

function add() {
    let autoLaunch = new AutoLaunch({
        name: 'SM Discord',
        path: app.getPath("exe"),
        isHidden: true
    })

    autoLaunch.isEnabled().then(async (isEnabled) => {
        if (!isEnabled) autoLaunch.enable();
        console.log('AutoLaunch enabled')
    })
    .catch(function (err) {
        console.log(err)
    }) 
}

module.exports = {
    add
}