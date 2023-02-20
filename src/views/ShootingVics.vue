<template>
    <section>

        <ViewIntro>
             <p>In the past 12 months, {{ (vics.length.toLocaleString()) }} shooting incidents occured in New York City, with {{ (vicsMurderFlag.length.toLocaleString()) }} fatalities.</p>
        </ViewIntro>

        <ViewTitle title="Shooting Victims"/>

        <div class="data-point">
            <h3>By Age</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Under 18:</td>
                        <td class="stat">{{ (getStat(vicsAgeUnder18)) }}</td>
                        <td class="percent">{{ (getPercent(vicsAgeUnder18)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">18 - 24:</td>
                        <td class="stat">{{  (getStat(vicsAge18To24)) }}</td>
                        <td class="percent">{{ (getPercent(vicsAge18To24)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">25 - 44:</td>
                        <td class="stat">{{ (getStat(vicsAge25To44)) }}</td>
                        <td class="percent">{{ (getPercent(vicsAge25To44)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">45 - 64:</td>
                        <td class="stat">{{ (getStat(vicsAge45To64)) }}</td>
                        <td class="percent">{{ (getPercent(vicsAge45To64)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">65 plus:</td>
                        <td class="stat">{{ (getStat(vicsAge65Up)) }}</td>
                        <td class="percent">{{ (getPercent(vicsAge65Up)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Unknown:</td>
                        <td class="stat">{{ (getStat(vicsAgeUnknown)) }}</td>
                        <td class="percent">{{ (getPercent(vicsAgeUnknown)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="data-point">
            <h3>By Sex</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Male:</td>
                        <td class="stat">{{ (getStat(vicsSexMale)) }}</td>
                        <td class="percent">{{ (getPercent(vicsSexMale)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Female:</td>
                        <td class="stat">{{ (getStat(vicsSexFemale)) }}</td>
                        <td class="percent">{{ (getPercent(vicsSexFemale)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Unknown:</td>
                        <td class="stat">{{ (getStat(vicsSexUnknown)) }}</td>
                        <td class="percent">{{ (getPercent(vicsSexUnknown)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="data-point">
            <h3>By Race</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Asian:</td>
                        <td class="stat">{{ (getStat(vicsRaceAsian)) }}</td>
                        <td class="percent">{{ (getPercent(vicsRaceAsian)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Black:</td>
                        <td class="stat">{{ (getStat(vicsRaceBlack)) }}</td>
                        <td class="percent">{{ (getPercent(vicsRaceBlack)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Black Hispanic:</td>
                        <td class="stat">{{ (getStat(vicsRaceBlackHisp)) }}</td>
                        <td class="percent">{{ (getPercent(vicsRaceBlackHisp)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">White Hispanic:</td>
                        <td class="stat">{{ (getStat(vicsRaceWhite)) }}</td>
                        <td class="percent">{{ (getPercent(vicsRaceWhite)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">White:</td>
                        <td class="stat">{{ (getStat(vicsRaceWhiteHisp)) }}</td>
                        <td class="percent">{{ (getPercent(vicsRaceWhiteHisp)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Unknown:</td>
                        <td class="stat">{{ (getStat(vicsRaceUnknown)) }}</td>
                        <td class="percent">{{ (getPercent(vicsRaceUnknown)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

    </section>

</template>

<script>
import ViewIntro from "../components/ViewIntro.vue";
import ViewTitle from "../components/ViewTitle.vue";
//import foo from "../shared.js";
import {
    getMurderFlagShared,
    getAgeDataShared,
    getSexDataShared,
    getRaceDataShared,
    getStatShared,
    getPercentShared
} from "../shared.js";

export default {
    name: "ShootingVics",
    data() {
        return {
            vics: [],
            vicsMurderFlag: [],
            vicsAgeUnder18: [],
            vicsAge18To24: [],
            vicsAge25To44: [],
            vicsAge45To64: [],
            vicsAge65Up: [],
            vicsSexMale: [],
            vicsSexFemale: [],
            vicsSexUnknown: [],
            vicsAgeUnknown: [],
            vicsRaceAsian: [],
            vicsRaceBlack: [],
            vicsRaceBlackHisp: [],
            vicsRaceWhite: [],
            vicsRaceWhiteHisp: [],
            vicsRaceUnknown: []
        };
    },
    created() {
        // Using locally -> http://localhost:4040/vics
        // Using remotely -> /vics
        // If localStorage is empty, fetch data.
        if (!localStorage.getItem("everyVic")) {
            fetch("http://localhost:4040/vics")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        Promise.reject(response.status);
                    }
                })
                .then((data) => {
                    // Add to scenes array in data (above) AND localStorage.
                    this.vics = data.vics;
                    console.log(data.vics);
                    const vicsString = JSON.stringify(data.vics);
                    localStorage.setItem("everyVic", vicsString);
                    this.getMurderFlag();
                    this.getAgeData();
                    this.getSexData();
                    this.getRaceData();

                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // If localStorage is not empty, get data from there.
            const everyVic = localStorage.getItem("everyVic");
            const everyVicParse = JSON.parse(everyVic);
            this.vics = everyVicParse;
            this.getMurderFlag();
            this.getAgeData();
            this.getSexData();
            this.getRaceData();
        }
    },
    /*mount() {
        getStatShared();
    },*/
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
