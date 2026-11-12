const { contextBridge } = require('electron');
const acorn = require('acorn');

contextBridge.exposeInMainWorld('parser', {
  parseCode: (source) => acorn.parse(source, { ecmaVersion: 'latest' })
});