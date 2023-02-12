<template>

    <p>Scenes</p>

</template>

<script>

export default {
    name: "ShootingScenes",
    data() {
        return {
            scenes: []
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
                    this.scenes = data.scenes;
                    console.log(data.scenes);
                    const scenesString = JSON.stringify(data.scenes);
                    localStorage.setItem("everyScene", scenesString);
                })
                .catch((error) => {
                    console.log(error);
                });   
        } else {
            // If localStorage is not empty, get data from there.
            const everyScene = localStorage.getItem("everyScene");
            const everySceneParse = JSON.parse(everyScene);
            this.scenes = everySceneParse;
        }
    },
    methods: {},
    components: {}
};
</script>
