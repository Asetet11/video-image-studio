const { contextBridge } = require('electron'); contextBridge.exposeInMainWorld('luna',{version:process.versions.electron});
