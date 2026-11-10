// 'const' creates a constant that cannot be reassigned later. 
// '{app, BrowserWindow }' pulls two tools out of the electron package - app (acts as The Manager. Knows when the program starts up, when we click on its icon on the taskbar and when to completely shut the program down)  &  BrowserWindow (creates, configures and manages the actual desktop windows that display our webpages.)
// 'require()' is Node.js syntax for importing an external library.

const { app, BrowserWindow } = require('electron');  

const path = require('path');  // Imports Node's built-in path module to safely build file paths across Windows, Mac and Linux.

let mainWindow;  // Keeping 'mainWindow' out here prevents JS from accidentally deleting the window from memory. 

function createWindow() {  // Function is a reusable block of code designed to perform a specific task.
    mainWindow = new BrowserWindow({  // Creates a new native application window that hosts a web page.
        width: 1280,
        height: 760,
        title: 'Tinkertick',
        autoHideMenuBar: true,  // Hides the File/Edit/View menu bar until the user presses 'Alt'.
        webPreferences: {    

            // 'path.join() combines folder names safely.
            // '_dirname' is a special Node variable holding the exact folder path where this file lives.
            // 'preload.js' is a special JavaScript file that runs before the web page loads inside an app window.

            preload: path.join(__dirname, 'preload.js'),  
            contextIsolation: true,  // here, choosing 'true' keeps Electron's internal code separate from our website's code for security.
            nodeIntegration: false,  // here, choosing 'false' blocks our HTML page from directly accessing our computer's file system.
        }
    })

    mainWindow.loadFile('index.html');  // tells our desktop app to open and show our index.html webpage inside its main window


// '.on()' is an event listener. in this context, it waits for the 'closed' event.

    mainWindow.on('closed', () => {  // '() => { ..... }' is a shorter way to write a function.
        mainWindow = null;   // 'null' clears the variable from memory once the window is closed.
    });
}



// 'app.whenReady()' waits until Electron finished starting up in the background.
// '.then()' runs the code inside once the Electron is ready.

app.whenReady().then(() => {  
    createWindow();  // custom function that opens a new desktop app window on our screen. If we hadn't used this, the app would start running silently in the background, and no window would ever appear on our screen.

    app.on('activate', () => {  // On a Mac, closing an app's window does not actually quit the program, but instead leaves the app running quietly in the bg and the 'app.on('activate', ...)' brings a new window back when the user clicks the app icon in the Dock. Not needed for Windows or Linux 


        // 'BrowserWindow.getAllWindows().length' counts how many windows are currently open.
        // '===' in this context checks if that count is strictly equal to 0.        

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});



app.on('window-all-closed', () => {   // Fires whenever every open window in our app has been closed.


    // 'process.platform' checks the user's operating system.
    // '!==' in this context checks if that value is not equal to 'darwin'.
    // 'darwin' is the internal codename for macOS.
    if (process.platform !== 'darwin') { 
         app.quit();   // '.quit()' completely shuts down the app on Windows and Linux.
    }
});