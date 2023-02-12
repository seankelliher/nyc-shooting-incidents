<template>

    <p>Perpetrators</p>

</template>

<script>

export default {
    name: "ShootingPerps",
    data() {
        return {
            perps: []
        };
    },
    created() {
        // Using locally -> http://localhost:4040/perps
        // Using remotely -> /perps
        // If localStorage is empty, fetch data.
        if (!localStorage.getItem("everyPerp")) {
            fetch("http://localhost:4040/perps")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                })
                .then((data) => {
                    // Add to perps array in data (above) AND localStorage.
                    this.perps = data.perps;
                    console.log(data.perps);
                    const perpsString = JSON.stringify(data.perps);
                    localStorage.setItem("everyPerp", perpsString);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // If localStorage is not empty, get data from there.
            const everyPerp = localStorage.getItem("everyPerp");
            const everyPerpParse = JSON.parse(everyPerp);
            this.perps = everyPerpParse;
        }
    },
    methods: {},
    components: {}
};
</script>
