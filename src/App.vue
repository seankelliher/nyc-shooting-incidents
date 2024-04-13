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

<style>
    /* Makes triangle "tip" on Mapbox pop-up black. */
    /* Will not work in style.css. Will not work here id style scoped. */
    .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
        border-top-color: #000;
    }

    .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
        border-bottom-color: #000;
    }

    .mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
        border-bottom-color: #000;
    }

    .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
        border-bottom-color: #000;
    }

    .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
        border-top-color: #000;
    }

    .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
        border-top-color: #000;
    }

    .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
        border-left-color: #000;
    }

    .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
        border-right-color: #000;
    }
</style>