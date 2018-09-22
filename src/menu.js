const { app, Menu, shell } = require('electron')

const template = [
    {
        role: 'editMenu'
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {
                label: 'Back',
                accelerator: 'Backspace',
                click (menuItem, browserWindow) {
                    if(browserWindow.webContents.canGoBack())
                        browserWindow.webContents.goBack();
                }
            },
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'About',
                click () { shell.openExternal('https://github.com/zhuzilin/google-translate-desktop') }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}

        ]
    });

    // Window menu
    template[3].submenu = [
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'}
    ]
}

const menu = Menu.buildFromTemplate(template)

exports.menu = menu;