<script setup>
import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

const incidents = ref([]);

// Totals
const shootings = ref(0);
const murders = ref(0);

// Dates
const dates = ref([]);
const openDate = ref("");
const closeDate = ref("");

// Group to display
const display = ref("loc");

// Time of Day
const earlyMorning = ref(0);
const morning = ref(0);
const afternoon = ref(0);
const evening = ref(0);

// Borough
const bronx = ref(0);
const brooklyn = ref(0);
const manhattan = ref(0);
const queens = ref(0);
const staten = ref(0);

// Gender
const maleVic = ref(0);
const malePerp = ref(0);
const femaleVic = ref(0);
const femalePerp = ref(0);
const genderUnknownVic = ref(0);
const genderUnknownPerp = ref(0);

// Age
const ageUnder18Vic = ref(0);
const ageUnder18Perp = ref(0);
const age18To24Vic = ref(0);
const age18To24Perp = ref(0);
const age25To44Vic = ref(0);
const age25To44Perp = ref(0);
const age45To64Vic = ref(0);
const age45To64Perp = ref(0);
const age65UpVic = ref(0);
const age65UpPerp = ref(0);
const ageUnknownVic = ref(0);
const ageUnknownPerp = ref(0);

// Race
const asianVic = ref(0);
const asianPerp = ref(0);
const blackVic = ref(0);
const blackPerp = ref(0);
const blackHispVic = ref(0);
const blackHispPerp = ref(0);
const whiteVic = ref(0);
const whitePerp = ref(0);
const whiteHispVic = ref(0);
const whiteHispPerp = ref(0);
const raceUnknownVic = ref(0);
const raceUnknownPerp = ref(0);

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
        shootings.value += 1;
        if (incident.statistical_murder_flag === "Y") {
            murders.value += 1;
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
            earlyMorning.value += 1;
        } else if (incident.occur_time >= "06:00:00" && incident.occur_time <= "11:59:00") {
            morning.value += 1;
        } else if (incident.occur_time >= "12:00:00" && incident.occur_time <= "17:59:00") {
            afternoon.value += 1;
        } else if (incident.occur_time >= "18:00:00" && incident.occur_time <= "23:59:00") {
            evening.value += 1;
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

function getGender(category) {
    let expr;

    incidents.value.map((incident) => {
        if (category === "vic") {
            expr = incident.vic_sex;

            switch(expr) {
            case "M":
                maleVic.value += 1;
                break;
            case "F":
                femaleVic.value += 1;
                break;
            default:
                genderUnknownVic.value += 1;
            }
        } else if (category === "perp") {
            expr = incident.perp_sex;

            switch(expr) {
            case "M":
                malePerp.value += 1;
                break;
            case "F":
                femalePerp.value += 1;
                break;
            default:
                genderUnknownPerp.value += 1;
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
                ageUnder18Vic.value += 1;
                break;
            case "18-24":
                age18To24Vic.value += 1;
                break;
            case "25-44":
                age25To44Vic.value += 1;
                break;
            case "45-64":
                age45To64Vic.value += 1;
                break;
            case "65+":
                age65UpVic.value += 1;
                break;
            default:
                ageUnknownVic.value += 1;
            }
        } else if (category === "perp") {
            expr = incident.perp_age_group;

            switch(expr) {
            case "<18":
                ageUnder18Perp.value += 1;
                break;
            case "18-24":
                age18To24Perp.value += 1;
                break;
            case "25-44":
                age25To44Perp.value += 1;
                break;
            case "45-64":
                age45To64Perp.value += 1;
                break;
            case "65+":
                age65UpPerp.value += 1;
                break;
            default:
                ageUnknownPerp.value += 1;
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
                asianVic.value += 1;
                break;
            case "BLACK":
                blackVic.value += 1;
                break;
            case "BLACK HISPANIC":
                blackHispVic.value += 1;
                break;
            case "WHITE":
                whiteVic.value += 1;
                break;
            case "WHITE HISPANIC":
                whiteHispVic.value += 1;
                break;
            default:
                raceUnknownVic.value += 1;
            }
        } else if (category === "perp") {
            expr = incident.perp_race;

            switch(expr) {
            case "ASIAN / PACIFIC ISLANDER":
                asianPerp.value += 1;
                break;
            case "BLACK":
                blackPerp.value += 1;
                break;
            case "BLACK HISPANIC":
                blackHispPerp.value += 1;
                break;
            case "WHITE":
                whitePerp.value += 1;
                break;
            case "WHITE HISPANIC":
                whiteHispPerp.value += 1;
                break;
            default:
                raceUnknownPerp.value += 1;
            }
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

function updateDisplay(item) {
    display.value = item;
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
            new mapboxgl.Marker({ color: "#009ddc", scale: 0.75 })
                .setLngLat([`${incident.geocoded_column.coordinates[0]}`, `${incident.geocoded_column.coordinates[1]}`])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<dl>
                                <dt>${incident.boro}</dt>
                                <dd>Precinct: ${incident.precinct}</dd>
                                <dd>${formatDate(incident.occur_date.substring(0, 10))}</dd>
                                <dd>${formatTime(incident.occur_time.substring(0, 5))}</dd>
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
        <section class="grey-border">
            <dl>
                <dt>Totals</dt>
                <dd><span>Shootings</span> <span>{{ shootings.toLocaleString() }}</span></dd>
                <dd><span>Fatalities</span> <span>{{ murders }}</span></dd>
            </dl>
        </section>

        <div class="intro grey-border">
            <p>Data compiled by NYPD and available at <a href="https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Year-To-Date-/5ucz-vwe8/about_data" target="_blank">NYC Open Data</a>. Data is for the current year and is updated at the end of each quarter. You are now viewing data from {{ openDate }} to {{ closeDate }}. Shooting incidents are considered unique. For example, if a perpetrator shoots three people, it is considered three incidents.</p>
        </div>

        <nav>
            <button
                @click="updateDisplay('loc')"
                :class="{selected: display ===  'loc'}"
            >
                Time &amp; Locations
            </button>
            <button
                @click="updateDisplay('vic')"
                :class="{selected: display ===  'vic'}"
            >
                Victims
            </button>
            <button
                @click="updateDisplay('perp')"
                :class="{selected: display ===  'perp'}"
            >
                Perps
            </button>
        </nav>

        <section
            v-if="display === 'loc'"
            class="blue-border"
        >
            <dl>
                <dt>Time of Day</dt>
                <dd><span>12am - 5:59am</span> <span>{{ earlyMorning }}</span></dd>
                <dd><span>6am - 11:59am</span> <span>{{ morning }}</span></dd>
                <dd><span>12pm - 5:59pm</span> <span>{{ afternoon }}</span></dd>
                <dd><span>6pm - 11:59pm</span> <span>{{ evening }}</span></dd>
            </dl>
        </section>

        <section
            v-if="display === 'loc'"
            class="blue-border"
        >
            <dl>
                <dt>Borough</dt>
                <dd><span>Bronx</span> <span>{{ bronx }}</span></dd>
                <dd><span>Brooklyn</span> <span>{{ brooklyn }}</span></dd>
                <dd><span>Manhattan</span> <span>{{ manhattan }}</span></dd>
                <dd><span>Queens</span> <span>{{ queens }}</span></dd>
                <dd><span>Staten Island</span> <span>{{ staten }}</span></dd>
            </dl>
        </section>

        <section
            v-if="display === 'loc'"
            class="blue-border"
        >
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
        </section>

        <section
            v-if="display === 'vic'"
            class="blue-border"
        >
            <dl>
                <dt>Gender</dt>
                <dd><span>Male</span> <span>{{ maleVic }}</span></dd>
                <dd><span>Female</span> <span>{{ femaleVic }}</span></dd>
                <dd><span>na</span> <span>{{ genderUnknownVic }}</span></dd>
            </dl>
        </section>

        <section
            v-if="display === 'vic'"
            class="blue-border"
        >
            <dl>
                <dt>Age</dt>
                <dd><span>under 18</span> <span>{{ ageUnder18Vic }}</span></dd>
                <dd><span>18 - 24</span> <span>{{ age18To24Vic }}</span></dd>
                <dd><span>25 - 44</span> <span>{{ age25To44Vic }}</span></dd>
                <dd><span>45 - 64</span> <span>{{ age45To64Vic }}</span></dd>
                <dd><span>65 plus</span> <span> {{ age65UpVic }}</span></dd>
                <dd><span>na</span> <span>{{ ageUnknownVic }}</span></dd>
            </dl>
        </section>

        <section
            v-if="display === 'vic'"
            class="blue-border"
        >
            <dl>
                <dt>Race</dt>
                <dd><span>Asian</span> <span>{{ asianVic }}</span></dd>
                <dd><span>Black</span> <span>{{ blackVic }}</span></dd>
                <dd><span>Black Hispanic</span> <span>{{ blackHispVic }}</span></dd>
                <dd><span>White</span> <span>{{ whiteVic }}</span></dd>
                <dd><span>White Hispanic</span> <span>{{ whiteHispVic }}</span></dd>
                <dd><span>na</span> <span>{{ raceUnknownVic }}</span></dd>
            </dl>
        </section>

        <section
            v-if="display === 'perp'"
            class="blue-border"
        >
            <dl>
                <dt>Gender</dt>
                <dd><span>Male</span> <span>{{ malePerp }}</span></dd>
                <dd><span>Female</span> <span>{{ femalePerp }}</span></dd>
                <dd><span>na</span> <span>{{ genderUnknownPerp }}</span></dd>
            </dl>
        </section>

        <section
            v-if="display === 'perp'"
            class="blue-border"
        >
            <dl>
                <dt>Age</dt>
                <dd><span>under 18</span> <span>{{ ageUnder18Perp }}</span></dd>
                <dd><span>18 - 24</span> <span>{{ age18To24Perp }}</span></dd>
                <dd><span>25 - 44</span> <span>{{ age25To44Perp }}</span></dd>
                <dd><span>45 - 64</span> <span>{{ age45To64Perp }}</span></dd>
                <dd><span>65 plus</span> <span>{{ age65UpPerp }}</span></dd>
                <dd><span>na</span> <span>{{ ageUnknownPerp }}</span></dd>
            </dl>
        </section>

        <section
            v-if="display === 'perp'"
            class="blue-border"
        >
            <dl>
                <dt>Race</dt>
                <dd><span>Asian</span> <span>{{ asianPerp }}</span></dd>
                <dd><span>Black</span> <span>{{ blackPerp }}</span></dd>
                <dd><span>Black Hispanic</span> <span>{{ blackHispPerp }}</span></dd>
                <dd><span>White</span> <span>{{ whitePerp }}</span></dd>
                <dd><span>White Hispanic</span> <span>{{ whiteHispPerp }}</span></dd>
                <dd><span>na</span> <span>{{ raceUnknownPerp }}</span></dd>
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