<script setup>
import HeaderPart from "./components/HeaderPart.vue";
import RibbonPart from "./components/RibbonPart.vue";
import ShootingIncidents from "./components/ShootingIncidents.vue";
import FooterPart from "./components/FooterPart.vue";
</script>

<template>
    <div id="container">
        <HeaderPart headline="Open Data" />
        <RibbonPart headline="Shooting Incidents" />
        <ShootingIncidents />
        <FooterPart />
    </div>
</template>

<style scoped>
</style>