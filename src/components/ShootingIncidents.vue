<script setup>
import { ref, onMounted } from "vue";

const incidents = ref([]);

// Totals
const shootings = ref([]);
const murders = ref([]);

// Dates
const dates = ref([]);
const firstDate = ref("");
const lastDate = ref("");

// Time of Day
const earlyMorning = ref([]);
const morning = ref([]);
const afternoon = ref([]);
const evening = ref([]);

// Borough
const bronx = ref([]);
const brooklyn = ref([]);
const manhattan = ref([]);
const queens = ref([]);
const staten = ref([]);

// Gender
const maleVic = ref([]);
const malePerp = ref([]);
const femaleVic = ref([]);
const femalePerp = ref([]);
const genderUnknownVic = ref([]);
const genderUnknownPerp = ref([]);

// Age
const ageUnder18Vic = ref([]);
const ageUnder18Perp = ref([]);
const age18To24Vic = ref([]);
const age18To24Perp = ref([]);
const age25To44Vic = ref([]);
const age25To44Perp = ref([]);
const age45To64Vic = ref([]);
const age45To64Perp = ref([]);
const age65UpVic = ref([]);
const age65UpPerp = ref([]);
const ageUnknownVic = ref([]);
const ageUnknownPerp = ref([]);

// Race
const asianVic = ref([]);
const asianPerp = ref([]);
const blackVic = ref([]);
const blackPerp = ref([]);
const blackHispVic = ref([]);
const blackHispPerp = ref([]);
const whiteVic = ref([]);
const whitePerp = ref([]);
const whiteHispVic = ref([]);
const whiteHispPerp = ref([]);
const raceUnknownVic = ref([]);
const raceUnknownPerp = ref([]);

// Location
const commercial = ref([]);
const dwelling = ref([]);
const housing = ref([]);
const parkingLot = ref([]);
const playground = ref([]);
const street = ref([]);
const transit = ref([]);
const vehicle = ref([]);
const otherLocation = ref([]);

// Using locally -> http://localhost:4040/shooting-incidents
// Using remotely -> /shooting-incidents
onMounted(() => {
    if (!localStorage.getItem("nycShootings")) {
        console.log("data being fetched from NYC Open Data");

        fetch("/shooting-incidents")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(`Error: ${response.status}, Data currently unavailable. Please try again later.`);
                }
            })
            .then((data) => {
                incidents.value = data;
                getTotals();
                getDates();
                getTimeOfDay();
                getBorough();
                getGender("vic");
                getGender("perp");
                getAge("vic");
                getAge("perp");
                getRace("vic");
                getRace("perp");
                getLocation();
                localStorage.setItem("nycShootings", JSON.stringify(incidents.value));
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        const local = localStorage.getItem("nycShootings");
        const localParsed = JSON.parse(local);
        incidents.value = localParsed;
        console.log("local storage data is being used.");
        getTotals();
        getDates();
        getTimeOfDay();
        getBorough();
        getGender("vic");
        getGender("perp");
        getAge("vic");
        getAge("perp");
        getRace("vic");
        getRace("perp");
        getLocation();
    }
});

function getTotals() {
    incidents.value.map((incident) => {
        shootings.value.push(incident.incident_key);
        if (incident.statistical_murder_flag === "Y") {
            murders.value.push(incident.incident_key);
        }
    });
}

function getDates() {
    incidents.value.map((incident) => {
        dates.value.push(incident.occur_date);
    });
    dates.value.sort();
    const lengthMinus = dates.value.length - 1;
    firstDate.value = dates.value[0];
    lastDate.value = dates.value[`${lengthMinus}`];

}

function getTimeOfDay() {
    incidents.value.map((incident) => {
        if (incident.occur_time >= "00:00:00" && incident.occur_time <= "05:59:00") {
            earlyMorning.value.push(incident.incident_key);
        } else if (incident.occur_time >= "06:00:00" && incident.occur_time <= "11:59:00") {
            morning.value.push(incident.incident_key);
        } else if (incident.occur_time >= "12:00:00" && incident.occur_time <= "17:59:00") {
            afternoon.value.push(incident.incident_key);
        } else if (incident.occur_time >= "18:00:00" && incident.occur_time <= "23:59:00") {
            evening.value.push(incident.incident_key);
        }
    });
}

function getBorough() {
    incidents.value.map((incident) => {

        const expr = incident.boro;
        switch(expr) {
        case "BRONX":
            bronx.value.push(incident.incident_key);
            break;
        case "BROOKLYN":
            brooklyn.value.push(incident.incident_key);
            break;
        case "MANHATTAN":
            manhattan.value.push(incident.incident_key);
            break;
        case "QUEENS":
            queens.value.push(incident.incident_key);
            break;
        case "STATEN ISLAND":
            staten.value.push(incident.incident_key);
            break;
        }
    });
}

function getGender(category) {
    let expr;

    incidents.value.map((incident) => {
        if (category === "vic") {
            expr = incident.vic_sex;

            switch(expr) {
            case "M":
                maleVic.value.push(incident.incident_key);
                break;
            case "F":
                femaleVic.value.push(incident.incident_key);
                break;
            default:
                genderUnknownVic.value.push(incident.incident_key);
            }
        } else if (category === "perp") {
            expr = incident.perp_sex;

            switch(expr) {
            case "M":
                malePerp.value.push(incident.incident_key);
                break;
            case "F":
                femalePerp.value.push(incident.incident_key);
                break;
            default:
                genderUnknownPerp.value.push(incident.incident_key);
            }
        }
    });        
}

function getAge(category) {
    let expr;

    incidents.value.map((incident) => {
        if (category === "vic") {
            expr = incident.vic_age_group;

            switch(expr) {
            case "<18":
                ageUnder18Vic.value.push(incident.incident_key);
                break;
            case "18-24":
                age18To24Vic.value.push(incident.incident_key);
                break;
            case "25-44":
                age25To44Vic.value.push(incident.incident_key);
                break;
            case "45-64":
                age45To64Vic.value.push(incident.incident_key);
                break;
            case "65+":
                age65UpVic.value.push(incident.incident_key);
                break;
            default:
                ageUnknownVic.value.push(incident.incident_key);
            }
        } else if (category === "perp") {
            expr = incident.perp_age_group;

            switch(expr) {
            case "<18":
                ageUnder18Perp.value.push(incident.incident_key);
                break;
            case "18-24":
                age18To24Perp.value.push(incident.incident_key);
                break;
            case "25-44":
                age25To44Perp.value.push(incident.incident_key);
                break;
            case "45-64":
                age45To64Perp.value.push(incident.incident_key);
                break;
            case "65+":
                age65UpPerp.value.push(incident.incident_key);
                break;
            default:
                ageUnknownPerp.value.push(incident.incident_key);
            }
        }
    });        
}

function getRace(category) {
    let expr;

    incidents.value.map((incident) => {
        if (category === "vic") {
            expr = incident.vic_race;

            switch(expr) {
            case "ASIAN / PACIFIC ISLANDER":
                asianVic.value.push(incident.incident_key);
                break;
            case "BLACK":
                blackVic.value.push(incident.incident_key);
                break;
            case "BLACK HISPANIC":
                blackHispVic.value.push(incident.incident_key);
                break;
            case "WHITE":
                whiteVic.value.push(incident.incident_key);
                break;
            case "WHITE HISPANIC":
                whiteHispVic.value.push(incident.incident_key);
                break;
            default:
                raceUnknownVic.value.push(incident.incident_key);
            }
        } else if (category === "perp") {
            expr = incident.perp_race;

            switch(expr) {
            case "ASIAN / PACIFIC ISLANDER":
                asianPerp.value.push(incident.incident_key);
                break;
            case "BLACK":
                blackPerp.value.push(incident.incident_key);
                break;
            case "BLACK HISPANIC":
                blackHispPerp.value.push(incident.incident_key);
                break;
            case "WHITE":
                whitePerp.value.push(incident.incident_key);
                break;
            case "WHITE HISPANIC":
                whiteHispPerp.value.push(incident.incident_key);
                break;
            default:
                raceUnknownPerp.value.push(incident.incident_key);
            }
        }
    });
}

function getLocation() {
    incidents.value.map((incident) => {

        const expr = incident.loc_classfctn_desc;
        switch(expr) {
        case "COMMERICAL":
            commercial.value.push(incident.incident_key);
            break;
        case "DWELLING":
            dwelling.value.push(incident.incident_key);
            break;
        case "HOUSING":
            housing.value.push(incident.incident_key);
            break;
        case "PARKING LOT":
            parkingLot.value.push(incident.incident_key);
            break;
        case "PLAYGROUND":
            playground.value.push(incident.incident_key);
            break;
        case "STREET":
            street.value.push(incident.incident_key);
            break;
        case "TRANSIT":
            transit.value.push(incident.incident_key);
            break;
        case "VEHICLE":
            vehicle.value.push(incident.incident_key);
            break;
        default:
            otherLocation.value.push(incident.incident_key);
        }
    });
}
</script>

<template>
    <main>
        <section class="gen-border">
            <dl>
                <dt>Totals</dt>
                <dd><span>Shootings</span> <span>{{ shootings.length.toLocaleString() }}</span></dd>
                <dd><span>Fatalities</span> <span>{{ murders.length }}</span></dd>
            </dl>
        </section>

        <div class="intro">
            <p>Data compiled by NYPD and available though <a href="https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Year-To-Date-/5ucz-vwe8/about_data" target="_blank">NYC Open Data</a>. Data is for the past 12 months, {{ firstDate.substring(0,10) }} - {{ lastDate.substring(0,10) }}, updated at the end of each quarter. Shooting incidents are considered unique. For example, if a perpetrator shoots three people, this is considered three incidents.</p>
        </div>

        <div class="heading">
            <h3>Time &amp; Locations</h3>
        </div>

        <section class="loc-border">
            <dl>
                <dt>Time of Day</dt>
                <dd><span>Early morning</span> <span>{{ earlyMorning.length }}</span></dd>
                <dd><span>Morning</span> <span>{{ morning.length }}</span></dd>
                <dd><span>Afternoon</span> <span>{{ afternoon.length }}</span></dd>
                <dd><span>Evening</span> <span>{{ evening.length }}</span></dd>
            </dl>
        </section>

        <section class="loc-border">
            <dl>
                <dt>Borough</dt>
                <dd><span>Bronx</span> <span>{{ bronx.length }}</span></dd>
                <dd><span>Brooklyn</span> <span>{{ brooklyn.length }}</span></dd>
                <dd><span>Manhattan</span> <span>{{ manhattan.length }}</span></dd>
                <dd><span>Queens</span> <span>{{ queens.length }}</span></dd>
                <dd><span>Staten Island</span> <span>{{ staten.length }}</span></dd>
            </dl>
        </section>

        <section class="loc-border">
            <dl>
                <dt>Location Type</dt>
                <dd><span>Commercial</span> <span>{{ commercial.length }}</span></dd>
                <dd><span>Dwelling</span> <span>{{ dwelling.length }}</span></dd>
                <dd><span>Housing</span> <span>{{ housing.length }}</span></dd>
                <dd><span>Parking Lot</span> <span>{{ parkingLot.length }}</span></dd>
                <dd><span>Playground</span> <span>{{ playground.length }}</span></dd>
                <dd><span>Street</span> <span>{{ street.length }}</span></dd>
                <dd><span>Transit</span> <span>{{ transit.length }}</span></dd>
                <dd><span>Vehicle</span> <span>{{ vehicle.length }}</span></dd>
                <dd><span>Other Location</span> <span>{{ otherLocation.length }}</span></dd>
            </dl>
        </section>

        <div class="heading">
            <h3>Victims</h3>
        </div>

        <section class="vic-border">
            <dl>
                <dt>Victim, Gender</dt>
                <dd><span>Male</span> <span>{{ maleVic.length }}</span></dd>
                <dd><span>Female</span> <span>{{ femaleVic.length }}</span></dd>
                <dd><span>na</span> <span>{{ genderUnknownVic.length }}</span></dd>
            </dl>
        </section>

        <section class="vic-border">
            <dl>
                <dt>Victim, Age</dt>
                <dd><span>under 18</span> <span>{{ ageUnder18Vic.length }}</span></dd>
                <dd><span>18 - 24</span> <span>{{ age18To24Vic.length }}</span></dd>
                <dd><span>25 - 44</span> <span>{{ age25To44Vic.length }}</span></dd>
                <dd><span>45 - 64</span> <span>{{ age45To64Vic.length }}</span></dd>
                <dd><span>65 plus</span> <span> {{ age65UpVic.length }}</span></dd>
                <dd><span>na</span> <span>{{ ageUnknownVic.length }}</span></dd>
            </dl>
        </section>

        <section class="vic-border">
            <dl>
                <dt>Victim, Race</dt>
                <dd><span>Asian</span> <span>{{ asianVic.length }}</span></dd>
                <dd><span>Black</span> <span>{{ blackVic.length }}</span></dd>
                <dd><span>Black Hispanic</span> <span>{{ blackHispVic.length }}</span></dd>
                <dd><span>White</span> <span>{{ whiteVic.length }}</span></dd>
                <dd><span>White Hispanic</span> <span>{{ whiteHispVic.length }}</span></dd>
                <dd><span>na</span> <span>{{ raceUnknownVic.length }}</span></dd>
            </dl>
        </section>

        <div class="heading">
            <h3>Perps</h3>
        </div>

        <section class="perp-border">
            <dl>
                <dt>Perp, Gender</dt>
                <dd><span>Male</span> <span>{{ malePerp.length }}</span></dd>
                <dd><span>Female</span> <span>{{ femalePerp.length }}</span></dd>
                <dd><span>na</span> <span>{{ genderUnknownPerp.length }}</span></dd>
            </dl>
        </section>

        <section class="perp-border">
            <dl>
                <dt>Perp, Age</dt>
                <dd><span>under 18</span> <span>{{ ageUnder18Perp.length }}</span></dd>
                <dd><span>18 - 24</span> <span>{{ age18To24Perp.length }}</span></dd>
                <dd><span>25 - 44</span> <span>{{ age25To44Perp.length }}</span></dd>
                <dd><span>45 - 64</span> <span>{{ age45To64Perp.length }}</span></dd>
                <dd><span>65 plus</span> <span>{{ age65UpPerp.length }}</span></dd>
                <dd><span>na</span> <span>{{ ageUnknownPerp.length }}</span></dd>
            </dl>
        </section>

        <section class="perp-border">
            <dl>
                <dt>Perp, Race</dt>
                <dd><span>Asian</span> <span>{{ asianPerp.length }}</span></dd>
                <dd><span>Black</span> <span>{{ blackPerp.length }}</span></dd>
                <dd><span>Black Hispanic</span> <span>{{ blackHispPerp.length }}</span></dd>
                <dd><span>White</span> <span>{{ whitePerp.length }}</span></dd>
                <dd><span>White Hispanic</span> <span>{{ whiteHispPerp.length }}</span></dd>
                <dd><span>na</span> <span>{{ raceUnknownPerp.length }}</span></dd>
            </dl>
        </section>
    </main>
</template>

<style scoped>
</style>
