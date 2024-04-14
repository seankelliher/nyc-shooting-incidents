<script setup>
import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

const incidents = ref([]);

// Totals
const shootings = ref([]);
const murders = ref([]);

// Dates
const dates = ref([]);
const openDate = ref("");
const closeDate = ref("");

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

// Error
const errorMsg = ref("");

let map;
const mapContainer = ref(null);

// Using locally -> http://localhost:4040/shooting-incidents
// Using remotely -> /shooting-incidents
onMounted(() => {
    errorMsg.value = "";
    if (!sessionStorage.getItem("nycShootings")) {
        console.log("data being fetched from NYC Open Data");

        fetch("/shooting-incidents")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(`Error: ${response.status}, Please wait a few seconds and try refreshing your browser.`);
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
                createMap();
                sessionStorage.setItem("nycShootings", JSON.stringify(incidents.value));
            })
            .catch((error) => {
                console.log(error);
                errorMsg.value = error;
            });
    } else {
        const local = sessionStorage.getItem("nycShootings");
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
        createMap();
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

// Sets the open/close dates in the "intro" box.
function getDates() {
    incidents.value.map((incident) => {
        dates.value.push(incident.occur_date);
    });
    dates.value.sort();
    const lengthMinus = dates.value.length - 1;

    const openDateMonth = dates.value[0].substring(5,7);
    const openDateYear = dates.value[0].substring(0,4);
    const closeDateMonth = dates.value[`${lengthMinus}`].substring(5,7);
    const closeDateYear = dates.value[`${lengthMinus}`].substring(0,4);

    let closeDateDay;

    // Quarters end Mar 31, Jun 30, Sep 30, or Dec 31.
    if (closeDateMonth === "03" || closeDateMonth === "12") {
        closeDateDay = "31";
    } else if (closeDateMonth === "06" || closeDateMonth === "09") {
        closeDateDay = "30";
    }

    // Set the 12 month period, open and close.
    openDate.value = `${openDateMonth}/01/${openDateYear}`;
    closeDate.value = `${closeDateMonth}/${closeDateDay}/${closeDateYear}`;
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

function createMap() {
    // Read only, restricted to requests from single URL.
    mapboxgl.accessToken = "pk.eyJ1Ijoic2s1NjQ2NzMiLCJhIjoiY2x1eWh2cHJnMGdiNjJrcXFuM2txZnE5MiJ9.0T3dUBTc2gYig63D4nmCqw";

    map = new mapboxgl.Map({
        container: mapContainer.value,
        style: "mapbox://styles/mapbox/light-v11", // v11 flat map, v12 globe.
        center: [-73.840, 40.702],
        zoom: 10.0
    });

    // A small number of shooting incidents do not have geolocation data.
    // If statement removes those and prevents errors.
    incidents.value.map((incident) => {
        if (Object.hasOwn(incident, "geocoded_column")) {
            new mapboxgl.Marker({ color: "#009ddc", scale: 0.75, properties: { alt: "marker for location on map"} })
                .setLngLat([`${incident.geocoded_column.coordinates[0]}`, `${incident.geocoded_column.coordinates[1]}`])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<dl>
                                <dt>${incident.boro}</dt>
                                <dd>Precinct: ${incident.precinct}</dd>
                                <dd>Date: ${incident.occur_date.substring(0, 10)}</dd>
                                <dd>Time, 24hr: ${incident.occur_time.substring(0, 5)}</dd>
                                <dd>Fatal: ${incident.statistical_murder_flag === "Y" ?  "Yes" : "No"}</dd>
                            </dl>`
                        )
                )
                .addTo(map);
        }
    });
}

</script>

<template>
    <main>
        <div v-if="errorMsg" class="heading-error">
            <p class="error-msg">{{ errorMsg }}</p>
        </div>
        <section class="gen-border">
            <dl>
                <dt>Totals</dt>
                <dd><span>Shootings</span> <span>{{ shootings.length.toLocaleString() }}</span></dd>
                <dd><span>Fatalities</span> <span>{{ murders.length }}</span></dd>
            </dl>
        </section>

        <div class="intro">
            <p>Data compiled by NYPD and available at <a href="https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Year-To-Date-/5ucz-vwe8/about_data" target="_blank">NYC Open Data</a>. Data is for the past 12 months, {{ openDate }} - {{ closeDate }}, updated at the end of each quarter. Shooting incidents are considered unique. For example, if a perpetrator shoots three people, it is considered three incidents.</p>
        </div>

        <div class="heading">
            <h3>Time &amp; Locations</h3>
        </div>

        <section class="loc-border">
            <dl>
                <dt>Time of Day</dt>
                <dd><span>12am - 5:59am</span> <span>{{ earlyMorning.length }}</span></dd>
                <dd><span>6am - 11:59am</span> <span>{{ morning.length }}</span></dd>
                <dd><span>12pm - 5:59pm</span> <span>{{ afternoon.length }}</span></dd>
                <dd><span>6pm - 11:59pm</span> <span>{{ evening.length }}</span></dd>
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
                <dt>Gender</dt>
                <dd><span>Male</span> <span>{{ maleVic.length }}</span></dd>
                <dd><span>Female</span> <span>{{ femaleVic.length }}</span></dd>
                <dd><span>na</span> <span>{{ genderUnknownVic.length }}</span></dd>
            </dl>
        </section>

        <section class="vic-border">
            <dl>
                <dt>Age</dt>
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
                <dt>Race</dt>
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
                <dt>Gender</dt>
                <dd><span>Male</span> <span>{{ malePerp.length }}</span></dd>
                <dd><span>Female</span> <span>{{ femalePerp.length }}</span></dd>
                <dd><span>na</span> <span>{{ genderUnknownPerp.length }}</span></dd>
            </dl>
        </section>

        <section class="perp-border">
            <dl>
                <dt>Age</dt>
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
                <dt>Race</dt>
                <dd><span>Asian</span> <span>{{ asianPerp.length }}</span></dd>
                <dd><span>Black</span> <span>{{ blackPerp.length }}</span></dd>
                <dd><span>Black Hispanic</span> <span>{{ blackHispPerp.length }}</span></dd>
                <dd><span>White</span> <span>{{ whitePerp.length }}</span></dd>
                <dd><span>White Hispanic</span> <span>{{ whiteHispPerp.length }}</span></dd>
                <dd><span>na</span> <span>{{ raceUnknownPerp.length }}</span></dd>
            </dl>
        </section>

        <div class="heading">
            <h3>Map</h3>
        </div>

        <div id="map-area">
            <div ref="mapContainer" class="map-container"></div>
        </div>
    </main>
</template>

<style scoped>
</style>