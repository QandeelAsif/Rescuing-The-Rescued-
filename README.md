# Rescuing-The-Rescued-

after having node installed in your system
Go to Vs code and run your terminal
write:
 npm init
 npm install --save express ejs morgan
 npm install --body-parser


ClientSideJS folder:
It handles the Client side code. Jquery will not work in node files(Here our node file is app.js) because node.js is run in a different environment than front-end JS. Meaning, client-side js is run in the browser, giving it access to host objects like "window", and "document" (things that jquery uses). Node.js is run on the server-side, meaning it does not have access to objects provided by the browser, but has access to different host objects.The back-end file (app.js) is using express which is different from the JS that will be interacting with the DOM (Here: main.js). You can write your client-side js separately from your express/node code, and serve it as a static file. Your client-side js is a "static asset", which can be sent directly to the browser without manipulation by the express file.

	