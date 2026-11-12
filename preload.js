const { contextBridge } = require('electron');  
const acorn = require('acorn');   


// 'parseCode:' creates a function name that our web page can call 
// 'source' is the input box that receives whatever text code we typed into our editor
contextBridge.exposeInMainWorld('parser', {
  parseCode: (source) => acorn.parse(source, { ecmaVersion: 'latest' })
});
