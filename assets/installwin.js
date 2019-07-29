console.log("Creating installer for Windows...")
var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './tempdir/SM Discord-win32-ia32',
  outputDirectory: './tempdir/installers/',
  exe: './SM Discord.exe',
  iconUrl: "https://cdn.discordapp.com/attachments/588752238130757642/605457834737664010/icon.ico",
  noMsi: true
});

resultPromise.then(() => console.log("Created installer for Windows!"), (e) => console.log(`No dice: ${e.message}`));