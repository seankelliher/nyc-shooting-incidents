<script setup>
import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

const incidents = ref([]);

// Totals
const shootings = ref(0);

// Dates
const dates = ref([]);
const openDate = ref("");
const closeDate = ref("");

// Group to display
const display = ref("vic");

// Time of Day
const timeOfDay1 = ref(0);
const timeOfDay2 = ref(0);
const timeOfDay3 = ref(0);
const timeOfDay4 = ref(0);
const timeOfDay5 = ref(0);
const timeOfDay6 = ref(0);
const timeOfDay7 = ref(0);
const timeOfDay8 = ref(0);

// Borough
const bronx = ref(0);
const brooklyn = ref(0);
const manhattan = ref(0);
const queens = ref(0);
const staten = ref(0);

// Location
const commercial = ref(0);
const dwelling = ref(0);
const housing = ref(0);
const parkingLot = ref(0);
const playground = ref(0);
const street = ref(0);
const transit = ref(0);
const vehicle = ref(0);
const otherLocation = ref(0);

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
        getLocation();
        createMap();
    }
});

function getTotals() {
    incidents.value.map((incident) => {
        shootings.value += 1;
    });
}

// Sets the open/close dates in the "year-t0-date totals" box.
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
        if (incident.occur_time >= "00:00:00" && incident.occur_time <= "02:59:00") {
            timeOfDay1.value += 1;
        } else if (incident.occur_time >= "03:00:00" && incident.occur_time <= "05:59:00") {
            timeOfDay2.value += 1;
        } else if (incident.occur_time >= "06:00:00" && incident.occur_time <= "08:59:00") {
            timeOfDay3.value += 1;
        } else if (incident.occur_time >= "09:00:00" && incident.occur_time <= "11:59:00") {
            timeOfDay4.value += 1;
        } else if (incident.occur_time >= "12:00:00" && incident.occur_time <= "14:59:00") {
            timeOfDay5.value += 1;
        } else if (incident.occur_time >= "15:00:00" && incident.occur_time <= "17:59:00") {
            timeOfDay6.value += 1;
        } else if (incident.occur_time >= "18:00:00" && incident.occur_time <= "20:59:00") {
            timeOfDay7.value += 1;
        } else if (incident.occur_time >= "21:00:00" && incident.occur_time <= "23:59:00") {
            timeOfDay8.value += 1;
        }
    });
}

function getBorough() {
    incidents.value.map((incident) => {

        const expr = incident.boro;
        switch(expr) {
        case "BRONX":
            bronx.value += 1;
            break;
        case "BROOKLYN":
            brooklyn.value += 1;
            break;
        case "MANHATTAN":
            manhattan.value += 1;
            break;
        case "QUEENS":
            queens.value += 1;
            break;
        case "STATEN ISLAND":
            staten.value += 1;
            break;
        }
    });
}

function getLocation() {
    incidents.value.map((incident) => {

        const expr = incident.loc_classfctn_desc;
        switch(expr) {
        case "COMMERICAL":
            commercial.value += 1;
            break;
        case "DWELLING":
            dwelling.value += 1;
            break;
        case "HOUSING":
            housing.value += 1;
            break;
        case "PARKING LOT":
            parkingLot.value += 1;
            break;
        case "PLAYGROUND":
            playground.value += 1;
            break;
        case "STREET":
            street.value += 1;
            break;
        case "TRANSIT":
            transit.value += 1;
            break;
        case "VEHICLE":
            vehicle.value += 1;
            break;
        default:
            otherLocation.value += 1;
        }
    });
}

// Formats date in map pop-up from "yyyy-mm-dd" to May 17, 2023.
function formatDate(dt) {
    const year = dt.substring(0, 4);
    const month = dt.substring(5, 7);
    const day = dt.substring(8, 10);
    let monthStyled;
    let dayStyled;

    switch(month) {
    case "01":
        monthStyled = "January";
        break;
    case "02":
        monthStyled = "February";
        break;
    case "03":
        monthStyled = "March";
        break;
    case "04":
        monthStyled = "April";
        break;
    case "05":
        monthStyled = "May";
        break;
    case "06":
        monthStyled = "June";
        break;
    case "07":
        monthStyled = "July";
        break;
    case "08":
        monthStyled = "August";
        break;
    case "09":
        monthStyled = "September";
        break;
    case "10":
        monthStyled = "October";
        break;
    case "11":
        monthStyled = "November";
        break;
    case "12":
        monthStyled = "December";
        break;
    default:
        monthStyled = "unknown";
    }

    if (Number(day) < 10) {
        dayStyled = day.substring(1, 3);
    } else {
        dayStyled = day;
    }
    return `${monthStyled} ${dayStyled}, ${year}`;
}

// Formats time in map pop-up from 24-hour to 12-hour (am/pm) time.
function formatTime(tm) {
    const hour = tm.substring(0, 2);
    let hourStyled;
    const minute = tm.substring(3, 5);
    let meridiem;

    if (hour >= 13) {
        hourStyled = hour  - 12;
    } else if (hour < 10) {
        hourStyled = hour.substring(1, 3);
    } else {
        hourStyled = hour;
    }

    if (hour >= 12) {
        meridiem = "PM";
    } else {
        meridiem = "AM";
    }
    return `${hourStyled}:${minute} ${meridiem}`;
}

/* function updateDisplay(item) {
    display.value = item;
} */

function createMap() {
    // Read only, restricted to requests from single URL.
    mapboxgl.accessToken = "pk.eyJ1Ijoic2s1NjQ2NzMiLCJhIjoiY2x1eWh2cHJnMGdiNjJrcXFuM2txZnE5MiJ9.0T3dUBTc2gYig63D4nmCqw";

    map = new mapboxgl.Map({
        container: mapContainer.value,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-73.840, 40.735],
        zoom: 10.0
    });

    // A small number of shooting incidents do not have geolocation data.
    // If statement removes those and prevents errors.
    incidents.value.map((incident) => {
        if (!isNaN(incident.longitude) && !isNaN(incident.latitude)) {
            new mapboxgl.Marker({ color: "#009ddc", scale: 0.75 })
                .setLngLat([incident.latitude, incident.longitude])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<dl>
                                <dt>${incident.boro}</dt>
                                <dd>Precinct: ${incident.precinct}</dd>
                                <dd>${formatDate(incident.occur_date.substring(0, 10))}</dd>
                                <dd>${formatTime(incident.occur_time.substring(0, 5))}</dd>
                            </dl>`
                        )
                )
                .addTo(map);
        }
    });
}
</script>

<template>
    <div class="boxes-container">
        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>
        <div class="box intro-box">
            <dl>
                <dt>Available year-to-date shootings</dt>
                <dd>{{ openDate }} to {{ closeDate }}</dd>
                <dd class="intro-border"><span>Shootings</span> <span>{{ shootings.toLocaleString() }}</span></dd>
            </dl>
        </div>

        <div class="box intro-box">
            <p>The NYPD tracks shootings in NYC and releases information for the current year at the end of each quarter. More at <a href="https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Year-To-Date-/5ucz-vwe8/about_data" target="_blank">NYC Open Data</a>. </p>
        </div>

        <div class="box intro-box">
            <p>Shooting incidents are considered unique. For example, if a perpetrator shoots three people, it is considered three incidents.</p>
        </div>
    </div>

    <div class="boxes-container">
        <div class="badge-container">
            <div class="badge">
                Sites &amp; Times
            </div>
        </div>

        <div class="box data-box">
            <dl>
                <dt>Time of Day</dt>
                <dd><span>12 AM - 2:59 AM</span> <span>{{ timeOfDay1 }}</span></dd>
                <dd><span>3 AM - 5:59 AM</span> <span>{{ timeOfDay2 }}</span></dd>
                <dd><span>6 AM - 8:59 AM</span> <span>{{ timeOfDay3 }}</span></dd>
                <dd><span>9 AM - 11:59 AM</span> <span>{{ timeOfDay4}}</span></dd>
                <dd><span>12 PM - 2:59 PM</span> <span>{{ timeOfDay5 }}</span></dd>
                <dd><span>3 PM - 5:59 PM</span> <span>{{ timeOfDay6}}</span></dd>
                <dd><span>6 PM - 8:59 PM</span> <span>{{ timeOfDay7 }}</span></dd>
                <dd><span>9 PM - 11:59 PM</span> <span>{{ timeOfDay8 }}</span></dd>
            </dl>
        </div>

        <div class="box data-box">
            <dl>
                <dt>Borough</dt>
                <dd><span>Bronx</span> <span>{{ bronx }}</span></dd>
                <dd><span>Brooklyn</span> <span>{{ brooklyn }}</span></dd>
                <dd><span>Manhattan</span> <span>{{ manhattan }}</span></dd>
                <dd><span>Queens</span> <span>{{ queens }}</span></dd>
                <dd><span>Staten Island</span> <span>{{ staten }}</span></dd>
            </dl>
        </div>

        <div class="box data-box">
            <dl>
                <dt>Location Type</dt>
                <dd><span>Commercial</span> <span>{{ commercial }}</span></dd>
                <dd><span>Dwelling</span> <span>{{ dwelling }}</span></dd>
                <dd><span>Housing</span> <span>{{ housing }}</span></dd>
                <dd><span>Parking Lot</span> <span>{{ parkingLot }}</span></dd>
                <dd><span>Playground</span> <span>{{ playground }}</span></dd>
                <dd><span>Street</span> <span>{{ street }}</span></dd>
                <dd><span>Transit</span> <span>{{ transit }}</span></dd>
                <dd><span>Vehicle</span> <span>{{ vehicle }}</span></dd>
                <dd><span>Other Location</span> <span>{{ otherLocation }}</span></dd>
            </dl>
        </div>
    </div>

    <div class="boxes-container">
        <div class="badge-container">
            <div class="badge">Map</div>
        </div>

        <div id="map-area">
            <div ref="mapContainer" class="map-container"></div>
        </div>
    </div>
</template>

<style scoped>
</style>