<template>
    <div id="container">
        <UniHeader />
        <FullNav />
        <router-view></router-view>
        <UniFooter />
    </div>
</template>

<script>
import UniHeader from "./components/UniHeader.vue";
import FullNav from "./components/FullNav.vue";
import UniFooter from "./components/UniFooter.vue";

export default {
    name: "App",
    components: {
        UniHeader,
        FullNav,
        UniFooter
    }
};
</script>