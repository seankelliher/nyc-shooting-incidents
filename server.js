// ========================
// Packages
// ========================
const express = require("express");
const app = express();

// ========================
// Middlewares
// ========================
app.use(express.static(__dirname + "/dist/")); // For Heroku deployment.

// ========================
// Routes
// ========================
const token = process.env.APP_TOKEN; // In Heroku, "Open Data" token kept here.
const errorMsg = "An error occured.";

app.get("/trend", (req, res) => {
    fetch(`https://data.cityofnewyork.us/resource/5ucz-vwe8.json?$$app_token=${token}&$select=incident_key,occur_date,statistical_murder_flag&$order=occur_date ASC&$limit=3000`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`${errorMsg} ${res.statusText}.`);
            } else {
                return res.json();
            }
        })
        .then(data => {
            res.send({ trends: data });
        })
        .catch(error => alert(error));
});

app.get("/scene", (req, res) => {
    fetch(`https://data.cityofnewyork.us/resource/5ucz-vwe8.json?$$app_token=${token}&$select=incident_key,occur_time,boro,loc_of_occur_desc,loc_classfctn_desc,statistical_murder_flag&$limit=3000`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`${errorMsg} ${res.statusText}.`);
            } else {
                return res.json();
            }
        })
        .then(data => {
            res.send({ scenes: data });
        })
        .catch(error => alert(error));
});

app.get("/vic", (req, res) => {
    fetch(`https://data.cityofnewyork.us/resource/5ucz-vwe8.json?$$app_token=${token}&$select=incident_key,statistical_murder_flag,vic_age_group,vic_sex,vic_race&$limit=3000`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`${errorMsg} ${res.statusText}.`);
            } else {
                return res.json();
            }
        })
        .then(data => {
            res.send({ vics: data });
        })
        .catch(error => alert(error));
});

app.get("/perp", (req, res) => {
    fetch(`https://data.cityofnewyork.us/resource/5ucz-vwe8.json?$$app_token=${token}&$select=incident_key,statistical_murder_flag,perp_age_group,perp_sex,perp_race&$limit=3000`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`${errorMsg} ${res.statusText}.`);
            } else {
                return res.json();
            }
        })
        .then(data => {
            res.send({ perps: data });
        })
        .catch(error => alert(error));
});

app.get(/.*/, function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});

// ========================
// Listen
// ========================
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

/*app.listen(4040, () => {
    console.log("Server listening on port 4040");
});*/
