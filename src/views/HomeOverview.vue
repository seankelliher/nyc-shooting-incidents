<template>
    <!--"Overview" serves as the Homepage.-->
    <p>Overview</p>

</template>

<script>

export default {
    name: "HomeOverview",
    data() {
        return {
            overviews: []
        };
    },
    created() {
        // Using locally -> http://localhost:4040/
        // Using remotely -> /
        // If localStorage is empty, fetch data.
        if (!localStorage.getItem("everyOverview")) {
            fetch("http://localhost:4040/")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                })
                .then((data) => {
                    // Add to overviews array in data (above) AND localStorage.
                    this.overviews = data.overviews;
                    console.log(data.overviews);
                    const overviewsString = JSON.stringify(data.overviews);
                    localStorage.setItem("everyTrend", overviewsString);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // If localStorage is not empty, get data from there.
            const everyOverview = localStorage.getItem("everyOverview");
            const everyOverviewParse = JSON.parse(everyOverview);
            this.overviews = everyOverviewParse;
        }
    },
    methods: {},
    components: {}
};
</script>
