<template>
    <section>

        <ViewIntro>
             <p>In the past 12 months, {{ (incidents.length.toLocaleString()) }} shooting incidents occured in New York City, with {{ (incidentsMurderFlag.length.toLocaleString()) }} fatalities.</p>
        </ViewIntro>

        <ViewTitle title="About the Data"/>

        <div class="data-point">
            <p>Data on shooting incidents in New York City is compiled by the New York City Police Department (NYPD) and made available though NYC Open Data.</p>
        </div>

        <div class="data-point">
            <p>This data is for a 12-month period beginning on {{ (this.getDateData()) }}.</p>
        </div>

        <div class="data-point">
            <p>NYPD updates this data quarterly.</p>
        </div>

        <div class="data-point">
            <p>To maintain consistency across categories, each shooting incident is considered unique. For example, if a perpetrator shoots three people, this is considered three incidents.</p>
        </div>

    </section>
</template>

<script>
import ViewIntro from "../components/ViewIntro.vue";
import ViewTitle from "../components/ViewTitle.vue";
import {
    getMurderFlagShared,
    getStatShared,
    getPercentShared
} from "../shared.js";

export default {
    name: "ShootingTrends",
    data() {
        return {
            incidents: [],
            incidentsOccurDate: [],
            incidentsMurderFlag: []
        };
    },
    created() {
        // Using locally -> http://localhost:4040/
        // Using remotely -> /
        // If localStorage is empty...
        // (1) fetch data. (2) Sort data.
        if (!localStorage.getItem("everyTrend")) {
            fetch("http://localhost:4040/")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                })
                .then((data) => {
                    // Add to trends array in data (above) AND localStorage.
                    this.incidents = data.trends;
                    const trendsString = JSON.stringify(data.trends);
                    localStorage.setItem("everyTrend", trendsString);
                    this.getDateData();
                    this.getMurderFlag();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // If localStorage is NOT empty...
            // (1) Get data from LS. (2) Sort data.
            const everyTrend = localStorage.getItem("everyTrend");
            const everyTrendParse = JSON.parse(everyTrend);
            this.incidents = everyTrendParse;
            this.getDateData();
            this.getMurderFlag();
        }
    },
    methods: {
        getDateData() {
            this.incidents.map((incident) => {
                this.incidentsOccurDate.push(incident.occur_date);
            });

            // Below ensures first day of the 12-month period is "01"
            // even if no shooting incidents occur on that day.
            let fullDate;
            const dayOfMonth = this.incidentsOccurDate[0].substring(5,7);

            if (dayOfMonth !== "01") {
                const dateAsArray = this.incidentsOccurDate[0].split("");
                dateAsArray[5] = "0";
                dateAsArray[6] = "1";
                fullDate = dateAsArray.join("");
            } else {
                fullDate = this.incidentsOccurDate[0];
            }
   
            // Creates date to display as "Saturday, January 1, 2022".
            const realDate = new Date(fullDate);
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            return realDate.toLocaleDateString(undefined, options);
        },
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
