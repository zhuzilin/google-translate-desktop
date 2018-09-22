const { app, Menu, BrowserWindow, MenuItem } = require('electron');
let menu = require('./menu').menu;

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
    // mainWindow.webContents.openDevTools();
    mainWindow.loadURL('https://translate.google.com/');
    mainWindow.webContents.on('dom-ready', () => {mainWindow.webContents.executeJavaScript(`
        document.getElementById('gt-ft-res').style.display = 'none';
    `);}
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();
    Menu.setApplicationMenu(menu);
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