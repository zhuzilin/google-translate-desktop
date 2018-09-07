const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: app.getName(),
        width: 1000,
        height: 800,
        icon: './img/google-translation-favicon.png',
        webPreferences: {
            nodeIntegration: false
        }
    });
    mainWindow.loadURL('https://translate.google.com/');
    mainWindow.webContents.on('dom-ready', () => {mainWindow.webContents.executeJavaScript(`
        document.getElementById('gt-ft-res').style.display = 'none';
        document.getElementById('gt-pb-sw1').style.display = 'none';
        document.getElementById('select_document').style.display = 'none';
        document.getElementsByClassName('gb_Dc gb_Rg gb_R')[0].style.display = 'none';
    `);}
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});