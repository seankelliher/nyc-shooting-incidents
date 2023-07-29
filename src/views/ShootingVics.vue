<template>
    <section>

        <ViewIntro>
             <p>In the current calendar year, {{ (incidents.length.toLocaleString()) }} shooting incidents occured in New York City, with {{ (incidentsMurderFlag.length.toLocaleString()) }} fatalities.</p>
        </ViewIntro>

        <ViewTitle title="Shooting Victims"/>

        <div class="data-point">
            <h3>Age</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Under 18</td>
                        <td class="stat">{{ (getStat(ageUnder18)) }}</td>
                        <td class="percent">{{ (getPercent(ageUnder18)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">18 - 24</td>
                        <td class="stat">{{  (getStat(age18To24)) }}</td>
                        <td class="percent">{{ (getPercent(age18To24)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">25 - 44</td>
                        <td class="stat">{{ (getStat(age25To44)) }}</td>
                        <td class="percent">{{ (getPercent(age25To44)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">45 - 64</td>
                        <td class="stat">{{ (getStat(age45To64)) }}</td>
                        <td class="percent">{{ (getPercent(age45To64)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">65 plus</td>
                        <td class="stat">{{ (getStat(age65Up)) }}</td>
                        <td class="percent">{{ (getPercent(age65Up)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Unknown</td>
                        <td class="stat">{{ (getStat(ageUnknown)) }}</td>
                        <td class="percent">{{ (getPercent(ageUnknown)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="data-point">
            <h3>Sex</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Male</td>
                        <td class="stat">{{ (getStat(sexMale)) }}</td>
                        <td class="percent">{{ (getPercent(sexMale)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Female</td>
                        <td class="stat">{{ (getStat(sexFemale)) }}</td>
                        <td class="percent">{{ (getPercent(sexFemale)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Unknown</td>
                        <td class="stat">{{ (getStat(sexUnknown)) }}</td>
                        <td class="percent">{{ (getPercent(sexUnknown)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="data-point">
            <h3>Race</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Asian</td>
                        <td class="stat">{{ (getStat(raceAsian)) }}</td>
                        <td class="percent">{{ (getPercent(raceAsian)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Black</td>
                        <td class="stat">{{ (getStat(raceBlack)) }}</td>
                        <td class="percent">{{ (getPercent(raceBlack)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Black Hispanic</td>
                        <td class="stat">{{ (getStat(raceBlackHisp)) }}</td>
                        <td class="percent">{{ (getPercent(raceBlackHisp)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">White Hispanic</td>
                        <td class="stat">{{ (getStat(raceWhite)) }}</td>
                        <td class="percent">{{ (getPercent(raceWhite)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">White</td>
                        <td class="stat">{{ (getStat(raceWhiteHisp)) }}</td>
                        <td class="percent">{{ (getPercent(raceWhiteHisp)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Unknown</td>
                        <td class="stat">{{ (getStat(raceUnknown)) }}</td>
                        <td class="percent">{{ (getPercent(raceUnknown)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

    </section>
</template>

<script>
import ViewIntro from "../components/ViewIntro.vue";
import ViewTitle from "../components/ViewTitle.vue";
import {
    getMurderFlagShared,
    getAgeDataShared,
    getSexDataShared,
    getRaceDataShared,
    getStatShared,
    getPercentShared,
    getHighStatShared
} from "../shared.js";

export default {
    name: "ShootingVics",
    data() {
        return {
            incidents: [],
            incidentsMurderFlag: [],
            ageUnder18: [],
            age18To24: [],
            age25To44: [],
            age45To64: [],
            age65Up: [],
            ageUnknown: [],
            sexMale: [],
            sexFemale: [],
            sexUnknown: [],
            raceAsian: [],
            raceBlack: [],
            raceBlackHisp: [],
            raceWhite: [],
            raceWhiteHisp: [],
            raceUnknown: []
        };
    },
    created() {
        // Using locally -> http://localhost:4040/vics
        // Using remotely -> /vics
        // If localStorage is empty...
        // (1) fetch data. (2) Sort data. (3) Highlight highs.
        if (!localStorage.getItem("everyVic")) {
            fetch("/vic")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(`Error: ${response.status}, Data currently unavailable. Please try again later.`);
                    }
                })
                .then((data) => {
                    // Add to scenes array in data (above) AND localStorage.
                    this.incidents = data.vics;
                    const vicsString = JSON.stringify(data.vics);
                    localStorage.setItem("everyVic", vicsString);
                    this.getMurderFlag();
                    this.getAgeData("victims");
                    this.getSexData("victims");
                    this.getRaceData("victims");

                })
                .then(() => {
                    getHighStatShared(0);
                    getHighStatShared(1);
                    getHighStatShared(2);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        } else {
            // If localStorage is NOT empty...
            // (1) Get data from LS. (2) Sort data.
            // (3) Highlight highs done in mounted().
            const everyVic = localStorage.getItem("everyVic");
            const everyVicParse = JSON.parse(everyVic);
            this.incidents = everyVicParse;
            this.getMurderFlag();
            this.getAgeData("victims");
            this.getSexData("victims");
            this.getRaceData("victims");
        }
    },
    mounted() {
        // If localStorage is NOT empty, run functions to highlight highs.
        const local = (!localStorage.getItem("everyVic"));
        if (local === false) {
            getHighStatShared(0);
            getHighStatShared(1);
            getHighStatShared(2);
        }
    },
    methods: {
        getMurderFlag: getMurderFlagShared,
        getAgeData: getAgeDataShared,
        getSexData: getSexDataShared,
        getRaceData: getRaceDataShared,
        getStat: getStatShared,
        getPercent: getPercentShared
    },
    components: {
        ViewIntro,
        ViewTitle
    }
};
</script>
