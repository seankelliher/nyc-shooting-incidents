<template>

    <p>Victims</p>

</template>

<script>

export default {
    name: "ShootingVics",
    data() {
        return {
            vics: []
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
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // If localStorage is not empty, get data from there.
            const everyVic = localStorage.getItem("everyVic");
            const everyVicParse = JSON.parse(everyVic);
            this.vics = everyVicParse;
        }
    },
    methods: {},
    components: {}
};
</script>
