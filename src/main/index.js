import { app, BrowserWindow, Menu, Tray, globalShortcut } from 'electron'
import '../renderer/store'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let tray = null
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1150
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('focus', () => {
    globalShortcut.register('CommandOrControl+F', function () {
      if (mainWindow && mainWindow.webContents) {
        mainWindow.webContents.send('on-find', '')
      }
    })
  })

  mainWindow.on('blur', () => {
    globalShortcut.unregister('CommandOrControl+F')
  })

  if (process.platform === 'darwin') {
    const template = [
      {
        label: "Application",
        submenu: [
          { label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
        ]
      },
      {
        label: "编辑",
        submenu: [
          { role: 'undo', label: '撤销' },
          { role: 'redo', label: '取消撤销' },
          { type: 'separator'},
          { role: 'cut', label: '剪切' },
          { role: 'copy', label: '复制' },
          { role: 'paste', label: '粘贴' },
          { role: 'delete', label: '删除' },
          { role: 'selectall', label: '全选' }
        ]
      }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  } else {
    Menu.setApplicationMenu(null)
  }

  if(!tray) {
    tray = new Tray(require("path").join(__static, "./img/logo_small.png"))
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '退出',
        click: function() {
          app.quit();
        }
      }
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('apidoc转换工具')
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
