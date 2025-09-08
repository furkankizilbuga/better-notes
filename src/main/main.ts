import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './ipc/notes.js'
import { initDb } from './db/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isDev = process.env.NODE_ENV === 'development'
let mainWindow: BrowserWindow | null = null;

/* let syncInterval: NodeJS.Timeout;
const SYNC_PERIOD = 60000;

const startPeriodicSync = () => {
	syncInterval = setInterval(async () => {
		await processSync();
	}, SYNC_PERIOD)
}

const processSync = async () => {
	UploadChanges();
	//
	let notes: NoteSyncRequest[]  = [];
	DownloadChanges()
	.then((res) => {
		notes = res;
	})
	.catch(err => console.error(err));
	//

	SyncWithPostgre(notes);
	ClearChanges();
} */

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.cjs')
		}
	})

	if (isDev) {
		// Geliştirme modunda Vite sunucusuna bağlan
		mainWindow.loadURL('http://localhost:3000')
		mainWindow.webContents.openDevTools()
	} else {
		// Production modunda build edilmiş dosyaları yükle
		mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
	}
}

app.whenReady().then(() => {
	//startPeriodicSync();
	initDb();
	createWindow();
})

app.on('before-quit', async () => {
	// Çıkmadan son kez sync ediyoruz.
	/* await processSync();
	clearInterval(syncInterval); */
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})