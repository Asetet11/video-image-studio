// electron/main.cjs

const { app, BrowserWindow, dialog } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

// Beende sofort, falls Squirrel-Events (Windows-Installer) laufen
try {
  if (require('electron-squirrel-startup')) app.quit()
} catch { /* noop */ }

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs')
    }
  })

  // Dev vs. Prod laden
  const devUrl = process.env.VITE_DEV_SERVER_URL
  if (devUrl) {
    win.loadURL(devUrl)
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'renderer', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  // ---- Auto-Update (GitHub Releases) ----
  autoUpdater.autoDownload = true
  autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('update-available', (info) => {
    console.log('Update verfügbar:', info.version)
  })

  autoUpdater.on('update-downloaded', async (info) => {
    const res = await dialog.showMessageBox({
      type: 'info',
      title: 'Luna – Update',
      message: `Version ${info.version} wurde heruntergeladen. Jetzt installieren?`,
      buttons: ['Jetzt neu starten', 'Später']
    })
    if (res.response === 0) {
      autoUpdater.quitAndInstall()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getA
