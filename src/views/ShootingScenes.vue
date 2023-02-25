<template>
    <section>

        <ViewIntro>
             <p>In the past 12 months, {{ (incidents.length.toLocaleString()) }} shooting incidents occured in New York City, with {{ (incidentsMurderFlag.length.toLocaleString()) }} fatalities.</p>
        </ViewIntro>

        <ViewTitle title="Shooting Scenes"/>

        <div class="data-point">
            <h3>Time</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">12AM - 5:59AM</td>
                        <td class="stat">{{ (getStat(timePeriod1)) }}</td>
                        <td class="percent">{{ (getPercent(timePeriod1)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">6AM - 11:59AM</td>
                        <td class="stat">{{  (getStat(timePeriod2)) }}</td>
                        <td class="percent">{{ (getPercent(timePeriod2)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">12PM - 5:59PM</td>
                        <td class="stat">{{ (getStat(timePeriod3)) }}</td>
                        <td class="percent">{{ (getPercent(timePeriod3)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">6PM - 11:59PM</td>
                        <td class="stat">{{ (getStat(timePeriod4)) }}</td>
                        <td class="percent">{{ (getPercent(timePeriod4)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="data-point">
            <h3>Borough</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Bronx</td>
                        <td class="stat">{{ (getStat(boroBronx)) }}</td>
                        <td class="percent">{{ (getPercent(boroBronx)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Brooklyn</td>
                        <td class="stat">{{  (getStat(boroBrooklyn)) }}</td>
                        <td class="percent">{{ (getPercent(boroBrooklyn)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Manhattan</td>
                        <td class="stat">{{ (getStat(boroManhattan)) }}</td>
                        <td class="percent">{{ (getPercent(boroManhattan)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Queens</td>
                        <td class="stat">{{ (getStat(boroQueens)) }}</td>
                        <td class="percent">{{ (getPercent(boroQueens)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Staten Island</td>
                        <td class="stat">{{ (getStat(boroStaten)) }}</td>
                        <td class="percent">{{ (getPercent(boroStaten)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="data-point">
            <h3>Inside vs Outside</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Inside</td>
                        <td class="stat">{{ (getStat(descInside)) }}</td>
                        <td class="percent">{{ (getPercent(descInside)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Outside</td>
                        <td class="stat">{{  (getStat(descOutside)) }}</td>
                        <td class="percent">{{ (getPercent(descOutside)) }}%</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="data-point">
            <h3>Classification</h3>

            <table>
                <tbody>
                    <tr>
                        <td class="group">Commercial</td>
                        <td class="stat">{{ (getStat(classCommercial)) }}</td>
                        <td class="percent">{{ (getPercent(classCommercial)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Dwelling</td>
                        <td class="stat">{{  (getStat(classDwelling)) }}</td>
                        <td class="percent">{{ (getPercent(classDwelling)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Housing</td>
                        <td class="stat">{{  (getStat(classHousing)) }}</td>
                        <td class="percent">{{ (getPercent(classHousing)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Parking Lot</td>
                        <td class="stat">{{ (getStat(classParkingLot)) }}</td>
                        <td class="percent">{{ (getPercent(classParkingLot)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Playground</td>
                        <td class="stat">{{  (getStat(classPlayground)) }}</td>
                        <td class="percent">{{ (getPercent(classPlayground)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Street</td>
                        <td class="stat">{{  (getStat(classStreet)) }}</td>
                        <td class="percent">{{ (getPercent(classStreet)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Transit</td>
                        <td class="stat">{{ (getStat(classTransit)) }}</td>
                        <td class="percent">{{ (getPercent(classTransit)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Vehicle</td>
                        <td class="stat">{{  (getStat(classVehicle)) }}</td>
                        <td class="percent">{{ (getPercent(classVehicle)) }}%</td>
                    </tr>
                    <tr>
                        <td class="group">Other</td>
                        <td class="stat">{{  (getStat(classOther)) }}</td>
                        <td class="percent">{{ (getPercent(classOther)) }}%</td>
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
    getTimeDataShared,
    getBoroDataShared,
    getDescDataShared,
    getClassDataShared,
    getMurderFlagShared,
    getStatShared,
    getPercentShared
} from "../shared.js";

export default {
    name: "ShootingScenes",
    data() {
        return {
            incidents: [],
            timePeriod1: [],
            timePeriod2: [],
            timePeriod3: [],
            timePeriod4: [],
            boroBronx: [],
            boroBrooklyn: [],
            boroManhattan: [],
            boroQueens: [],
            boroStaten: [],
            descInside: [],
            descOutside: [],
            classCommercial: [],
            classDwelling: [],
            classHousing: [],
            classParkingLot: [],
            classPlayground: [],
            classStreet: [],
            classTransit: [],
            classVehicle: [],
            classOther: [],
            incidentsMurderFlag: []
        };
    },
    created() {
        // Using locally -> http://localhost:4040/scenes
        // Using remotely -> /scenes
        // If localStorage is empty, fetch data.
        if (!localStorage.getItem("everyScene")) {
            fetch("http://localhost:4040/scenes")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        Promise.reject(response.status);
                    }
                })
                .then ((data) => {
                    // Add to scenes array in data (above) AND localStorage.
                    this.incidents = data.scenes;
                    //console.log(this.scenes);
                    const scenesString = JSON.stringify(data.scenes);
                    localStorage.setItem("everyScene", scenesString);
                    this.getTimeData();
                    this.getBoroData();
                    this.getDescData(); // Inside vs Outside.
                    this.getClassData(); // eg - Housing, Playground, Transit.
                    this.getMurderFlag();
                })
                .catch((error) => {
                    console.log(error);
                });   
        } else {
            // If localStorage is not empty, get data from there.
            const everyScene = localStorage.getItem("everyScene");
            const everySceneParse = JSON.parse(everyScene);
            this.incidents = everySceneParse;
            this.getTimeData();
            this.getBoroData();
            this.getDescData(); // Inside vs Outside.
            this.getClassData(); // eg - Housing, Playground, Transit.
            this.getMurderFlag();
        }
    },
    methods: {
        getTimeData: getTimeDataShared,
        getBoroData: getBoroDataShared,
        getDescData: getDescDataShared,
        getClassData: getClassDataShared,
        getMurderFlag: getMurderFlagShared,
        getStat: getStatShared,
        getPercent: getPercentShared
    },
    components: {
        ViewIntro,
        ViewTitle
    }
};
</script>
