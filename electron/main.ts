import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';


const isDev = process.env.NODE_ENV === "development";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'logo64x64.png'),
    webPreferences: {
      devTools: isDev,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.webContents.openDevTools();
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    if (isDev) {
      installExtension(REDUX_DEVTOOLS)
        .then(name => {
          console.log(`Added Extension: ${name}`);
          win?.webContents.openDevTools(); // Abre DevTools automáticamente
        })
      .catch(err => console.log('An error occurred: ', err))
    }
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)
