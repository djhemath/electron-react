const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu} = electron;
let mainWindow;

// Listen for the app to be ready
app.on('ready', function() {
    // Create a window.
    mainWindow = new BrowserWindow();
    // Load the html file
    mainWindow.loadURL(url.format({
        // pathname: path.join(__dirname, '/react-files/build/index.html'),
        pathname: path.join(__dirname, 'mainwindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Build menu from Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    // On QUIT
    mainWindow.on('closed', function() {
        app.quit();
    });
});

// Create menu Template
const mainMenuTemplate = [
    // We don't need menu
]

// Add DevTools in DEV mode
if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? "Command+I" : "Ctrl+Shift+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}