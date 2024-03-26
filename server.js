// ========================
// Packages - using  ES Modules
// ========================

// Import the express module. It's a function.
import express from "express";

// Run the Express function.
const app = express();

// Since we are using node with ES Modules, we need to import:
// "path" - node module for working with files & directories.
// "fileURLToPath" - node module that splits web address into readable parts.
// "process" - node global object gives info & control of current node process.
import path from "path";
import { fileURLToPath } from "url"; 
import process from "process";

// We need to create the __filename & __dirname global objects, native to node.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================
// Middlewares
// ========================

// Single page app fix.
// Solves problem where browser cannot find static pages
// after build because app is really one page and routes are mocked.
// Using Express' built-in middleware function static(),
// we tell Express to serve static files from the "dist" directory.
app.use(express.static(__dirname + "/dist/"));

// ========================
// Routes
// ========================

// Access token, using environmental variables.
const token = process.env.APP_TOKEN; // In Heroku, "Open Data" token kept here.

// Example route with error handling.
app.get("/shooting-incidents", (req, res) => {
    fetch(`https://data.cityofnewyork.us/resource/5ucz-vwe8.json?$$app_token=${token}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);

            } else {
                return res.json();
            }
        })
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
            const reason = Number(error.message);
            res.sendStatus(reason);
        });
});

// If none of the above routes' match component's request, it gets handled here.
// We tell Express to send any route request to the app's index.html file.
// Essentially, we deliver the request to Vue and let Vue handle routing.
app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});

// ========================
// Listen
// ========================

// Remote environment.
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

// Local environment.
/* app.listen(4040, () => {
    console.log("Server listening on port 4040");
}); */