<template>
    <section>

        <ViewIntro>
             <p>In the current calendar year, {{ (incidents.length.toLocaleString()) }} shooting incidents occured in New York City, with {{ (incidentsMurderFlag.length.toLocaleString()) }} fatalities.</p>
        </ViewIntro>

        <ViewTitle title="About the Data"/>

        <div class="data-point">
            <p>Data on shooting incidents in New York City is compiled by the New York City Police Department (NYPD) and made available though NYC Open Data.</p>
        </div>

        <div class="data-point">
            <p>This data is for the current calendar year beginning on {{ (termStartDate[0]) }}.</p>
        </div>

        <div class="data-point">
            <p>NYPD updates this data after the end of each quarter.</p>
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
            incidentsMurderFlag: [],
            termStartDate: []
        };
    },
    created() {
        // Using locally -> http://localhost:4040/
        // Using remotely -> /trend ("/" does not work)
        // If localStorage is empty...
        // (1) fetch data. (2) Sort data.
        if (!localStorage.getItem("everyTrend")) {
            fetch("/trend")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(`Error: ${response.status}, Data currently unavailable. Please try again later.`);
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
                    alert(error);
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
            // Below ensures first day of the 12-month period is "01".
            // even if no shooting incidents occured on that day.
            const firstDate = this.incidents[0].occur_date;
            const firstDateDay = firstDate.substring(8,10);
            let firstDayOfTerm;

            if (firstDateDay !== "01") {
                const firstDateAsArray = firstDate.split("");
                firstDateAsArray[8] = "0";
                firstDateAsArray[9] = "1";
                firstDayOfTerm = firstDateAsArray.join("");
            } else {
                firstDayOfTerm = firstDate;
            }

            // Creates date to display as "Saturday, January 1, 2022".
            const dateToDisplay = new Date(firstDayOfTerm);
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            const dateToDisplayFormatted = dateToDisplay.toLocaleDateString(undefined, options);
            this.termStartDate.push(dateToDisplayFormatted);
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
