<template>
    <section>
        <ViewTitle title="Shooting Trends"/>

        <div class="data-point">
            <ul
                v-for="trend in trends"
                :key="trend.incident_key"
            >
                <li>{{ trend.incident_key }}</li>

            </ul>
        </div>

        <div class="data-point">
            <p>Data Point 2</p>
        </div>

        <div class="data-point">
            <p>Data Point 3</p>
        </div>

        <div class="data-point">
            <p>Data Point 4</p>
        </div>
    </section>

</template>

<script>
import ViewTitle from "../components/ViewTitle.vue";

export default {
    name: "ShootingTrends",
    data() {
        return {
            trends: []
        };
    },
    created() {
        // Using locally -> http://localhost:4040/
        // Using remotely -> /
        // If localStorage is empty, fetch data.
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
                    this.trends = data.trends;
                    console.log(data.trends);
                    const trendsString = JSON.stringify(data.trends);
                    localStorage.setItem("everyTrend", trendsString);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // If localStorage is not empty, get data from there.
            const everyTrend = localStorage.getItem("everyTrend");
            const everyTrendParse = JSON.parse(everyTrend);
            this.trends = everyTrendParse;
        }
    },
    methods: {},
    components: {
        ViewTitle
    }
};
</script>
